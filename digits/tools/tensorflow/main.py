#!/usr/bin/env python2
# Copyright (c) 2016, NVIDIA CORPORATION.  All rights reserved.
#
# This document should comply with PEP-8 Style Guide
# Linter: pylint

"""
TensorFlow training executable for DIGITS
Defines the training procedure

Usage:
See the self-documenting flags below.

"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from six.moves import xrange  # pylint: disable=redefined-builtin

import datetime
import json
import logging
import math
import numpy as np
import os
import re
import tensorflow as tf
import tensorflow.contrib.slim as slim
from tensorflow.python.client import timeline, device_lib
from tensorflow.python.ops import template
from tensorflow.python.lib.io import file_io
from tensorflow.core.framework import summary_pb2
import time

# Local imports
import utils as digits
import lr_policy
import model
import tf_data

# Constants
MIN_LOGS_PER_TRAIN_EPOCH = 80 # torch default: 8

logging.basicConfig(format='%(asctime)s [%(levelname)s] %(message)s', datefmt='%Y-%m-%d %H:%M:%S', level=logging.INFO)
#logging.getLogger("tensorflow").setLevel(logging.ERROR)
#tf.logging.set_verbosity(tf.logging.ERROR)

FLAGS = tf.app.flags.FLAGS

# Basic model parameters. #float, integer, boolean, string
tf.app.flags.DEFINE_integer('batchSize', 16, """Number of images to process in a batch""")
tf.app.flags.DEFINE_integer('croplen', 0, """Crop (x and y). A zero value means no cropping will be applied""")
tf.app.flags.DEFINE_integer('epoch', 1, """Number of epochs to train, -1 for unbounded""")
tf.app.flags.DEFINE_string('inference_db', '', """Directory with inference file source""")
tf.app.flags.DEFINE_integer('interval', 1, """Number of train epochs to complete, to perform one validation""")
tf.app.flags.DEFINE_string('labels', '', """File containing label definitions""")
tf.app.flags.DEFINE_string('mean', '', """Mean image file""")
tf.app.flags.DEFINE_float('momentum', '0.9', """Momentum""") # Not used by DIGITS front-end
tf.app.flags.DEFINE_string('network', '', """File containing network (model)""")
tf.app.flags.DEFINE_string('networkDirectory', '', """Directory in which network exists""")
tf.app.flags.DEFINE_string('optimization', 'sgd', """Optimization method""")
tf.app.flags.DEFINE_string('save', 'results', """Save directory""")
tf.app.flags.DEFINE_integer('seed', 0, """Fixed input seed for repeatable experiments""")
tf.app.flags.DEFINE_boolean('shuffle', False, """Shuffle records before training""")
tf.app.flags.DEFINE_integer('snapshotInterval', 1.0, """Specifies the training epochs to be completed before taking a snapshot""")
tf.app.flags.DEFINE_string('snapshotPrefix', '', """Prefix of the weights/snapshots""")
tf.app.flags.DEFINE_string('subtractMean', 'none', """Select mean subtraction method. Possible values are 'image', 'pixel' or 'none'""")
tf.app.flags.DEFINE_string('train_db', '', """Directory with training file source""")
tf.app.flags.DEFINE_string('train_labels', '', """Directory with an optional and seperate labels file source for training""")
tf.app.flags.DEFINE_string('type', 'cpu', """Hardware acceleration: (cpu, gpu)""")
tf.app.flags.DEFINE_string('validation_db', '', """Directory with validation file source""")
tf.app.flags.DEFINE_string('validation_labels', '', """Directory with an optional and seperate labels file source for validation""")
tf.app.flags.DEFINE_string('visualizeModelPath', '', """Constructs the current model for visualization""")
tf.app.flags.DEFINE_string('weights', '', """Filename for weights of a model to use for fine-tuning""")

tf.app.flags.DEFINE_integer('bitdepth', 8, """Specifies an image's bitdepth""") # @TODO(tzaman): is this in line with the DIGITS team?

