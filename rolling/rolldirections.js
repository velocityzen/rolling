/*eslint-disable strict */
var engine = require('rolling/engine').directions;
var isWebkit = !!navigator.userAgent.match(/webkit/i);

var rollDirections = function(el, options, cb) {
  if (el === window || el === document.body || el === document.documentElement) {
    el = isWebkit ? document.body : document.documentElement;
  }

  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  return engine(el, {
    d: options.direction ? options.direction[0] : 'v',
    t: options.threshold || 0,
    cb: cb
  });
};

exports('rolling/directions', rollDirections);
