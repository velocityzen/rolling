/*eslint-disable strict */
var lastTime = 0;
var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
var requestAnimationFrame;

for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
}

if (!requestAnimationFrame) {
  requestAnimationFrame = window.requestAnimationFrame || function(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

exports('util/detective', { requestAnimationFrame: requestAnimationFrame });