# @TODO(tzaman); remove torch mentions below
tf.app.flags.DEFINE_float('lr_base_rate', '0.01', """Learning rate""")
tf.app.flags.DEFINE_string('lr_policy', 'fixed', """Learning rate policy. (fixed, step, exp, inv, multistep, poly, sigmoid)""")
tf.app.flags.DEFINE_float('lr_gamma', -1, """Required to calculate learning rate. Applies to: (step, exp, inv, multistep, sigmoid)""")
tf.app.flags.DEFINE_float('lr_power', float('Inf'), """Required to calculate learning rate. Applies to: (inv, poly)""")
tf.app.flags.DEFINE_string('lr_stepvalues', '', """Required to calculate stepsize of the learning rate. Applies to: (step, multistep, sigmoid). For the 'multistep' lr_policy you can input multiple values seperated by commas""")

# Tensorflow-unique arguments for DIGITS
# 'tf_summaries_dir' default is '' which defaults to the cwd (jobs dir)
tf.app.flags.DEFINE_string('tf_summaries_dir', '', """Directory of Tensorboard Summaries (logdir)""") 
tf.app.flags.DEFINE_boolean('tf_serving_export', False, """Flag for exporting an Tensorflow Serving model""")
tf.app.flags.DEFINE_boolean('log_device_placement', False, """Whether to log device placement.""")
tf.app.flags.DEFINE_integer('log_runtime_stats_per_step', 0, """Logs runtime statistics for Tensorboard every x steps, defaults to 0 (off).""")

def save_timeline_trace(run_metadata, save_dir, step):
    tl = timeline.Timeline(run_metadata.step_stats)
    ctf = tl.generate_chrome_trace_format()
    tl_fn = os.path.join(save_dir, 'timeline_%s.json' % step)
    with open(tl_fn, 'w') as f:
        f.write(ctf)

def strip_data_from_graph_def(graph_def):
    strip_def = tf.GraphDef()
    for n0 in graph_def.node:
        n = strip_def.node.add() 
        n.MergeFrom(n0)
        if n.op == 'Const':
            tensor = n.attr['value'].tensor
            size = max(len(tensor.tensor_content), len(tensor.string_val))
            if (tensor.tensor_content):
                tensor.tensor_content = ''
            if (tensor.string_val):
                del tensor.string_val[:]
    return strip_def

def visualize_graph(graph_def, path):
    graph_def = strip_data_from_graph_def(graph_def)
    logging.info('Writing Graph Definition..')
    file_io.write_string_to_file(path, str(graph_def))
    logging.info('Graph Definition Written.')


def summary_to_lists(summary_str):
    """ Takes a Tensorflow stringified Summary object and returns only
    the scalar values to a list of tags and a list of values
    Args:
        summary_str: string of a Tensorflow Summary object
    Returns:
        tags: list of tags
        vals: list of values corresponding to the tag list

    """
    summ = summary_pb2.Summary()
    summ.ParseFromString(summary_str)
    tags = []
    vals = []
    for s in summ.value:
        if s.HasField('simple_value'):# and s.simple_value: # Only parse scalar_summaries
            if s.simple_value == float('Inf'):
                raise ValueError('Model diverged with %s = %s' % (s.tag, s.simple_value))
            tags.append(s.tag)
            vals.append(s.simple_value)
    vals = np.asarray(vals)
    return tags, vals

def print_summarylist(tags, vals):
    """ Prints a nice one-line listing of tags and their values in a nice format
    that corresponds to how the DIGITS regex reads it.
    Args:
        tags: an array of tags
        vals: an array of values
    Returns:
        print_list: a string containing formatted tags and values
    """
    print_list = ''
    for i, key in enumerate(tags):
        if vals[i] == float('Inf'):
            raise ValueError('Infinite value %s = Inf' % key) 
        print_list = print_list + key + " = " + "{:.6f}".format(vals[i])
        if i < len(tags)-1:
            print_list = print_list + ", " 
    return print_list

