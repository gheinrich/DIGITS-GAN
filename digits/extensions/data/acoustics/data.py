# Copyright (c) 2016, NVIDIA CORPORATION.  All rights reserved.
from __future__ import absolute_import

import argparse
import os

import matplotlib.pyplot as plt
import numpy as np
import pylab
from scipy import special, optimize, signal

from digits.utils import subclass, override, constants
from ..interface import DataIngestionInterface
from .forms import DatasetForm

TEMPLATE = "template.html"


gb_display = False
gb_memtrack = False

def generate_signal(T=[], F=[], Fs=1, mode='fmh'):
  """Generate audio signal from time and frequency list.
  """
  # Initialize output buffer
  s = np.zeros((np.ceil(T[-1]*Fs), 1))
  # Duration list
  dt = np.round(np.diff(T) * Fs)

  ind = 0
  phi = 0
  # Loop on each segment of signal
  for ii in range(len(T)-1):
    t = np.arange(dt[ii])[:, np.newaxis]/Fs;

    s_tmp = signal.chirp(t, F[ii], t[-1], F[ii+1], 'linear', phi+90);

    s[ind:(dt[ii]+ind)] = s_tmp;

    ind += len(t)-1;
    phi = np.arcsin(s_tmp[-1])*180/np.pi;

  return s.transpose().squeeze()


def generate_env(s, Fs, preT=1, size=1, offsets=[], att = 0.4, var_noise = 0.1, prof = 500, sz_cell = 2):
  """Add noise.
  """
  # Add Padding
  #print((np.zeros(preT*Fs)).shape)
  #print(s.shape)
  s2 = np.concatenate((np.zeros(preT*Fs), s), 0)

  if len(s2) >= size :
    s2 = s2[0:size]
  else:
    s2 = np.concatenate((s2, np.zeros(size-len(s2))),0)

  # White Noise
  s2 += np.random.randn(len(s2)) * var_noise;

  return s2


@subclass
class DataIngestion(DataIngestionInterface):
    """
    A data ingestion extension for an image gradient dataset
    """

    def __init__(self, **kwargs):
        super(DataIngestion, self).__init__(**kwargs)

        # Used to calculate the gradients later
        self.yy, self.xx = np.mgrid[:self.image_height,
                                    :self.image_width].astype('float')

    def spectrogram(self,data, NFFT=0, Fs=0, detrend=None, window=[], noverlap = 0):

        sz_x = NFFT/2+1
        offset = NFFT-noverlap
        sz_y = np.floor(len(data)/offset)-1
        image = np.zeros([sz_x,sz_y])
        for ii_sed in np.arange(sz_y):
            ind_start = ii_sed*offset
            fft_tmp = np.fft.rfft(window(data[ind_start:ind_start+NFFT]))
            #print(fft_tmp.shape)
            image[:,ii_sed] = np.abs(fft_tmp)

        freqs=(np.linspace(0,sz_x-1,sz_x))*Fs/2
        xx=[]
        t = (np.linspace(0,sz_y-1,sz_y))*offset/Fs

        im_min = image.min()
        im_max = image.max()

        image = (image - im_min) * 255 / (im_max - im_min)
        image = image.astype('uint8')
        #print(image.shape)
        #print(freqs.shape)
        #print(t.shape)
        return (image, freqs, t, xx)

    def encode_entry(self, entry):
        Fs = 20e3

        Ymin = 0
        Ymax = Fs/2
        Xmin = 0
        offset = 0.1
        att = 0.4
        var_noise = 0.1
        overlapratio = 2
        NFFT = 2*self.image_height-1
        Xmax = (self.image_width*NFFT/overlapratio)/Fs

        # GENERATE RANDOM PARAMETERS
        rand_values = np.random.random_sample(7)
        prof = 100 + rand_values[0]*900
        var_noise = rand_values[2]*5
        Ystart = Ymin + rand_values[3]*(Ymax-Ymin)
        Yend = Ymin + rand_values[4]*(Ymax-Ymin)
        Xstart = rand_values[1]*(Xmax-0.1)
        Xlen = rand_values[5]*(Xmax-Xstart)
        Xend = Xstart + Xlen
        offsets = []

        label = np.array([Ystart, Yend, Xstart, Xend])
        #print(label)

        # GENERATE SIGNAL
        s = generate_signal(T=[0, Xlen], F=[Ystart  , Yend], Fs=Fs, mode='linear')

        # GENERATE NOISE
        Ylen = np.abs(Yend-Ystart)
        sz_cell = np.ceil(2*Fs/(2*Ylen));
        s_env = generate_env(s, Fs, preT=Xstart, size=Xmax*Fs, offsets=offsets, att=att, var_noise=var_noise, sz_cell=sz_cell, prof = prof)

        overlap = NFFT-NFFT/overlapratio+1
        # GENERATE SPECGRAM
        image, freqs, t,xx = self.spectrogram(np.array(s_env),
            NFFT=NFFT,
            Fs=Fs,
            detrend=pylab.detrend_none,
            window=pylab.window_hanning,
            noverlap=overlap)

        if gb_display:
            plt.clf()
            #plt.imshow(image)
            plt.pcolormesh(t, freqs, image)
            plt.title(str(label))
            plt.draw()

        # convert to 3D tensors
        image = image[np.newaxis, ...]
        label = label[np.newaxis, np.newaxis, ...]

        return image, label

    @staticmethod
    @override
    def get_category():
        return "Acoustics"

    @staticmethod
    @override
    def get_id():
        return "acoustics-signal"

    @staticmethod
    @override
    def get_dataset_form():
        return DatasetForm()

    @staticmethod
    @override
    def get_dataset_template(form):
        """
        parameters:
        - form: form returned by get_dataset_form(). This may be populated
           with values if the job was cloned
        return:
        - (template, context) tuple
          - template is a Jinja template to use for rendering dataset creation
          options
          - context is a dictionary of context variables to use for rendering
          the form
        """
        extension_dir = os.path.dirname(os.path.abspath(__file__))
        template = open(os.path.join(extension_dir, TEMPLATE), "r").read()
        context = {'form': form}
        return (template, context)

    @staticmethod
    @override
    def get_title():
        return "Acoustic signal"

    @override
    def itemize_entries(self, stage):
        if stage == constants.TRAIN_DB:
            count = self.train_image_count
        elif stage == constants.VAL_DB:
            count = self.val_image_count
        elif stage == constants.TEST_DB:
            count = self.test_image_count
        else:
            raise ValueError('Unknown stage %s' % stage)
        return xrange(count) if count > 0 else []


def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(usage=__doc__)
    parser.add_argument("--order", type=int, default=3, help="order of Bessel function")
    parser.add_argument("--output", default="plot.png", help="output image file")
    args = parser.parse_args()

    gen = DataSignalGen()

    while 1:
      gen.encode_entry(0)


if __name__ == "__main__":
    main()
