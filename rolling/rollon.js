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
