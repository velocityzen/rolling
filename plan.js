'use strict';

var options = {
  src: './',
  dst: './'
};

var js = {
  'rolling.js': [
    'util/detective.js',
    'rolling/easing.js',
    'rolling/engine.js',
    'rolling/rollto.js',
    'rolling/rollon.js',
    'rolling/rolldirections.js',
    'lib/browser.js'
  ],

  'jquery.rolling.js': [
    'util/detective.js',
    'rolling/easing.js',
    'rolling/engine.js',
    'rolling/rollto.js',
    'rolling/rollon.js',
    'rolling/rolldirections.js',
    'lib/jquery.js'
  ]
};

module.exports = {
  options: options,

  'default': {
    js: js
  },

  'belt:js': {
    tools: [ 'src-files', 'common-js', 'uglify', 'dst-file' ]
  }
};
