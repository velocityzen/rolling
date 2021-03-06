/*eslint-disable strict */
var engine = require('rolling/engine').to;
var isWebkit = !!navigator.userAgent.match(/webkit/i);

var rollTo = function(el, options, cb) {
  if (el === window || el === document.body || el === document.documentElement) {
    el = isWebkit ? document.body : document.documentElement;
  }

  var target = {};
  var to = options.to;
  var direction = options.direction || 'vertical';

  if (typeof to === 'string') {
    to = el.querySelector(to);
    if (!to) {
      return false;
    }
  }

  if (to instanceof Element) {
    var pos = to.getBoundingClientRect();
    to = {
      top: pos.top,
      left: pos.left
    };
  } else {
    to.top -= el.scrollTop;
    to.left -= el.scrollLeft;
  }

  if (direction === 'vertical' || direction === 'both') {
    var topChange = to.top + (options.shiftTop || 0);
    if (topChange !== 0) {
      target.scrollTop = topChange;
    }
  }

  if (direction === 'horizontal' || direction === 'both') {
    var leftChange = to.left + (options.shiftLeft || 0);
    if (leftChange !== 0) {
      target.scrollLeft = leftChange;
    }
  }

  if (Object.keys(target).length) {
    return engine(el, {
      a: target,
      duration: options.duration || 1000,
      ease: options.ease || 'linear',
      cb: cb
    });
  }
};

exports('rolling/to', rollTo);
