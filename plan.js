"use strict";

var options = {
	src: "./src",
	dst: "./"
};

var js = {
	"rolling.js": [
		"raf.js",
		"easing.js",
		"engine.js",
		"rollto.js",
		"rollon.js",
	],

	"jquery.rolling.js": [
		"raf.js",
		"easing.js",
		"engine.js",
		"rollto.js",
		"rollon.js",
		"jquery.js",
	]
};

module.exports = {
	options: options,

	"default": {
		js: js,
	},

	"belt:js": {
		tools: ["concat", "common-js", "uglify"]
	}
};
