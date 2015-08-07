/*eslint-disable strict */
/*global jQuery */
var rollTo = require("rolling/to"),
	rollOn = require("rolling/on"),
	rollDirections = require("rolling/directions");

jQuery.fn.extend({
	rollTo: function(options, cb) {
		rollTo(this[0], options, cb);
		return this;
	},

	rollOn: function(options, cb) {
		rollOn(this[0], options, cb);
		return this;
	},

	rollDirections: function(options, cb) {
		rollDirections(this[0], options, cb);
		return this;
	}
});
