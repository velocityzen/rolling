/*eslint-disable strict */
/*global jQuery */
var rollTo = require("rolling/rollto"),
	rollOn = require("rolling/rollon");

jQuery.fn.extend({
	rollTo: function(el, options, cb) {
		if(el instanceof jQuery) {
			el = el[0];
		}
		rollTo(this[0], el, options, cb);
		return this;
	},

	rollOn: function(el, options, cb) {
		if(el instanceof jQuery) {
			el = el[0];
		}
		rollOn(this[0], el, options, cb);
		return this;
	}
});