def dump(obj):
    for attr in dir(obj):
        print("obj.%s = %s" % (attr, getattr(obj, attr)))

def load_snapshot(sess, saver, weight_path):
    logging.info("Loading weights from pretrained model - %s ", weight_path )
    ckpt = tf.train.get_checkpoint_state(weight_path)
    if ckpt and ckpt.model_checkpoint_path:
        saver.restore(sess, ckpt.model_checkpoint_path)
    else:
        logging.error("Weight file for pretrained model not found: %s", weight_path  )
        exit(-1)

def save_snapshot(sess, saver, save_dir, snapshot_prefix, epoch, for_serving=False):
    """
    Saves a snapshot of the current session, saving all variables and the graph itself.
    The files are put in its own folder, so one can easily point to a folder when
    the weights get loaded in (this is how tf loads weights - by pointing to a folder)
    """
    snapshot_name = snapshot_prefix + '_' + str(epoch) + '_Model'
    snapshot_dir = os.path.join(save_dir, snapshot_name)
    if not os.path.exists(snapshot_dir):
        os.makedirs(snapshot_dir)
    snapshot_file = os.path.join(snapshot_dir, 'Model.ckpt')

    logging.info('Snapshotting to %s', snapshot_dir)
    saver.save(sess, snapshot_file)
    logging.info('Snapshot saved.')

    if for_serving:
        # @TODO(tzaman) : we could further extend this by supporting tensorflow-serve
        logging.error('NotImplementedError: Tensorflow-Serving support.')
        exit(-1)

    # @TODO(tzaman): save the graph itself only once
    # Past this point the graph shouldn't be changed.
    filename_graph = os.path.join(save_dir, snapshot_prefix + '.graph_def')
    if not os.path.isfile(filename_graph):
        with open(filename_graph, 'wb') as f:
            logging.info('Saving graph to %s', filename_graph)
            f.write(sess.graph_def.SerializeToString())
            logging.info('Saved graph to %s', filename_graph)
        #meta_graph_def = tf.train.export_meta_graph(filename='?')


def Inference(sess, model):
    """
    Runs one inference (evaluation) epoch (all the files in the loader)
    """
    #has_logsoftmax = True # @TODO(tzaman): check if there is a logsoftmax in the model
    #if has_logsoftmax:
    #    model.model = tf.exp(model.model)
    try:
        while not model.queue_coord.should_stop():
            keys, preds  = sess.run([model.dataloader.batch_k, model.model], feed_dict=model.feed_dict)
            # @TODO(tzaman): error on no output?
            for i in range(len(keys)):
                #    for j in range(len(preds)):
                # We're allowing multiple predictions per image here. DIGITS doesnt support that iirc
                logging.info('Predictions for image ' + str(model.dataloader.get_key_index(keys[i])) + ': ' + json.dumps(preds[i].tolist()))
    except tf.errors.OutOfRangeError:
        print('Done: tf.errors.OutOfRangeError')    

def Validation(sess, model, writer, current_epoch):
    """
    Runs one validation epoch.
    """

    ## @TODO(tzaman): utilize the coordinator by resetting the queue after 1 epoch.
    # see https://github.com/tensorflow/tensorflow/issues/4535#issuecomment-248990633

    print_vals_sum = 0
    steps = 0
    while (steps * model.dataloader.batch_size) < model.dataloader.get_total():
        summary_str = sess.run(model.summary, feed_dict=model.feed_dict)
        #writer.add_summary(summary_str, step)
        # Parse the summary
        tags, print_vals = summary_to_lists(summary_str)
        print_vals_sum = print_vals + print_vals_sum

        steps += 1

    print_list = print_summarylist(tags, print_vals_sum/steps)

    logging.info("Validation (epoch " + str(current_epoch) + "): " + print_list)


def loadLabels(filename):
    with open(filename) as f:
        return f.readlines()


