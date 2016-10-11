
def build_model(params):

    is_training = tf.placeholder(tf.bool, name='dropout_toggle')
    _x = tf.reshape(params['x'], shape=[-1, params['input_shape'][0], params['input_shape'][1], params['input_shape'][2]])
    with slim.arg_scope([slim.conv2d, slim.fully_connected], 
                        weights_initializer=tf.contrib.layers.xavier_initializer(),
                        weights_regularizer=slim.l2_regularizer(0.0005) ):
        model = slim.conv2d(_x, 96, [11, 11], 4, padding='VALID', scope='conv1')
        model = slim.max_pool2d(model, [3, 3], 2, scope='pool1')

        model = slim.conv2d(model, 256, [5, 5], 1, scope='conv2')
        model = slim.max_pool2d(model, [3, 3], 2, scope='pool2')

        model = slim.conv2d(model, 384, [3, 3], 1, scope='conv3')
        model = slim.conv2d(model, 384, [3, 3], 1, scope='conv4')
        model = slim.conv2d(model, 256, [3, 3], 1, scope='conv5')
        model = slim.max_pool2d(model, [3, 3], 2, scope='pool5')
        
        model = slim.flatten(model)
        model = slim.fully_connected(model, 4096, activation_fn=None, scope='fc1')
        model = slim.dropout(model, 0.5, is_training=is_training, scope='do1')
        model = slim.fully_connected(model, 4096, activation_fn=None, scope='fc2')
        model = slim.dropout(model, 0.5, is_training=is_training, scope='do2')
        model = slim.fully_connected(model, params['nclasses'], activation_fn=None, scope='fc3')

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
