/*jshint
    strict: false,
    browser:true,
    jquery: true
*/

var rollTo = require('rollto'),
	rollOn = require('rollon');

jQuery.fn.extend({
	rollTo: function(el, options, cb) {
		if(el instanceof jQuery) {
			el = el[0];
		}
		rollTo(this[0], el, options, cb);
		return this;
	}
});
