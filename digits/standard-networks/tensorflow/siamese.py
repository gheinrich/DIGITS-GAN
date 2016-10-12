def build_model(params):
    _x = tf.reshape(params['x'], shape=[-1, params['input_shape'][0], params['input_shape'][1], params['input_shape'][2]])
    tf.image_summary('input', _x, max_images=10, collections=[digits.GraphKeys.SUMMARIES_TRAIN])

    # Split out the color channels
    _, model_g, model_b = tf.split(3, 3, _x, name='split_channels')
    tf.image_summary('g', model_g, max_images=10, collections=[digits.GraphKeys.SUMMARIES_TRAIN])
    tf.image_summary('b', model_b, max_images=10, collections=[digits.GraphKeys.SUMMARIES_TRAIN])

    with slim.arg_scope([slim.conv2d, slim.fully_connected], 
            weights_initializer=tf.contrib.layers.xavier_initializer(),
            weights_regularizer=slim.l2_regularizer(0.0005) ):
        with tf.variable_scope("siamese") as scope:
            def make_tower(net):
                net = slim.conv2d(net, 20, [5, 5], padding='VALID', scope='conv1')
                net = slim.max_pool2d(net, [2, 2], padding='VALID', scope='pool1')
                net = slim.conv2d(net, 50, [5, 5], padding='VALID', scope='conv2')
                net = slim.max_pool2d(net, [2, 2], padding='VALID', scope='pool2')
                net = slim.flatten(net)
                net = slim.fully_connected(net, 500, scope='fc1')
                net = slim.fully_connected(net, 2, activation_fn=None, scope='fc2')
                return net

            model_g = make_tower(model_g)
            model_g = tf.reshape(model_g, shape=[-1, 2])
            scope.reuse_variables()
            model_b = make_tower(model_b)
            model_b = tf.reshape(model_b, shape=[-1, 2])

    d =  tf.sqrt(tf.reduce_sum(tf.square(tf.sub(model_g, model_b)),1,keep_dims=True))

    def loss(y):
        #tf.image_summary('y', y, max_images=10, collections=[digits.GraphKeys.SUMMARIES_TRAIN])
        return digits.constrastive_loss(d, y)

    return {
        'model' : tf.tuple([model_g, model_b]),
        'loss' : loss,
        }
