"use strict";

var options = {
	src: "./rolling",
	dst: "./"
};

var js = {
	"rolling.js": [
		"raf.js",
		"easing.js",
		"engine.js",
		"rollto.js",
		"rollon.js",
		"rolldirections.js",
		"../lib/browser.js"
	],

	"jquery.rolling.js": [
		"raf.js",
		"easing.js",
		"engine.js",
		"rollto.js",
		"rollon.js",
		"rolldirections.js",
		"../lib/jquery.js"
	]
};

module.exports = {
	options: options,

	"default": {
		js: js
	},

	"belt:js": {
		tools: ["src-files", "common-js", "uglify", "dst-file"]
	}
};
