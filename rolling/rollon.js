/*eslint-disable strict */
var engineRollOn = require("rolling/engine").rollon;
var rxCondition = /^([a-z]+)(?:\(([-0-9]+)\))?/,
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
	}

	if(typeof options.on === "string") {
		parsed.selector = options.on;
	} else if(!options.on) {
		parsed.on = [el];
	} else {
		parsed.on = options.on[0] ? options.on : [options.on];
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
