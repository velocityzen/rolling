/*jshint
    strict: false,
    browser:true
*/

var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'],
    requestAnimationFrame;

for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
}

if (!requestAnimationFrame) {
    requestAnimationFrame = window.requestAnimationFrame || function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

exports("detective/raf", requestAnimationFrame);
