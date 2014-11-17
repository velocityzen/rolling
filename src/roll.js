/*jshint
    strict: false,
    browser:true
*/

var requestAnimationFrame = require('requestAnimationFrame'),
	easing = require('easing'),
	isMozilla = !!navigator.userAgent.match(/firefox/i),
    userScrollEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll", // let's assume that remaining browsers are older Firefox

	isRolling = true,
	queue = [];

var engine = function() {
	for (var i in queue) {
		var self = queue[i],
			el = self.el,
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
	}

	isRolling && requestAnimationFrame(engine);
};

var Roll = function(el, rolls, duration, ease, cb) {
	var self = this;
	self.el = el;
	self.duration = duration;
	self.cb = cb;
	self.ease = easing[ease];
	self.a = {};

	for (var prop in rolls) {
		self.a[prop] = {
			b: el[prop],
			c: rolls[prop]
		};
	}

	self.scrollHandler = function(e) {
		self.stop();
		el.removeEventListener(userScrollEvent, self.scrollHandler);
	};

	el.addEventListener(userScrollEvent, self.scrollHandler, false);

	self.begin = Date.now();
	self.start();
};

Roll.prototype.start = function() {
	this.index = queue.push(this) - 1;
	isRolling = true;
	queue.length && engine();
};

Roll.prototype.stop = function() {
	this.el.removeEventListener(userScrollEvent, this.scrollHandler);
	queue.splice(this.index, 1);
	if(!queue.length) {
		isRolling = false;
	}
};

Roll.prototype.done = function() {
	var self = this;
	setTimeout(function () {
		self.cb.call(self.el);
	}, 0);
};


exports("roll", Roll);
