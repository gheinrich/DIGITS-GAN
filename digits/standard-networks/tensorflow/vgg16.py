
def build_model(params):

    _x = tf.reshape(params['x'], shape=[-1, params['input_shape'][0], params['input_shape'][1], params['input_shape'][2]])

    with slim.arg_scope([slim.conv2d, slim.fully_connected], 
                        weights_initializer=tf.contrib.layers.xavier_initializer(),
                        weights_regularizer=slim.l2_regularizer(0.0005) ):
        model = slim.repeat(_x, 3, slim.conv2d, 64, [3, 3], scope='conv1')
        model = slim.max_pool2d(model, [2, 2], scope='pool1')
        model = slim.repeat(model, 3, slim.conv2d, 128, [3, 3], scope='conv2')
        model = slim.max_pool2d(model, [2, 2], scope='pool2')
        model = slim.repeat(model, 3, slim.conv2d, 256, [3, 3], scope='conv3')
        model = slim.max_pool2d(model, [2, 2], scope='pool3')
        model = slim.repeat(model, 3, slim.conv2d, 512, [3, 3], scope='conv4')
        model = slim.max_pool2d(model, [2, 2], scope='pool4')
        model = slim.repeat(model, 3, slim.conv2d, 512, [3, 3], scope='conv5')
        model = slim.max_pool2d(model, [2, 2], scope='pool5')
        model = slim.flatten(model, scope='flatten5')
        model = slim.fully_connected(model, 4096, scope='fc6')
        model = slim.dropout(model, 0.5, is_training=params['is_training'], scope='do6')
        model = slim.fully_connected(model, 4096, scope='fc7')
        model = slim.dropout(model, 0.75, is_training=params['is_training'], scope='do7')
        model = slim.fully_connected(model, 1000, activation_fn=None, scope='fc8')

    def loss(y):
        loss = digits.classification_loss(model, y)
        accuracy = digits.classification_accuracy(model, y)
        tf.scalar_summary(accuracy.op.name, accuracy, collections=[digits.GraphKeys.SUMMARIES_VAL])
        accuracy_top_5 = digits.classification_accuracy_top_n(model, y, 5)
        tf.scalar_summary(accuracy_top_5.op.name, accuracy_top_5, collections=[digits.GraphKeys.SUMMARIES_VAL])
        return loss

    return {
        'model' : model,
        'loss' : loss,
        }
