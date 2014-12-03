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
