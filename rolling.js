"use strict";
;(function(window, document, undefined) {
	var modules = {},

		require = function(name) {
			var module = modules[name] || window[name];
			if (!module) {
				throw new Error("Requested module '" + name + "' has not been defined.");
			}
			return module;
		},

		exports = function(name, module, global) {
			if(global) {
				window[name] = module;
			} else {
				modules[name] = module;
			}
		};

(function(window, document, undefined){
/*jshint
    strict: false,
    browser:true
*/

var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'],
    requestAnimationFrame;

for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
}

if (!requestAnimationFrame) {
    requestAnimationFrame = window.requestAnimationFrame || function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

exports("requestAnimationFrame", requestAnimationFrame);
})(window, document);
(function(window, document, undefined){
/*jshint
    strict: false
*/

exports("easing", {
	linear: function (t, b, c, d) {
		return c*t/d + b;
	},

	inQuad: function (t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	outQuad: function (t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	inOutQuad: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	inCubic: function (t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	outCubic: function (t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	inOutCubic: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	inQuart: function (t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	outQuart: function (t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	inOutQuart: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	inQuint: function (t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	outQuint: function (t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	inOutQuint: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	inSine: function (t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	outSine: function (t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	inOutSine: function (t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	inExpo: function (t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	outExpo: function (t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	inOutExpo: function (t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	inCirc: function (t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	outCirc: function (t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	inOutCirc: function (t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	inElastic: function (t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	outElastic: function (t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	inOutElastic: function (t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	inBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	outBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	inOutBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	}
});
})(window, document);
(function(window, document, undefined){
/*jshint
    strict: false,
    browser:true
*/

var requestAnimationFrame = require('requestAnimationFrame'),
	easing = require('easing'),
    userScrollEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll", // let's assume that remaining browsers are older Firefox

	queueIndex = 0,
	queueLength = 0,
	queue = [],
	docEl = document.documentElement;

var engine = function() {
	for (var i in queue) {
		var self = queue[i];
		self.a && self.animations();
		self.c && self.scrollChanged && self.conditions();
	}

	queueLength && requestAnimationFrame(engine);
};

var RollFrame = function(el, options) {
	var self = this;
	self.el = el;

	if(options.a) {
		self.type = "rollto";
		self.duration = options.duration;
		self.ease = easing[options.ease];
		self.cb = options.cb;
		self.a = {}; //animation properties

		for (var prop in options.a) {
			self.a[prop] = {
				b: el[prop], 	// beging value
				c: options.a[prop]	// change value
			};
		}

		self.onScroll = function(e) {
			self.stop();
			el.removeEventListener(userScrollEvent, self.onScroll);
		};
		el.addEventListener(userScrollEvent, self.onScroll, false);

		self.begin = Date.now();
	} else if(options.c) {
		self.onScroll = function(e) {
			self.scrollChanged = true;
		};

		if(el === document.body || el === docEl) {
			window.addEventListener("scroll", self.onScroll, false);
		} else {
			el.addEventListener("scroll", self.onScroll, false);
		}

		window.addEventListener("resize", self.onScroll, false);

		self.scrollChanged = true;
		self.type = "rollon";
		self.c = [];
		self.add(options);
	}
	self.start();
};

RollFrame.prototype = {
	add: function(conditions) {
		this.c.push(conditions);
	},

	start: function() {
		this.id = queueIndex++;
		this.el.setAttribute("data-"+this.type, this.id);
		queue[this.id] = this;
		queueLength++;
		queueLength === 1 && engine();
	},

	stop: function() {
		this.el.removeEventListener(userScrollEvent, this.onScroll);
		this.el.removeAttribute("data-" + this.type);
		delete queue[this.id];
		queueLength--;
	},

	done: function() {
		var self = this;
		setTimeout(function () {
			self.cb(self.el);
		}, 0);
	},

	animations: function() {
		var self = this,
			el = this.el,
		 	a = self.a,
			time =  Date.now() - self.begin;

		if(time > self.duration) {
			time = self.duration;
			self.stop();
			self.cb && self.done();
		}

		for (var prop in a) {
			el[prop] = self.ease(time, a[prop].b, a[prop].c, self.duration);
		}
	},

	conditions: function() {
		var self = this,
			conditionsArray = self.c,
		 	top, left, bottom, right,
		 	newValue;

		for (var i in conditionsArray) {
			var conditionsItem = conditionsArray[i],
				conditions = conditionsItem.c,
				posTarget = conditionsItem.on.getBoundingClientRect();

			if(self.el === document.body || self.el === docEl) {
				top = posTarget.top;
				left = posTarget.left;
				bottom = posTarget.bottom - Math.max(docEl.clientHeight, window.innerHeight || 0);
				right = posTarget.right - Math.max(docEl.clientWidth, window.innerWidth || 0);
			 } else {
			 	var posEl = self.el.getBoundingClientRect();

		 		top = posTarget.top - posEl.top;
				left = posTarget.left - posEl.left;
				bottom = posTarget.bottom - posEl.bottom;
				right = posTarget.right - posEl.right;
			 }

			for(var c in conditions) {
				var conds = conditions[c];
				newValue = true;

				for(var j in conds) {
					var name = Object.keys(conds[j])[0],
						value = conds[j][name];

					/*console.log(
						"top", top,
						"left", left,
						"bottom:", bottom,
						"right:", right
					);*/

					if( (name === "top" && top < value) ||
						(name === "left" && left < value ) ||
						(name === "bottom" && bottom > value ) ||
						(name === "right" && right > value )
					) {
						newValue = false;
						break;
					}
				}

				if(newValue === true) {
					break;
				}
			}

			if(conditionsItem.value !== newValue) {
				conditionsItem.value = newValue;
				conditionsItem.cb(newValue, conditionsItem.on);
			}
		}

		self.scrollChanged = false;
	}
};

exports("engine", {
	rollon: function(el, options) {
		var id = el.getAttribute("data-rollon");
		if(id !== null) {
			queue[id].add(options);
			return queue[id];
		} else {
			return new RollFrame(el, options);
		}
	},

	rollto: function(el, options) {
		var id = el.getAttribute("data-rollto");
		id && queue[id].stop();
		return new RollFrame(el, options);
	}
});
})(window, document);
(function(window, document, undefined){
/*jshint
    strict: false,
    browser:true
*/

var engineRollTo = require('engine').rollto,
	isWebkit = !!navigator.userAgent.match(/webkit/i);

var rollTo = function(el, options, cb) {
	if(el === window || el === document.body || el === document.documentElement) {
		el = isWebkit ? document.body : document.documentElement;
	}

    var target = {},
    	to = options.to,
    	direction = options.direction || "vertical";

    if(typeof to === "string") {
    	to = el.querySelector(to);
		if(!to) {
			return false;
		}
    }

	if(to instanceof Element) {
		var pos = to.getBoundingClientRect();
		to = {
			top: pos.top,
			left: pos.left
		};
	} else {
		to.top -= el.scrollTop;
		to.left -= el.scrollLeft;
	}

	if(direction === "vertical" || direction ==="both") {
		var topChange = to.top + (options.shiftTop || 0);
		if(topChange !== 0) {
			target.scrollTop = topChange;
		}
	}

	if(direction === "horizontal" || direction ==="both") {
		var leftChange = to.left + (options.shiftLeft || 0);
		if(leftChange !== 0) {
			target.scrollLeft = leftChange;
		}
	}

	if(Object.keys(target).length) {
		return engineRollTo(el, {
			a: target,
			duration: options.duration || 1000,
			ease: options.ease || "linear",
			cb: cb
		});
	}
};

exports("rollTo", rollTo, true);
})(window, document);
(function(window, document, undefined){
/*jshint
    strict: false,
    browser:true
*/

var engineRollOn = require('engine').rollon,
	rxCondition = /^([a-z]+)(?:\(([-0-9]+)\))?/,
	isWebkit = !!navigator.userAgent.match(/webkit/i);

var rollOn = function(el, options, cb) {
	if(el === window || el === document.body || el === document.documentElement) {
		el = isWebkit ? document.body : document.documentElement;
	}

    var on = options.on,
    	conditions = options.condition.split(" "),
    	parsed = {
	    	cb: cb,
	    	value: undefined,
	    	c: []
	    },
    	currentConditions;

    if(typeof on === "string") {
    	parsed.on = el.querySelector(on);
    }

	if(!on) {
		parsed.on = el;
	}

	for (var i in conditions) {
		var parsedCondition = conditions[i].match(rxCondition),
			condition = {};

		if(i == 0 || parsedCondition[1] === "or") {
			currentConditions = [];
	    	parsed.c.push(currentConditions);
		}

		if(parsedCondition[1] === "and" || parsedCondition[1] === "or") {continue;}
		condition[parsedCondition[1]] = ~~parsedCondition[2];
		currentConditions.push(condition);
	}

	return engineRollOn(el, parsed, cb);
};

exports("rollOn", rollOn, true);
})(window, document);
})(window, document);
