/*eslint-disable strict */
var rAF = require('util/detective').requestAnimationFrame;
var isTouch = require('util/detective').isTouch;
var easing = require('rolling/easing');
var userScrollEvent = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support 'wheel'
  document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least 'mousewheel'
  'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox

var queueIndex = 0;
var queueLength = 0;
var queue = [];
var documentElement = document.documentElement;

//listeners sugar
var on = function(el, event, cb) {
  el.addEventListener(event, cb, false);
};

var off = function(el, event, cb) {
  el.removeEventListener(event, cb);
};

//handling window resize
var windowResized = true;
var wHeight;
var wWidth;

var onWindowResize = function() {
  windowResized = true;
};
on(window, 'resize', onWindowResize);

//calc engine
var engine = function() {
  if (windowResized) {
    wHeight = Math.max(documentElement.clientHeight, window.innerHeight || 0);
    wWidth = Math.max(documentElement.clientWidth, window.innerWidth || 0);
  }

  for (var i in queue) {
    var frame = queue[i];
    (frame.toUpdate || windowResized) && frame.calc();
  }

  windowResized = false;
  queueLength && rAF(engine);
};

//calcs
var calcs = {
  rollto: function() {
    var self = this;
    var el = this.el;
    var a = self.a;
    var time = Date.now() - self.begin;

    if (time > self.duration) {
      time = self.duration;
      self.stop();
      self.cb && self.done();
    }

    for (var prop in a) {
      el[prop] = self.ease(time, a[prop].b, a[prop].c, self.duration);
    }
  },

  rollon: function() {
    var self = this;
    var el = self.el;
    var conditionsArray = self.c;
    var posEl = el.getBoundingClientRect();

    for (var i in conditionsArray) {
      var conditionsItem = conditionsArray[i];
      var conditions = conditionsItem.c;
      var targets = conditionsItem.on;

      for (var t = 0, l = targets.length; t < l; t++ ) {
        var target = targets[t];
        var posTarget = target.getBoundingClientRect();
        var isSelf = (el === target);
        var newValue;

        //cleanup cache
        self.current = {};

        for (var c in conditions) {
          var conds = conditions[c];
          newValue = true;

          for (var j in conds) {
            var elProp = Object.keys(conds[j])[0];
            var targetProp = conds[j][elProp][0];
            var value = conds[j][elProp][1];

            var current = self.getPos(elProp + targetProp, isSelf, posEl, posTarget);
            if ((elProp === 'top' || elProp === 'left') ? (current < value) : (current > value)) {
              newValue = false;
              break;
            }
          }

          if (newValue === true) {
            break;
          }
        }

        var currentState = target.getAttribute('data-rollon-state-' + i);
        if (!currentState || (currentState === 'true') !== newValue) {
          target.setAttribute('data-rollon-state-' + i, newValue);
          conditionsItem.cb(newValue, target);
        }
      }
    }

    self.toUpdate = false;
  },

  rolldirections: function() {
    var self = this;

    var top = self.top - self.el.scrollTop;
    var left = self.left - self.el.scrollLeft;
    var absTop = Math.abs(top);
    var absLeft = Math.abs(left);
    var conditionsArray = self.c;
    var dir;

    for (var c in conditionsArray) {
      var cond = conditionsArray[c];

      if (cond.d === 'v' && absTop > cond.t) {
        dir = top < 0;
        if (self.vertical !== dir) {
          self.vertical = dir;
          cond.cb(self.vertical);
        }
      } else if (cond.d === 'h' && absLeft > cond.t) {
        dir = left < 0;
        if (self.horizontal !== dir) {
          self.horizontal = dir;
          cond.cb(self.horizontal);
        }
      }
    }

    self.top = self.el.scrollTop;
    self.left = self.el.scrollLeft;
    self.toUpdate = false;
  }
};

//animation frame class
var RollFrame = function(el, type, options) {
  var self = this;
  self.el = el;
  self.isWindow = (el === document.body || el === documentElement);
  self.type = type;
  self.calc = calcs[type];

  switch (type) {
    case 'rollto':
      self.duration = options.duration;
      self.ease = easing[options.ease];
      self.cb = options.cb;
      self.a = {}; //animation properties

      for (var prop in options.a) {
        self.a[prop] = {
          b: el[prop],  // beging value
          c: options.a[prop]  // change value
        };
      }

      self.onScroll = function() {
        self.stop();
        off(el, userScrollEvent, self.onScroll);
      };
      on(el, userScrollEvent, self.onScroll);

      self.begin = Date.now();
      self.toUpdate = true;

      break;

    case 'rolldirections':
      self.top = el.scrollTop;
      self.left = el.scrollLeft;

      self.onScroll = function() {
        self.toUpdate = true;
      };
      on(el, userScrollEvent, self.onScroll);
      isTouch && on(el, 'touchmove', self.onScroll);
      self.c = [];
      self.add(options);
      break;

    case 'rollon':
      self.onScroll = function() {
        self.toUpdate = true;
      };

      if (self.isWindow) {
        on(window, 'scroll', self.onScroll);
      } else {
        on(el, 'scroll', self.onScroll);
      }

      self.c = [];
      self.add(options);
      break;
  }

  self.start();
};

