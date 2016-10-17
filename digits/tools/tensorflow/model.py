# Copyright (c) 2016, NVIDIA CORPORATION.  All rights reserved.
#
# This document should comply with PEP-8 Style Guide
# Linter: pylint

"""
Interface for setting up a model in Tensorflow.

"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import functools
import logging
import tensorflow as tf

# Local imports
import tf_data
import utils as digits

# Constants
OUTPUT_HISTOGRAM_SUMMARIES = False # Very heavy for the CPU

def lazy_property(function):
    # From https://danijar.com/structuring-your-tensorflow-models/
    attribute = '_cache_' + function.__name__
    @property
    @functools.wraps(function)
    def decorator(self):
        if not hasattr(self, attribute):
            setattr(self, attribute, function(self))
        return getattr(self, attribute)
    return decorator

def get_available_gpus():
    """
    Queries the CUDA GPU devices visible to Tensorflow.
    Returns:
        A list with tf-style gpu strings (f.e. ['/gpu:0', '/gpu:1'])
    """
    local_device_protos = device_lib.list_local_devices()
    return [x.name for x in local_device_protos if x.device_type == 'GPU']

class Model(object):
    """
    @TODO(tzaman)

    """
    def __init__(self, stage, croplen, nclasses):
        self.stage = stage
        self.croplen = croplen
        self.nclasses = nclasses
        self.dataloader = None
        self.optimization = None
        self.momentum = None

        self.queue_coord = None
        self.queue_threads = None

        self._summaries = []
        self.model = None
        self.network_loss = None

        self.feed_dict = {}

        # Define graph keys in tf convention
        self.GraphKeys = {}
        self.GraphKeys['QUEUE_RUNNERS'] = "queue_runner_" + self.stage
        self.GraphKeys['MODEL'] = "model_" + self.stage
        self.GraphKeys['LOSS'] = "loss_" + self.stage
        self.GraphKeys['LOSSES'] = "losses" + self.stage
        self.GraphKeys['LOADER'] = "data_" + self.stage

        # Special exception for summaries, as they need to be accesible to the user model
        # in a tf compliant way
        if self.stage == digits.STAGE_TRAIN:
            self.GraphKeys['SUMMARIES'] = digits.GraphKeys.SUMMARIES_TRAIN
        elif self.stage == digits.STAGE_VAL:
            self.GraphKeys['SUMMARIES'] = digits.GraphKeys.SUMMARIES_VAL
        elif self.stage == digits.STAGE_INF:
            self.GraphKeys['SUMMARIES'] = digits.GraphKeys.SUMMARIES_INF

    def create_dataloader(self, db_path):
        self.dataloader = tf_data.LoaderFactory.set_source(db_path)
        self.dataloader.summaries = self._summaries
        self.dataloader.stage = self.stage
        self.dataloader.croplen = self.croplen
        self.dataloader.nclasses = self.nclasses

    def init_dataloader(self):
        with tf.name_scope(self.GraphKeys['LOADER']):
            self.dataloader.create_input_pipeline()

    def set_optimizer(self, optimization, momentum):
        self.optimization = optimization
        self.momentum = momentum

    def initialize_graph(self):
        """ This function initializes lazy functions in the model. This needs to be done
        before the variables are initialized in tensorflow, otherwise there would be nothing
        to initialize!
        """
        if self.stage == digits.STAGE_TRAIN:
            # We only need to touch the train op, this will cascade down to the others
            self.train
        elif self.stage == digits.STAGE_VAL:
            self.loss

    def create_model_from_template(self, network_template):
        # @TODO(tzaman) maybe convert this to just return and call as lazy 'inference'

        # Load the parameters passed to the custom model
        model_params = {
            'x' : self.dataloader.batch_x,
            'input_shape' : self.dataloader.get_shape(),
            'nclasses' : self.nclasses, 
        }

        # Run the user model through the build_model function that should be filled in
        with tf.name_scope(self.GraphKeys['MODEL']):
            network = network_template(model_params)

            # Perform checks
            if not network.has_key('model'):
                logging.error("Model definition required in model file but not supplied.")
                exit(-1)
            if not network.has_key('loss'):
                logging.error("Loss function definition required in model file but not supplied.")
                exit(-1)
            if not callable(network['loss']):
                logging.error("Returned loss function should be a function, but is a: (%s)." % type(network['loss']))
                exit(-1)

            # Note that the feed dicts of 'network_train' and 'network_val' are identical except for the mirrored one's suffix '_1'
            if self.stage in digits.STAGE_TRAIN and network.has_key('feed_dict_train'):
                # For Training
                self.feed_dict = network['feed_dict_train']
            elif self.stage not in digits.STAGE_TRAIN and network.has_key('feed_dict_val'):
                # For Validation and Inference
                self.feed_dict = network['feed_dict_val']

            self.model = network['model']
            self.network_loss = network['loss']

    @lazy_property
    def loss(self):
        """
        Make the loss function
        """
        with tf.name_scope(self.GraphKeys['LOSS']):
            loss_op = self.network_loss(self.dataloader.batch_y)
            tf.add_to_collection(self.GraphKeys['LOSSES'], loss_op)
            loss_op = tf.add_n(tf.get_collection(self.GraphKeys['LOSSES']), name='total_loss_'+self.stage)
            self._summaries.append(tf.scalar_summary('loss', loss_op))
            return loss_op     


    @lazy_property
    def summary(self):
        """
        Merge train summaries
        """
        # @TODO(tzaman): add all summaries defined in this file explicitly not through the collection lines below

        # The below get_collection() commands retrieve any summaries that have been set by the user in the model
        self._summaries += tf.get_collection(self.GraphKeys['SUMMARIES'], scope=self.GraphKeys['MODEL'])
        self._summaries += tf.get_collection(self.GraphKeys['SUMMARIES'], scope=self.GraphKeys['LOSS'])
        if not len(self._summaries):
            logging.error("No summaries defined. Please define at least one summary.")
            exit(-1)
        return tf.merge_summary(self._summaries)

    @lazy_property
    def global_step(self):
        # Force global_step on the CPU, becaues the GPU's first step will end at 0 instead of 1.
        with tf.device('/cpu:0'):
            return tf.get_variable('global_step', [], initializer=tf.constant_initializer(0), trainable=False)

    @lazy_property
    def learning_rate(self):
        # @TODO(tzaman): the learning rate is a function of the global step, so we could
        #  define it entirely in tf ops, instead of a placeholder and feeding.
        with tf.device('/cpu:0'):
            lr = tf.placeholder(tf.float32, shape=[], name='learning_rate')
            self._summaries.append(tf.scalar_summary('lr', lr))
            return lr

    @lazy_property
    def optimizer(self):
        logging.info("Optimizer:%s", self.optimization)
        if self.optimization == 'sgd':
            return tf.train.GradientDescentOptimizer(learning_rate=self.learning_rate)
        elif self.optimization == 'adadelta':
            return tf.train.AdadeltaOptimizer(learning_rate=self.learning_rate)
        elif self.optimization == 'adagrad':
            return tf.train.AdagradOptimizer(learning_rate=self.learning_rate)
        elif self.optimization == 'adagradda':
            return tf.train.AdagradDAOptimizer(learning_rate=self.learning_rate, global_step=self.global_step)
        elif self.optimization == 'momentum':
            return tf.train.MomentumOptimizer(learning_rate=self.learning_rate, momentum=self.momentum)
        elif self.optimization == 'adam':
            return tf.train.AdamOptimizer(learning_rate=self.learning_rate)
        elif self.optimization == 'ftrl':
            return tf.train.FtrlOptimizer(learning_rate=self.learning_rate)
        elif self.optimization == 'rmsprop':
            return tf.train.RMSPropOptimizer(learning_rate=self.learning_rate, momentum=self.momentum)
        else:
            logging.error("Invalid optimization flag %s", self.optimization)
            exit(-1) 

    @lazy_property
    def train(self):

        # Generate moving averages of all losses and associated summaries.
        #loss_averages_op = add_loss_summaries(loss_op_train, '_train')

        # Create optimizer, compute and apply gradients.
        #with tf.control_dependencies([loss_averages_op]):

        grads = self.optimizer.compute_gradients(self.loss)
        apply_gradient_op = self.optimizer.apply_gradients(grads, global_step=self.global_step)

        with tf.control_dependencies([apply_gradient_op]):
            train_op = tf.no_op(name='train')

        # TensorBoard
        if OUTPUT_HISTOGRAM_SUMMARIES:
            # Add histograms for gradients.
            for grad, var in grads:
                if grad is not None:
                    self._summaries.append(tf.histogram_summary(var.op.name + '/gradients', grad))  
            # Add histograms for trainable variables.
            for var in tf.trainable_variables():
                self._summaries.append(tf.histogram_summary(var.op.name, var))

        return train_op


    def start_queue_runners(self, sess):
        logging.info('Starting queue runners (%s)' % self.stage)
        # Distinguish the queue runner collection (for easily obtaining them by collection key)
        queue_runners = tf.get_collection(tf.GraphKeys.QUEUE_RUNNERS)
        for qr in queue_runners:
            if self.stage in qr.name:
                tf.add_to_collection(self.GraphKeys['QUEUE_RUNNERS'], qr)
        
        self.queue_coord = tf.train.Coordinator()
        self.queue_threads = tf.train.start_queue_runners(sess=sess, coord=self.queue_coord, collection=self.GraphKeys['QUEUE_RUNNERS'])
        logging.info('Queue runners started (%s)' % self.stage)

    def __del__(self):
        # Destructor
        if self.queue_coord:
            # Close and terminate the queues
            self.queue_coord.request_stop()
            self.queue_coord.join(self.queue_threads)

#def add_loss_summaries(total_loss, name_suffix=''):
#    """Add summaries for losses in the model.
#    Generates moving average for all losses and associated summaries for
#    visualizing the performance of the network.
#    Args:
#    total_loss: Total loss from loss().
#    Returns:
#    loss_averages_op: op for generating moving averages of losses.
#    """
#    # Compute the moving average of all individual losses and the total loss.
#    loss_averages = tf.train.ExponentialMovingAverage(0.9, name='avg')
#    losses = tf.get_collection('losses'+name_suffix)
#    loss_averages_op = loss_averages.apply(losses + [total_loss])
#
#    # Attach a scalar summary to all individual losses and the total loss; do the
#    # same for the averaged version of the losses.
#    for l in losses + [total_loss]:
#        # Name each loss as '(raw)' and name the moving average version of the loss
#        # as the original loss name.
#        tf.scalar_summary(l.op.name +' (raw)', l, collections=[digits.GraphKeys.SUMMARIES_TRAIN])
#        tf.scalar_summary(l.op.name, loss_averages.average(l), collections=[digits.GraphKeys.SUMMARIES_TRAIN])
#
#    return loss_averages_op
