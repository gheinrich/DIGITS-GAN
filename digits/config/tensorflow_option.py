# Copyright (c) 2016, NVIDIA CORPORATION.  All rights reserved.
from __future__ import absolute_import

import os

from . import config_option
from . import prompt

# @TODO(tzaman): IN THIS FILE ONLY CHECK IF `import tensorflow` WORKS AND REPORT ABOUT IT.

class TensorflowOption(config_option.FrameworkOption):
    @staticmethod
    def config_file_key():
        return 'tensorflow_root'

    @classmethod
    def prompt_title(cls):
        return 'Tensorflow'

    @classmethod
    def prompt_message(cls):
        return 'Where is tensorflow installed?'

    def optional(self):
        return True

    def suggestions(self):
        suggestions = []
        if 'TENSORFLOW_ROOT' in os.environ:
            d = os.environ['TENSORFLOW_ROOT']
            try:
                suggestions.append(prompt.Suggestion(
                    self.validate(d), 'R',
                    desc='TENSORFLOW_ROOT', default=True))
            except config_option.BadValue as e:
                print 'TENSORFLOW_ROOT "%s" is invalid:' % d
                print '\t%s' % e
        if 'TENSORFLOW_HOME' in os.environ:
            d = os.environ['TENSORFLOW_HOME']
            try:
                default = True
                if len(suggestions) > 0:
                    default = False
                suggestions.append(prompt.Suggestion(
                    self.validate(d), 'H',
                    desc='TENSORFLOW_HOME', default=default))
            except config_option.BadValue as e:
                print 'TENSORFLOW_HOME "%s" is invalid:' % d
                print '\t%s' % e
        suggestions.append(prompt.Suggestion('<PATHS>', 'P',
            desc='PATH/TENSORFLOWPATH', default=True))
        return suggestions

    @staticmethod
    def is_path():
        return True

    @classmethod
    def validate(cls, value):
        if not value:
            return value

        if value == '<PATHS>':
            # Find the executable
            executable = cls.find_executable('th')
            if not executable:
                raise config_option.BadValue('tensorflow binary not found in PATH')
            #cls.validate_version(executable)
            return value
        else:
            # Find the executable
            value = os.path.abspath(value)
            if not os.path.isdir(value):
                raise config_option.BadValue('"%s" is not a directory' % value)
            expected_path = os.path.join(value, 'bin', 'th')
            if not os.path.exists(expected_path):
                raise config_option.BadValue('tensorflow binary not found at "%s"' % value)
            #cls.validate_version(expected_path)
            return value

    @staticmethod
    def find_executable(program):
        """
        Finds an executable by searching through PATH
        Returns the path to the executable or None
        """
        for path in os.environ['PATH'].split(os.pathsep):
            path = path.strip('"')
            executable = os.path.join(path, program)
            if os.path.isfile(executable) and os.access(executable, os.X_OK):
                return executable
        return None

    @classmethod
    def validate_version(cls, executable):
        """
        Utility for checking the caffe version from within validate()
        Throws BadValue

        Arguments:
        executable -- path to a caffe executable
        """
        # Currently DIGITS don't have any restrictions on Tensorflow version, so no need to implement this.
        pass

    def apply(self):
        pass
