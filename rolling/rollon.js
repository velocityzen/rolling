/*eslint-disable strict */
var engine = require("rolling/engine").on;
var rxCondition = /^([a-z]+)(?:\(([-0-9]+|([a-z]+)(?:\(([-0-9]+|)\))?)\))?/,
	isWebkit = !!navigator.userAgent.match(/webkit/i);

var rollOn = function(el, options, cb) {
	if(el === window || el === document.body || el === document.documentElement) {
		el = isWebkit ? document.body : document.documentElement;
	}

	var conditions = options.condition.split(" "),
		parsed = {
			cb: cb,
			c: []
		},
		currentConditions;

	if(typeof options.on === "string") {
		parsed.selector = options.on;
	} else if(options.on instanceof HTMLElement) {
		parsed.on = [options.on];
	} else if(!options.on) {
		parsed.on = [el];
	}

	for (var i in conditions) {
		var match = conditions[i].match(rxCondition),
			condition = {};

		if(!match) { throw new Error("Can't parse conditions"); }

		if(i == 0 || match[1] === "or") {
			currentConditions = [];
			parsed.c.push(currentConditions);
		}

		if(match[1] === "and" || match[1] === "or") { continue; }

		if(!match[3]) {
			match[3] = match[1];
			match[4] = match[2];
		}

		condition[match[1]] = [match[3], ~~match[4]];
		currentConditions.push(condition);
	}

	return engine(el, parsed, cb);
};

exports("rolling/on", rollOn);
