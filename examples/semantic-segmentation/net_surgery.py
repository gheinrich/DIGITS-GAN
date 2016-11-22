#!/usr/bin/env python2
# Copyright (c) 2016, NVIDIA CORPORATION.  All rights reserved.
"""
Downloads BVLC Alexnet and perform the require net surgery to convert into an FCN Alexnet
"""

import urllib

import caffe
import numpy as np

ALEXNET_PROTOTXT_URL = "https://raw.githubusercontent.com/BVLC/caffe/rc3/models/bvlc_alexnet/deploy.prototxt"
ALEXNET_PROTOTXT_FILENAME = "bvlc_alexnet.deploy.prototxt"
ALEXNET_MODEL_URL = "http://dl.caffe.berkeleyvision.org/bvlc_alexnet.caffemodel"
ALEXNET_MODEL_FILENAME = "bvlc_alexnet.caffemodel"

FCN_ALEXNET_PROTOTXT_FILENAME = "fcn_alexnet.deploy.prototxt"
FCN_ALEXNET_MODEL_FILENAME = "fcn_alexnet_no-group.caffemodel"


def download(url, filename):
    print "Downloading %s..." % url
    urllib.urlretrieve(url, filename)


def generate_fcn():
    # download files
    print "Downloading files (this might take a few minutes)..."
    download(ALEXNET_PROTOTXT_URL, ALEXNET_PROTOTXT_FILENAME)
    download(ALEXNET_MODEL_URL, ALEXNET_MODEL_FILENAME)

    caffe.set_mode_cpu()

    print "Loading Alexnet model..."
    alexnet = caffe.Net(ALEXNET_PROTOTXT_FILENAME, ALEXNET_MODEL_FILENAME, caffe.TEST)

    print "Loading FCN-Alexnet prototxt..."
    fcn_alexnet = caffe.Net(FCN_ALEXNET_PROTOTXT_FILENAME, caffe.TEST)

    print "Implanting interpolation weights..."
    interp_layers = [k for k in fcn_alexnet.params.keys() if 'up' in k]
    interp(fcn_alexnet, interp_layers)

    print "Transplanting parameters..."
    transplant(fcn_alexnet, alexnet)

    print "Saving FCN-Alexnet model to %s " % FCN_ALEXNET_MODEL_FILENAME
    fcn_alexnet.save(FCN_ALEXNET_MODEL_FILENAME)


def interp(net, layers):
    """
    Set weights of each layer in layers to bilinear kernels for interpolation.
    """
    for l in layers:
        m, k, h, w = net.params[l][0].data.shape
        if m != k and k != 1:
            print 'input + output channels need to be the same or |output| == 1'
            raise
        if h != w:
            print 'filters need to be square'
            raise
        filt = upsample_filt(h)
        net.params[l][0].data[range(m), range(k), :, :] = filt


def transplant(new_net, net, suffix=''):
    # from fcn.berkeleyvision.org
    for p in net.params:
        p_new = p + suffix
        if p_new not in new_net.params:
            print 'dropping', p
            continue
        for i in range(len(net.params[p])):
            if i > (len(new_net.params[p_new]) - 1):
                print 'dropping', p, i
                break
            if net.params[p][i].data.shape != new_net.params[p_new][i].data.shape:
                print 'coercing', p, i, 'from', net.params[p][i].data.shape, 'to', new_net.params[p_new][i].data.shape
            else:
                print 'copying', p, ' -> ', p_new, i
            new_net.params[p_new][i].data.flat = net.params[p][i].data.flat


def upsample_filt(size):
    """
    Make a 2D bilinear kernel suitable for upsampling of the given (h, w) size.
    """
    factor = (size + 1) // 2
    if size % 2 == 1:
        center = factor - 1
    else:
        center = factor - 0.5
    og = np.ogrid[:size, :size]
    return (1 - abs(og[0] - center) / factor) * \
           (1 - abs(og[1] - center) / factor)


if __name__ == '__main__':
    generate_fcn()
