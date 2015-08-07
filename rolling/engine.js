/*eslint-disable strict */
var rAF = require("detective/raf");
var easing = require("rolling/easing");

var userScrollEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
	document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
	"DOMMouseScroll", // let's assume that remaining browsers are older Firefox

	queueIndex = 0,
	queueLength = 0,
	queue = [],
	documentElement = document.documentElement;

//listeners sugar
var on = function(el, event, cb) {
	el.addEventListener(event, cb, false);
};

var off = function(el, event, cb) {
	el.removeEventListener(event, cb);
};

//handling window resize
var windowResized = true,
	wHeight,
	wWidth,

	onWindowResize = function() {
		windowResized = true;
	};
on(window, "resize", onWindowResize);

//calc engine
var engine = function() {
	if(windowResized) {
		wHeight = Math.max(documentElement.clientHeight, window.innerHeight || 0);
		wWidth = Math.max(documentElement.clientWidth, window.innerWidth || 0);
	}

	for (var i in queue) {
		var frame = queue[i];
		(frame.toUpdate || windowResized) && frame.action();
	}

	windowResized = false;
	queueLength && rAF(engine);
};

//actions
var actions = {
	rollto: function() {
		var self = this,
			el = this.el,
			a = self.a,
			time = Date.now() - self.begin;

		if(time > self.duration) {
			time = self.duration;
			self.stop();
			self.cb && self.done();
		}

		for (var prop in a) {
			el[prop] = self.ease(time, a[prop].b, a[prop].c, self.duration);
		}
	},

	rollon:	function() {
		var self = this,
			el = self.el,
			conditionsArray = self.c,
			posEl = el.getBoundingClientRect();

		for (var i in conditionsArray) {
			var conditionsItem = conditionsArray[i],
				conditions = conditionsItem.c,
				targets = conditionsItem.on;

			for(var t = 0, l = targets.length; t < l; t++ ) {
				var target = targets[t],
					posTarget = target.getBoundingClientRect(),
					isSelf = (el === target),
					newValue;

				//cleanup cache
				self.current = {};

				for(var c in conditions) {
					var conds = conditions[c];
					newValue = true;

					for(var j in conds) {
						var elProp = Object.keys(conds[j])[0],
							targetProp = conds[j][elProp][0],
							value = conds[j][elProp][1];

						var current = self.getCurrent(elProp + targetProp, isSelf, posEl, posTarget);
						if((elProp === "top" || elProp === "left") ? (current < value) : (current > value)) {
							newValue = false;
							break;
						}
					}

					if(newValue === true) {
						break;
					}
				}

				var currentState = target.getAttribute("data-rollon-state");
				if( !currentState || (currentState === "true") !== newValue) {
					target.setAttribute("data-rollon-state", newValue);
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

		for (var c in conditionsArray) {
			var cond = conditionsArray[c];

			if(cond.d === "v" && absTop > cond.t && ((self.vertical && top > 0) || (!self.vertical && top < 0)) ) {
				self.vertical = !self.vertical;
				cond.cb(self.vertical);
			} else if(cond.d === "h" && absLeft > cond.t && ((self.horizontal && left > 0) || (!self.horizontal && left < 0)) ) {
				self.horizontal = !self.horizontal;
				cond.cb(self.horizontal);
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
	self.action = actions[type];

	switch(type) {
		case "rollto":
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

			self.onScroll = function() {
				self.stop();
				off(el, userScrollEvent, self.onScroll);
			};
			on(el, userScrollEvent, self.onScroll);

			self.begin = Date.now();
			self.toUpdate = true;

			break;

		case "rolldirections":
			self.top = el.scrollTop;
			self.left = el.scrollLeft;

			self.onScroll = function() {
				self.toUpdate = true;
			};
			on(el, userScrollEvent, self.onScroll);
			self.c = [];
			self.add(options);
			break;

		case "rollon":
			self.onScroll = function() {
				self.toUpdate = true;
			};

			if(self.isWindow) {
				on(window, "scroll", self.onScroll);
			} else {
				on(el, "scroll", self.onScroll);
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
		this.el.setAttribute("data-" + this.type, this.id);
		queue[this.id] = this;
		++queueLength === 1 && engine();
	},

	stop: function() {
		if(this.a) {
			off(this.el, userScrollEvent, this.onScroll);
		} else {
			off(window, "resize", this.onScroll);
			off(window, "scroll", this.onScroll);
			off(this.el, "scroll", this.onScroll);
			this.el.removeAttribute("data-rollon-state");
		}

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

	update: function() {
		var conditions = this.c;
		for (var i in conditions) {
			var c = conditions[i];
			if(c.selector) {
				c.on = this.el.querySelectorAll(c.selector);
			}
		}
		this.toUpdate = true;
	},

	getCurrent: function(name, isSelf, posEl, posTarget) {
		if(!this.current[name]) {
			this.current[name] = calc[name].call(this, isSelf, posEl, posTarget);
		}

		return this.current[name];
	}
};

var calc = {
	toptop: 		function(isSelf, e, t) { return this.isWindow ? t.top : isSelf ? this.el.scrollTop : t.top - e.top; },
	topmiddle: 		function(isSelf, e, t) { return this.getCurrent("toptop", isSelf, e, t) + t.height / 2; },
	topbottom: 		function(isSelf, e, t) { return this.isWindow ? t.bottom : t.bottom - e.top; },

	middletop: 		function(isSelf, e, t) { return this.getCurrent("toptop", isSelf, e, t) - (this.isWindow ? wHeight / 2 : e.height / 2); },
	middlemiddle: 	function(isSelf, e, t) { return this.getCurrent("middletop", isSelf, e, t) + t.height / 2; },
	middlebottom: 	function(isSelf, e, t) { return -this.getCurrent("bottombottom", isSelf, e, t) - (this.isWindow ? wHeight / 2 : e.height / 2); },

	bottomtop: 		function(isSelf, e, t) { return this.isWindow ? t.top - wHeight : t.top - e.bottom; },
	bottommiddle: 	function(isSelf, e, t) { return this.getCurrent("bottombottom", isSelf, e, t) - t.height / 2; },
	bottombottom: 	function(isSelf, e, t) { return this.isWindow ? t.bottom - wHeight : isSelf ? this.el.scrollHeight - this.el.scrollTop - this.el.offsetHeight : t.bottom - e.bottom; },

	leftleft: 		function(isSelf, e, t) { return this.isWindow ? t.left : isSelf ? this.el.scrollLeft : t.left - e.left; },
	leftcenter: 	function(isSelf, e, t) { return this.getCurrent("leftleft", isSelf, e, t) + t.width / 2; },
	leftright: 		function(isSelf, e, t) { return this.isWindow ? t.right : t.right - e.left; },

	centerleft: 	function(isSelf, e, t) { return this.getCurrent("leftleft", isSelf, e, t) - (this.isWindow ? wWidth / 2 : e.width / 2); },
	centercenter: 	function(isSelf, e, t) { return this.getCurrent("centerleft", isSelf, e, t) + t.width / 2; },
	centerright: 	function(isSelf, e, t) { return -this.getCurrent("rightright", isSelf, e, t) - (this.isWindow ? wWidth / 2 : e.width / 2); },

	rightleft: 		function(isSelf, e, t) { return this.isWindow ? t.left - wWidth : t.left - e.right; },
	rightcenter: 	function(isSelf, e, t) { return this.getCurrent("rightright", isSelf, e, t) - t.width / 2; },
	rightright: 	function(isSelf, e, t) { return this.isWindow ? t.right - wWidth : isSelf ? this.el.scrollWidth - this.el.scrollLeft - this.el.offsetWidth : t.right - e.right; }
};

exports("rolling/engine", {
	on: function(el, options) {
		var id = el.getAttribute("data-rollon");
		if(id === null) {
			return new RollFrame(el, "rollon", options);
		} else {
			queue[id].add(options);
			return queue[id];
		}
	},

	to: function(el, options) {
		var id = el.getAttribute("data-rollto");
		id && queue[id].stop();
		return new RollFrame(el, "rollto", options);
	},

	directions: function(el, options) {
		var id = el.getAttribute("data-rolldirections");
		if(id === null) {
			return new RollFrame(el, "rolldirections", options);
		} else {
			queue[id].add(options);
			return queue[id];
		}
	}
});

