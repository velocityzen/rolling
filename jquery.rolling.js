"use strict";!function(t,n){var e={},r=function(n){var r=e[n]||t[n];if(!r)throw new Error("Requested module '"+n+"' has not been defined.");return r},i=function(n,r,i){i?t[n]=r:e[n]=r};!function(t){for(var n,e=0,r=["ms","moz","webkit","o"],o=0;o<r.length&&!t.requestAnimationFrame;++o)n=t[r[o]+"RequestAnimationFrame"];n||(n=t.requestAnimationFrame||function(n){var r=(new Date).getTime(),i=Math.max(0,16-(r-e)),o=t.setTimeout(function(){n(r+i)},i);return e=r+i,o}),i("requestAnimationFrame",n)}(t,n),function(t,n,e){i("easing",{linear:function(t,n,e,r){return e*t/r+n},inQuad:function(t,n,e,r){return e*(t/=r)*t+n},outQuad:function(t,n,e,r){return-e*(t/=r)*(t-2)+n},inOutQuad:function(t,n,e,r){return(t/=r/2)<1?e/2*t*t+n:-e/2*(--t*(t-2)-1)+n},inCubic:function(t,n,e,r){return e*(t/=r)*t*t+n},outCubic:function(t,n,e,r){return e*((t=t/r-1)*t*t+1)+n},inOutCubic:function(t,n,e,r){return(t/=r/2)<1?e/2*t*t*t+n:e/2*((t-=2)*t*t+2)+n},inQuart:function(t,n,e,r){return e*(t/=r)*t*t*t+n},outQuart:function(t,n,e,r){return-e*((t=t/r-1)*t*t*t-1)+n},inOutQuart:function(t,n,e,r){return(t/=r/2)<1?e/2*t*t*t*t+n:-e/2*((t-=2)*t*t*t-2)+n},inQuint:function(t,n,e,r){return e*(t/=r)*t*t*t*t+n},outQuint:function(t,n,e,r){return e*((t=t/r-1)*t*t*t*t+1)+n},inOutQuint:function(t,n,e,r){return(t/=r/2)<1?e/2*t*t*t*t*t+n:e/2*((t-=2)*t*t*t*t+2)+n},inSine:function(t,n,e,r){return-e*Math.cos(t/r*(Math.PI/2))+e+n},outSine:function(t,n,e,r){return e*Math.sin(t/r*(Math.PI/2))+n},inOutSine:function(t,n,e,r){return-e/2*(Math.cos(Math.PI*t/r)-1)+n},inExpo:function(t,n,e,r){return 0==t?n:e*Math.pow(2,10*(t/r-1))+n},outExpo:function(t,n,e,r){return t==r?n+e:e*(-Math.pow(2,-10*t/r)+1)+n},inOutExpo:function(t,n,e,r){return 0==t?n:t==r?n+e:(t/=r/2)<1?e/2*Math.pow(2,10*(t-1))+n:e/2*(-Math.pow(2,-10*--t)+2)+n},inCirc:function(t,n,e,r){return-e*(Math.sqrt(1-(t/=r)*t)-1)+n},outCirc:function(t,n,e,r){return e*Math.sqrt(1-(t=t/r-1)*t)+n},inOutCirc:function(t,n,e,r){return(t/=r/2)<1?-e/2*(Math.sqrt(1-t*t)-1)+n:e/2*(Math.sqrt(1-(t-=2)*t)+1)+n},inElastic:function(t,n,e,r){var i=1.70158,o=0,u=e;if(0==t)return n;if(1==(t/=r))return n+e;if(o||(o=.3*r),u<Math.abs(e)){u=e;var i=o/4}else var i=o/(2*Math.PI)*Math.asin(e/u);return-(u*Math.pow(2,10*(t-=1))*Math.sin(2*(t*r-i)*Math.PI/o))+n},outElastic:function(t,n,e,r){var i=1.70158,o=0,u=e;if(0==t)return n;if(1==(t/=r))return n+e;if(o||(o=.3*r),u<Math.abs(e)){u=e;var i=o/4}else var i=o/(2*Math.PI)*Math.asin(e/u);return u*Math.pow(2,-10*t)*Math.sin(2*(t*r-i)*Math.PI/o)+e+n},inOutElastic:function(t,n,e,r){var i=1.70158,o=0,u=e;if(0==t)return n;if(2==(t/=r/2))return n+e;if(o||(o=.3*r*1.5),u<Math.abs(e)){u=e;var i=o/4}else var i=o/(2*Math.PI)*Math.asin(e/u);return 1>t?-.5*u*Math.pow(2,10*(t-=1))*Math.sin(2*(t*r-i)*Math.PI/o)+n:u*Math.pow(2,-10*(t-=1))*Math.sin(2*(t*r-i)*Math.PI/o)*.5+e+n},inBack:function(t,n,r,i,o){return o==e&&(o=1.70158),r*(t/=i)*t*((o+1)*t-o)+n},outBack:function(t,n,r,i,o){return o==e&&(o=1.70158),r*((t=t/i-1)*t*((o+1)*t+o)+1)+n},inOutBack:function(t,n,r,i,o){return o==e&&(o=1.70158),(t/=i/2)<1?r/2*t*t*(((o*=1.525)+1)*t-o)+n:r/2*((t-=2)*t*(((o*=1.525)+1)*t+o)+2)+n}})}(t,n),function(t,n,e){var o=r("requestAnimationFrame"),u=r("easing"),a="onwheel"in n.createElement("div")?"wheel":n.onmousewheel!==e?"mousewheel":"DOMMouseScroll",c=!0,s=0,f=0,l=[],h=function(){for(var t in l){var n=l[t],e=n.el,r=n.a,i=Date.now()-n.begin;i>n.duration&&(i=n.duration,n.stop(),n.cb&&n.done());for(var u in r)e[u]=n.ease(i,r[u].b,r[u].c,n.duration)}c&&o(h)},M=function(t,n,e,r,i){var o=this;o.el=t,o.duration=e,o.cb=i,o.ease=u[r],o.a={};for(var c in n)o.a[c]={b:t[c],c:n[c]};o.scrollHandler=function(){o.stop(),t.removeEventListener(a,o.scrollHandler)},t.addEventListener(a,o.scrollHandler,!1),o.begin=Date.now(),o.start()};M.prototype.start=function(){this.id=s++,this.el.setAttribute("data-rolling",this.id),l[this.id]=this,c=!0,!f&&h(),f++},M.prototype.stop=function(){this.el.removeEventListener(a,this.scrollHandler),this.el.removeAttribute("data-rolling"),delete l[this.id],f--,f||(c=!1)},M.prototype.done=function(){var t=this;setTimeout(function(){t.cb(t.el)},0)};var d=function(t,n,e,r,i){var o=t.getAttribute("data-rolling");return o&&l[o].stop(),new M(t,n,e,r,i)};i("roll",d)}(t,n),function(t,n){var e=r("roll"),o=!!navigator.userAgent.match(/webkit/i),u=function(r,i,u){(r===t||r===n.body||r===n.documentElement)&&(r=o?n.body:n.documentElement);var a={},c=i.to,s=i.direction||"vertical",f=i.shiftTop||0,l=i.shiftLeft||0,h=i.duration||1e3,M=i.ease||"linear";if("string"==typeof c&&(c=r.querySelector(c),!c))return!1;if(c instanceof Element){var d=c.getBoundingClientRect();c={top:d.top,left:d.left}}else c.top-=r.scrollTop,c.left-=r.scrollLeft;return("vertical"===s||"both"===s)&&(a.scrollTop=c.top+f),("horizontal"===s||"both"===s)&&(a.scrollLeft=c.left+l),e(r,a,h,M,u)};i("rollTo",u)}(t,n),function(){var t=r("rollto");jQuery.fn.extend({rollTo:function(n,e,r){return n instanceof jQuery&&(n=n[0]),t(this[0],n,e,r),this}})}(t,n)}(window,document);
