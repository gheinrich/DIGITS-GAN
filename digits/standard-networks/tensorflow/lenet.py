
def build_model(params):

    # Create some wrappers for simplicity
    def conv2d(x, W, b, s, padding='SAME'):
        # Conv2D wrapper, with bias and relu activation
        x = tf.nn.conv2d(x, W, strides=[1, s, s, 1], padding=padding)
        x = tf.nn.bias_add(x, b)
        return tf.nn.relu(x)

    def maxpool2d(x, k, s, padding='VALID'):
        # MaxPool2D wrapper
        return tf.nn.max_pool(x, ksize=[1, k, k, 1], strides=[1, s, s, 1], padding=padding)

    # Create model
    def conv_net(x, weights, biases):
        # Convolution Layer
        conv1 = conv2d(x, weights['wc1'], biases['bc1'], s=1, padding='VALID')
        # Max Pooling (down-sampling)
        conv1 = maxpool2d(conv1, k=2, s=2, padding='VALID')

        # Convolution Layer
        conv2 = conv2d(conv1, weights['wc2'], biases['bc2'], s=1, padding='VALID')
        # Max Pooling (down-sampling)
        conv2 = maxpool2d(conv2, k=2, s=2, padding='VALID')

        # Fully connected layer
        # Reshape conv2 output to fit fully connected layer input
        fc1 = tf.reshape(conv2, [-1, weights['wd1'].get_shape().as_list()[0]])
        fc1 = tf.add(tf.matmul(fc1, weights['wd1']), biases['bd1'])
        fc1 = tf.nn.relu(fc1)
        
        # Apply Dropout
        if params['is_training']:
            fc1 = tf.nn.dropout(fc1, 0.5)

        # Output, class prediction
        out = tf.add(tf.matmul(fc1, weights['out']), biases['out'])
        return out

    # Store layers weight & bias
    weights = {
        # 5x5 conv, 1 input, 20 outputs
        'wc1': tf.get_variable('wc1', [5, 5, params['input_shape'][2], 20], initializer=tf.contrib.layers.xavier_initializer()),
        # 5x5 conv, 20 inputs, 50 outputs
        'wc2': tf.get_variable('wc2', [5, 5, 20, 50], initializer=tf.contrib.layers.xavier_initializer()),
        # fully connected, 4*4*16=800 inputs, 500 outputs
        'wd1': tf.get_variable('wd1', [4*4*50, 500], initializer=tf.contrib.layers.xavier_initializer()),
        # 500 inputs, 10 outputs (class prediction)
        'out': tf.get_variable('wout', [500, params['nclasses']], initializer=tf.contrib.layers.xavier_initializer()),
    }

    # Leave the intial biases zero
    biases = {
        'bc1': tf.get_variable('bc1', [20], initializer=tf.constant_initializer(0.0)),
        'bc2': tf.get_variable('bc2', [50], initializer=tf.constant_initializer(0.0)),
        'bd1': tf.get_variable('bd1', [500], initializer=tf.constant_initializer(0.0)),
        'out': tf.get_variable('bout', [params['nclasses']], initializer=tf.constant_initializer(0.0))
    }

    model = conv_net(params['x'], weights, biases)

    def loss(y):
        loss = digits.classification_loss(model, y)
        accuracy = digits.classification_accuracy(model, y)
        tf.scalar_summary(accuracy.op.name, accuracy, collections=[digits.GraphKeys.SUMMARIES_VAL, digits.GraphKeys.SUMMARIES_TRAIN])
        return loss

    return {
        'model' : model,
        'loss' : loss,
        }