RollFrame.prototype = {
  add: function(conditions) {
    this.c.push(conditions);
    this.update();
  },

  start: function() {
    this.id = queueIndex++;
    this.el.setAttribute('data-' + this.type, this.id);
    queue[this.id] = this;
    ++queueLength === 1 && engine();
  },

  stop: function() {
    if (this.a) {
      off(this.el, userScrollEvent, this.onScroll);
    } else {
      off(window, 'resize', this.onScroll);
      off(window, 'scroll', this.onScroll);
      off(window, 'touchmove', this.onScroll);
      off(this.el, 'scroll', this.onScroll);
      this.el.removeAttribute('data-rollon-state');
    }

    this.el.removeAttribute('data-' + this.type);
    delete queue[this.id];
    queueLength--;
  },

  done: function() {
    var self = this;
    setTimeout(function() {
      self.cb(self.el);
    }, 0);
  },

  update: function() {
    var conditions = this.c;
    for (var i in conditions) {
      var c = conditions[i];
      if (c.selector) {
        c.on = this.el.querySelectorAll(c.selector);
      }
    }
    this.toUpdate = true;
  },

  getPos: function(name, isSelf, posEl, posTarget) {
    if (!this.current[name]) {
      this.current[name] = positions[name].call(this, isSelf, posEl, posTarget);
    }

    return this.current[name];
  }
};

var positions = {
  toptop:       function(isSelf, e, t) { return this.isWindow ? t.top : isSelf ? this.el.scrollTop : t.top - e.top; },
  topmiddle:    function(isSelf, e, t) { return this.getPos('toptop', isSelf, e, t) + t.height / 2; },
  topbottom:    function(isSelf, e, t) { return this.isWindow ? t.bottom : t.bottom - e.top; },

  middletop:    function(isSelf, e, t) { return this.getPos('toptop', isSelf, e, t) - (this.isWindow ? wHeight / 2 : e.height / 2); },
  middlemiddle: function(isSelf, e, t) { return this.getPos('middletop', isSelf, e, t) + t.height / 2; },
  middlebottom: function(isSelf, e, t) { return -this.getPos('bottombottom', isSelf, e, t) - (this.isWindow ? wHeight / 2 : e.height / 2); },

  bottomtop:    function(isSelf, e, t) { return this.isWindow ? t.top - wHeight : t.top - e.bottom; },
  bottommiddle: function(isSelf, e, t) { return this.getPos('bottombottom', isSelf, e, t) - t.height / 2; },
  bottombottom: function(isSelf, e, t) { return this.isWindow ? t.bottom - wHeight : isSelf ? this.el.scrollHeight - this.el.scrollTop - this.el.offsetHeight : t.bottom - e.bottom; },

  leftleft:     function(isSelf, e, t) { return this.isWindow ? t.left : isSelf ? this.el.scrollLeft : t.left - e.left; },
  leftcenter:   function(isSelf, e, t) { return this.getPos('leftleft', isSelf, e, t) + t.width / 2; },
  leftright:    function(isSelf, e, t) { return this.isWindow ? t.right : t.right - e.left; },

  centerleft:   function(isSelf, e, t) { return this.getPos('leftleft', isSelf, e, t) - (this.isWindow ? wWidth / 2 : e.width / 2); },
  centercenter: function(isSelf, e, t) { return this.getPos('centerleft', isSelf, e, t) + t.width / 2; },
  centerright:  function(isSelf, e, t) { return -this.getPos('rightright', isSelf, e, t) - (this.isWindow ? wWidth / 2 : e.width / 2); },

  rightleft:    function(isSelf, e, t) { return this.isWindow ? t.left - wWidth : t.left - e.right; },
  rightcenter:  function(isSelf, e, t) { return this.getPos('rightright', isSelf, e, t) - t.width / 2; },
  rightright:   function(isSelf, e, t) { return this.isWindow ? t.right - wWidth : isSelf ? this.el.scrollWidth - this.el.scrollLeft - this.el.offsetWidth : t.right - e.right; }
};

exports('rolling/engine', {
  on: function(el, options) {
    var id = el.getAttribute('data-rollon');
    if (id === null) {
      return new RollFrame(el, 'rollon', options);
    } else {
      queue[id].add(options);
      return queue[id];
    }
  },

  to: function(el, options) {
    var id = el.getAttribute('data-rollto');
    id && queue[id].stop();
    return new RollFrame(el, 'rollto', options);
  },

  directions: function(el, options) {
    var id = el.getAttribute('data-rolldirections');
    if (id === null) {
      return new RollFrame(el, 'rolldirections', options);
    } else {
      queue[id].add(options);
      return queue[id];
    }
  }
});

