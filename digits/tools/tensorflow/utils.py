# Copyright (c) 2016, NVIDIA CORPORATION.  All rights reserved.
#
# This document should comply with PEP-8 Style Guide
# Linter: pylint

"""
Digits default Tensorflow Ops as helper functions.

"""

import tensorflow as tf

STAGE_TRAIN = 'train'
STAGE_VAL = 'val'
STAGE_INF = 'inf'

class GraphKeys(object):
    TEMPLATE = "user_model"
    SUMMARIES_TRAIN = "summaries_train"
    SUMMARIES_VAL =  "summaries_val"
    SUMMARIES_INF =  "summaries_inf"

def classification_loss(pred, y):
    """
    Definition of the loss for regular classification
    """
    ssoftmax = tf.nn.sparse_softmax_cross_entropy_with_logits(pred, y, name='cross_entropy_single')
    return tf.reduce_mean(ssoftmax, name='cross_entropy_batch')

def mse_loss(lhs, rhs):
    return tf.reduce_mean(tf.square(lhs - rhs))

def constrastive_loss(lhs, rhs, y, margin=1.0):
    """ Contrastive loss confirming to the Caffe definition
    """
    d = tf.reduce_sum(tf.square(tf.sub(lhs,rhs)), 1)
    d_sqrt = tf.sqrt(d)
    loss = (y * d) + ((1 - y) * tf.square(tf.maximum(margin - d_sqrt, 0)))
    return tf.reduce_mean(loss) # Note: constant component removed (/2)

def classification_accuracy_top_n(pred, y, top_n):
    single_acc_t = tf.nn.in_top_k(pred, y, top_n, name='accuracy_top_%d'%top_n)
    return  tf.reduce_mean(tf.cast(single_acc_t, tf.float32))

def classification_accuracy(pred, y):
    """
    Default definition of accuracy. Something is considered accurate if and only
    if a true label exactly matches the highest value in the prediction vector.
    """
    single_acc = tf.equal(y, tf.argmax(pred, 1), name='accuracy_single')
    return tf.reduce_mean(tf.cast(single_acc, tf.float32), name='accuracy_batch')

def nhwc_to_nchw(x):
    #x = tf.reshape(x, [1, 3, 4, 2])
    return tf.transpose(x, [0, 3, 1, 2])

def hwc_to_chw(x):
    #x = tf.reshape(x, [2, 3, 1])
    return tf.transpose(x, [2, 0, 1])

def nchw_to_nhwc(x):
    #x = tf.reshape(x, [1, 2, 3, 4])
    return tf.transpose(x, [0, 2, 3, 1])

def chw_to_hwc(x):
    #x = tf.reshape(x, [1, 2, 3])
    return tf.transpose(x, [1, 2, 0])

def bgr_to_rgb(x):
    return tf.reverse(x, [False, False, True])

def rgb_to_bgr(x):
    return tf.reverse(x, [False, False, True])
