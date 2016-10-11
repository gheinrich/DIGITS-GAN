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

def mse_loss(pred, y):
    return tf.reduce_mean(tf.pow(y - pred, 2))

def classification_accuracy(pred, y):
    """
    Default definition of accuracy. Something is considered accurate if and only
    if a true label exactly matches the highest value in the prediction vector.
    """
    correct_pred = tf.equal(y, tf.argmax(pred, 1), name='accuracy_single')
    return tf.reduce_mean(tf.cast(correct_pred, tf.float32), name='accuracy_batch')
