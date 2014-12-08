/*jshint
    strict: false,
    browser:true
*/

var requestAnimationFrame = require('detective/raf'),
	easing = require('rolling/easing'),
    userScrollEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll", // let's assume that remaining browsers are older Firefox

	queueIndex = 0,
	queueLength = 0,
	queue = [],
	docEl = document.documentElement;

//handling window resize
var windowResized = true,
	wHeight,
	wHalfHeight,
	wWidth,
	wHalfWidth,

	onWindowResize = function() {
		windowResized = true;
	};

window.addEventListener("resize", onWindowResize, false);

//calc engine
var engine = function() {
	if(windowResized) {
		wHeight = Math.max(docEl.clientHeight, window.innerHeight || 0);
		wWidth = Math.max(docEl.clientWidth, window.innerWidth || 0);
		wHalfHeight = wHeight / 2;
		wHalfWidth = wWidth / 2;
		windowResized = false;
	}

	for (var i in queue) {
		var self = queue[i];
		self.a && self.animations();
		self.c && self.updated && self.conditions();
	}

	queueLength && requestAnimationFrame(engine);
};

//animation frame class
var RollFrame = function(el, options) {
	var self = this;
	self.el = el;
	self.isWindow = (el === document.body || el === docEl);

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
			self.updated = true;
		};

		if(self.isWindow) {
			window.addEventListener("scroll", self.onScroll, false);
		} else {
			el.addEventListener("scroll", self.onScroll, false);
		}

		window.addEventListener("resize", self.onScroll, false);

		self.type = "rollon";
		self.c = [];
		self.add(options);
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
		this.el.setAttribute("data-"+this.type, this.id);
		queue[this.id] = this;
		++queueLength === 1 && engine();
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

	update: function() {
		var conditions = this.c;
		for (var i in conditions) {
			var c = conditions[i];
			if(c.selector) {
				c.on = this.el.querySelectorAll(c.selector);
			}
		}
		this.updated = true;
	},

	conditions: function() {
		var self = this,
			el = self.el,
			conditionsArray = self.c,
		 	top, left, bottom, right, middle, center,
		 	posEl = el.getBoundingClientRect();

		for (var i in conditionsArray) {
			var conditionsItem = conditionsArray[i],
				conditions = conditionsItem.c,
				targets = conditionsItem.on;

			for(var t = 0, l = targets.length; t<l; t++ ) {
				var target = targets[t],
					posTarget = target.getBoundingClientRect(),
					newValue;

				if(el === target) {
					top = el.scrollTop;
					left = el.scrollLeft;

					if(self.isWindow) {
						bottom = top + wHeight;
						right = left + wWidth;
					} else {
						bottom = top + el.offsetHeight;
						right = left + el.offsetWidth;
					}
				} else if(self.isWindow) {
					top = posTarget.top;
					left = posTarget.left;
					bottom = posTarget.bottom - wHeight;
					right = posTarget.right - wWidth;
				 } else {
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

						if( (name === "top" && top < value) ||
							(name === "middle" && (top - value > wHalfHeight || bottom + value < -wHalfHeight) ) ||
							(name === "bottom" && bottom > value ) ||
							(name === "left" && left < value ) ||
							(name === "center" && (left - value > wHalfWidth || right + value < -wHalfWidth) ) ||
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

				if( (target.getAttribute("data-rollon-state") === "true") !== newValue) {
					target.setAttribute("data-rollon-state", newValue);
					conditionsItem.cb(newValue, target);
				}
			}
		}

		self.updated = false;
	}
};

exports("rolling/engine", {
	rollon: function(el, options) {
		var id = el.getAttribute("data-rollon");
		if(id === null) {
			return new RollFrame(el, options);
		} else {
			queue[id].add(options);
			return queue[id];
		}
	},

	rollto: function(el, options) {
		var id = el.getAttribute("data-rollto");
		id && queue[id].stop();
		return new RollFrame(el, options);
	}
});