def main(_):

    # Always set a default device. Soms specific operations will later override this device.
    default_device = '/gpu:0' if FLAGS.type == 'gpu' else '/cpu:0'
    with tf.Graph().as_default(), tf.device(default_device):

        # Set Tensorboard log directory
        if FLAGS.tf_summaries_dir:
            # The following gives a nice but unrobust timestamp
            FLAGS.tf_summaries_dir = os.path.join(FLAGS.tf_summaries_dir, datetime.datetime.now().strftime("%Y%m%d_%H%M%S"))

        if not FLAGS.train_db and not FLAGS.validation_db and not FLAGS.inference_db and not FLAGS.visualizeModelPath:
            logging.error("At least one of the following file sources should be specified: train_db, validation_db or inference_db")
            exit(-1)

        if FLAGS.seed:
            tf.set_random_seed(FLAGS.seed)

        batch_size_train = FLAGS.batchSize
        batch_size_val = FLAGS.batchSize
        logging.info("Train batch size is %s and validation batch size is %s", batch_size_train, batch_size_val)

        # This variable keeps track of next epoch, when to perform validation.
        next_validation = FLAGS.interval
        logging.info("Training epochs to be completed for each validation : %s", next_validation)
        last_validation_epoch = 0

        # This variable keeps track of next epoch, when to save model weights.
        next_snapshot_save = FLAGS.snapshotInterval
        logging.info("Training epochs to be completed before taking a snapshot : %s", next_snapshot_save)
        last_snapshot_save_epoch = 0

        snapshot_prefix = FLAGS.snapshotPrefix if FLAGS.snapshotPrefix else FLAGS.network.split('.')[0]
        logging.info("Model weights will be saved as %s_<EPOCH>_Model.ckpt", snapshot_prefix)

        if not os.path.exists(FLAGS.save):
            os.makedirs(FLAGS.save)
            logging.info("Created a directory %s to save all the snapshots", FLAGS.save)

        # Load mean variable
        if FLAGS.subtractMean == 'none':
            mean_loader = None
        else:
            if not FLAGS.mean:
                logging.error("subtractMean parameter not set to 'none' yet mean image path is unset")
                exit(-1)
            logging.info("Loading mean tensor from %s file", FLAGS.mean)
            mean_loader = tf_data.MeanLoader(FLAGS.mean, FLAGS.subtractMean, FLAGS.bitdepth)

            
        classes = 0
        nclasses = 0
        if FLAGS.labels:
            logging.info("Loading label definitions from %s file", FLAGS.labels)
            classes = loadLabels(FLAGS.labels)
            nclasses = len(classes)
            if not classes:
                logging.error("Reading labels file %s failed.", FLAGS.labels)
                exit(-1)
            logging.info("Found %s classes", nclasses)

        input_shape = []

        # Import the network file
        path_network = os.path.join(os.path.dirname(os.path.realpath(__file__)), FLAGS.networkDirectory, FLAGS.network)
        exec(open(path_network).read(), globals())

        # Create the network template
        network_template = template.make_template(digits.GraphKeys.TEMPLATE, build_model)

        if FLAGS.train_db:
            train_model = model.Model(digits.STAGE_TRAIN, FLAGS.croplen, nclasses)
            train_model.create_dataloader(FLAGS.train_db)
            train_model.dataloader.setup(FLAGS.train_labels, FLAGS.shuffle, FLAGS.bitdepth, batch_size_train, FLAGS.epoch, FLAGS.seed)
            train_model.dataloader.set_augmentation(mean_loader)
            train_model.init_dataloader()
            input_shape = train_model.dataloader.get_shape()
            train_model.create_model_from_template(network_template)
            train_model.set_optimizer(FLAGS.optimization, FLAGS.momentum)
            train_model.initialize_graph()
 
        if FLAGS.validation_db:
            val_model = model.Model(digits.STAGE_VAL, FLAGS.croplen, nclasses)
            val_model.create_dataloader(FLAGS.validation_db)
            val_model.dataloader.setup(FLAGS.validation_labels, False, FLAGS.bitdepth, batch_size_val, 1e9, FLAGS.seed) # @TODO(tzaman): set numepochs to 1
            val_model.dataloader.set_augmentation(mean_loader)
            val_model.init_dataloader()
            if not input_shape:
                input_shape = val_model.dataloader.get_shape()
            val_model.create_model_from_template(network_template)
            val_model.initialize_graph()

        if FLAGS.inference_db:
            inf_model = model.Model(digits.STAGE_INF, FLAGS.croplen, nclasses)
            inf_model.create_dataloader(FLAGS.inference_db)
            inf_model.dataloader.setup(None, False, FLAGS.bitdepth, FLAGS.batchSize, 1, FLAGS.seed)
            inf_model.dataloader.set_augmentation(mean_loader)
            inf_model.init_dataloader()
            if not input_shape:
                input_shape = inf_model.dataloader.get_shape()
            inf_model.create_model_from_template(network_template)
            inf_model.initialize_graph()

        # Start running operations on the Graph. allow_soft_placement must be set to
        # True to build towers on GPU, as some of the ops do not have GPU
        # implementations.
        sess = tf.Session(config=tf.ConfigProto(
            allow_soft_placement=True, # will automatically do non-gpu supported ops on cpu
            log_device_placement=FLAGS.log_device_placement))

        if FLAGS.visualizeModelPath:
            visualize_graph(sess.graph_def, FLAGS.visualizeModelPath)
            exit(0)

        # Saver creation.
        # Will only save sharded if we want to use the model for serving
        saver = tf.train.Saver(tf.all_variables(), max_to_keep=0, sharded=FLAGS.tf_serving_export)

        # Initialize variables
        init_op = tf.group(tf.initialize_all_variables(), tf.initialize_local_variables())
        sess.run(init_op)

        # If weights option is set, preload weights from existing models appropriately
        if FLAGS.weights:
            load_snapshot(sess, saver, FLAGS.weights)

        # Tensorboard: Merge all the summaries and write them out
        writer = tf.train.SummaryWriter(os.path.join(FLAGS.tf_summaries_dir, 'tb'), sess.graph)

        # If we are inferencing, only do that.
        if FLAGS.inference_db:
            inf_model.start_queue_runners(sess)
            Inference(sess, inf_model)

        ## Initial Forward Validation Pass
        if FLAGS.validation_db:
            val_model.start_queue_runners(sess)
            Validation(sess, val_model, writer, 0)

        if FLAGS.train_db:
            # epoch value will be calculated for every batch size. To maintain unique epoch value between batches, it needs to be rounded to the required number of significant digits.
            epoch_round = 0 # holds the required number of significant digits for round function.
            tmp_batchsize = batch_size_train
            while tmp_batchsize <= train_model.dataloader.get_total():
                tmp_batchsize = tmp_batchsize * 10
                epoch_round += 1
            logging.info("While logging, epoch value will be rounded to %s significant digits", epoch_round)

            # During training, a log output should occur at least X times per epoch or every X images, whichever lower
            train_steps_per_epoch = train_model.dataloader.get_total() / batch_size_train
            if math.ceil(train_steps_per_epoch/MIN_LOGS_PER_TRAIN_EPOCH) < math.ceil(5000/batch_size_train):
                logging_interval_step = int(math.ceil(train_steps_per_epoch/MIN_LOGS_PER_TRAIN_EPOCH))
            else:
                logging_interval_step = int(math.ceil(5000/batch_size_train))
            logging.info("During training. details will be logged after every %s steps (batches)", logging_interval_step)

            # Create the learning rate policy
            total_training_steps = train_model.dataloader.num_epochs * train_model.dataloader.get_total() / train_model.dataloader.batch_size
            lrpolicy = lr_policy.LRPolicy(FLAGS.lr_policy, FLAGS.lr_base_rate, FLAGS.lr_gamma, FLAGS.lr_power, total_training_steps, FLAGS.lr_stepvalues)
            train_model.start_queue_runners(sess)

            ## Training
            logging.info('Started training the model')

            current_epoch = 0
            try:
                step = 0
                step_last_log = 0
                print_vals_sum = 0
                while not train_model.queue_coord.should_stop():
                    log_runtime = FLAGS.log_runtime_stats_per_step and (step % FLAGS.log_runtime_stats_per_step == 0)

                    run_options = None
                    run_metadata = None
                    if log_runtime:
                        # For a HARDWARE_TRACE you need NVIDIA CUPTI, a 'CUDA-EXTRA'
                        run_options = tf.RunOptions(trace_level=tf.RunOptions.FULL_TRACE) # SOFTWARE_TRACE HARDWARE_TRACE FULL_TRACE
                        run_metadata = tf.RunMetadata()

                    feed_dict = train_model.feed_dict
                    feed_dict[train_model.learning_rate] = lrpolicy.get_learning_rate(step)

                    _, summary_str, step = sess.run([train_model.train, train_model.summary, train_model.global_step],
                            feed_dict=feed_dict,
                            options=run_options,
                            run_metadata=run_metadata)

                    if log_runtime:
                        writer.add_run_metadata(run_metadata, str(step))
                        save_timeline_trace(run_metadata, FLAGS.save, step)

                    writer.add_summary(summary_str, step)

                    # Parse the summary
                    tags, print_vals = summary_to_lists(summary_str)

                    print_vals_sum = print_vals + print_vals_sum

                    # @TODO(tzaman): account for variable batch_size value on last epoch
                    current_epoch = round((step * batch_size_train) / train_model.dataloader.get_total(), epoch_round)

                    # Start with a forward pass
                    if (step == 1) or ((step % logging_interval_step) == 0):
                        steps_since_log = step - step_last_log 
                        print_list = print_summarylist(tags, print_vals_sum/steps_since_log)
                        logging.info("Training (epoch " + str(current_epoch) + "): " + print_list)
                        print_vals_sum = 0
                        step_last_log = step

                    # Potential Validation Pass
                    if FLAGS.validation_db and current_epoch >= next_validation:
                        Validation(sess, val_model, writer, current_epoch)
                        # Find next nearest epoch value that exactly divisible by FLAGS.interval:
                        next_validation = (round(float(current_epoch)/FLAGS.interval) + 1) * FLAGS.interval 
                        last_validation_epoch = current_epoch

                    # Saving Snapshot
                    if FLAGS.snapshotInterval and current_epoch >= next_snapshot_save:
                        save_snapshot(sess, saver, FLAGS.save, snapshot_prefix, current_epoch, FLAGS.tf_serving_export)

                        # To find next nearest epoch value that exactly divisible by FLAGS.snapshotInterval
                        next_snapshot_save = (round(float(current_epoch)/FLAGS.snapshotInterval) + 1) * FLAGS.snapshotInterval 
                        last_snapshot_save_epoch = current_epoch
                    writer.flush()
            except tf.errors.OutOfRangeError:
                logging.info('Done training for epochs: tf.errors.OutOfRangeError')
            except ValueError as err:
                logging.error(err.args[0])
            except (KeyboardInterrupt, SystemExit):
                logging.info('Interrupt signal received.')

             # If required, perform final snapshot save
            if FLAGS.epoch > last_snapshot_save_epoch:
                save_snapshot(sess, saver, FLAGS.save, snapshot_prefix, FLAGS.epoch, FLAGS.tf_serving_export)

        # If required, perform final Validation pass
        if FLAGS.validation_db and current_epoch >= next_validation:
            Validation(sess, val_model, writer, current_epoch)

        if FLAGS.train_db:
            del train_model
        if FLAGS.validation_db:
            del val_model
        if FLAGS.inference_db:
            del inf_model

        # We need to call sess.close() because we've used a with block
        sess.close()

        writer.close()
        logging.info('END')
        exit(0)

if __name__ == '__main__':
    tf.app.run()     
