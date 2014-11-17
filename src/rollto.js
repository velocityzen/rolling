/*jshint
    strict: false,
    browser:true
*/

var Roll = require('roll'),
	isWebkit = !!navigator.userAgent.match(/webkit/i);

var rollTo = function(el, options, cb) {
	if(el === window || el === document.body || el === document.documentElement) {
		el = isWebkit ? document.body : document.documentElement;
	}

    var target = {},
    	to = options.to,
    	direction = options.direction || "vertical",
    	shiftTop = options.shiftTop || 0,
    	shiftLeft = options.shiftLeft || 0,
    	duration = options.duration || 1000,
    	ease = options.ease || "linear";

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
		target.scrollTop = to.top + shiftTop;
	}

	if(direction === "horizontal" || direction ==="both") {
		target.scrollLeft = to.left + shiftLeft;
	}

	return new Roll(el, target, duration, ease, cb);
};

exports("rollTo", rollTo, true);
