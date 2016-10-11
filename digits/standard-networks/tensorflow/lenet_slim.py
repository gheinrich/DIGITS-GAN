
def build_model(params):

    is_training = tf.placeholder(tf.bool, name='dropout_toggle')
    _x = tf.reshape(params['x'], shape=[-1, params['input_shape'][0], params['input_shape'][1], params['input_shape'][2]])
    with slim.arg_scope([slim.conv2d, slim.fully_connected, slim.max_pool2d], 
                        weights_initializer=tf.contrib.layers.xavier_initializer(),
                        weights_regularizer=slim.l2_regularizer(0.0005) ):
        model = slim.conv2d(_x, 20, [5, 5], padding='VALID', scope='conv1')
        model = slim.max_pool2d(model, [2, 2], padding='VALID', scope='pool1')
        model = slim.conv2d(model, 50, [5, 5], padding='VALID', scope='conv2')
        model = slim.max_pool2d(model, [2, 2], padding='VALID', scope='pool2')
        model = slim.flatten(model)
        model = slim.fully_connected(model, 500, scope='fc1')
        model = slim.dropout(model, 0.75, is_training=is_training, scope='do1')
        model = slim.fully_connected(model, params['nclasses'], activation_fn=None, scope='fc2')

    def loss(y):
        loss = digits.classification_loss(model, y)
        accuracy = digits.classification_accuracy(model, y)
        tf.scalar_summary('accuracy', accuracy, collections=[digits.GraphKeys.SUMMARIES_VAL, digits.GraphKeys.SUMMARIES_TRAIN])
        return loss

    return {
        'model' : model,
        'loss' : loss,
        'feed_dict_train' : {is_training: True},
        'feed_dict_val' : {is_training: False}
        }
