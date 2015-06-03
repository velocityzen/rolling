/*eslint-disable strict */
/*global jQuery */
var rollTo = require("rolling/to"),
	rollOn = require("rolling/on");

jQuery.fn.extend({
	rollTo: function(options, cb) {
		rollTo(this[0], options, cb);
		return this;
	},

	rollOn: function(options, cb) {
		rollOn(this[0], options, cb);
		return this;
	}
});
