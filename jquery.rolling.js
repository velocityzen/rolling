"use strict";!function(t,n,e){var o={},i=function(n){var e=o[n]||t[n];if(!e)throw new Error("Requested module '"+n+"' has not been defined.");return e},r=function(n,e,i){i?t[n]=e:o[n]=e};!function(t,n,e){for(var o,i=0,a=["ms","moz","webkit","o"],u=0;u<a.length&&!t.requestAnimationFrame;++u)o=t[a[u]+"RequestAnimationFrame"];o||(o=t.requestAnimationFrame||function(n,e){var o=(new Date).getTime(),r=Math.max(0,16-(o-i)),a=t.setTimeout(function(){n(o+r)},r);return i=o+r,a}),r("detective/raf",o)}(t,n),function(t,n,e){r("rolling/easing",{linear:function(t,n,e,o){return e*t/o+n},inQuad:function(t,n,e,o){return e*(t/=o)*t+n},outQuad:function(t,n,e,o){return-e*(t/=o)*(t-2)+n},inOutQuad:function(t,n,e,o){return(t/=o/2)<1?e/2*t*t+n:-e/2*(--t*(t-2)-1)+n},inCubic:function(t,n,e,o){return e*(t/=o)*t*t+n},outCubic:function(t,n,e,o){return e*((t=t/o-1)*t*t+1)+n},inOutCubic:function(t,n,e,o){return(t/=o/2)<1?e/2*t*t*t+n:e/2*((t-=2)*t*t+2)+n},inQuart:function(t,n,e,o){return e*(t/=o)*t*t*t+n},outQuart:function(t,n,e,o){return-e*((t=t/o-1)*t*t*t-1)+n},inOutQuart:function(t,n,e,o){return(t/=o/2)<1?e/2*t*t*t*t+n:-e/2*((t-=2)*t*t*t-2)+n},inQuint:function(t,n,e,o){return e*(t/=o)*t*t*t*t+n},outQuint:function(t,n,e,o){return e*((t=t/o-1)*t*t*t*t+1)+n},inOutQuint:function(t,n,e,o){return(t/=o/2)<1?e/2*t*t*t*t*t+n:e/2*((t-=2)*t*t*t*t+2)+n},inSine:function(t,n,e,o){return-e*Math.cos(t/o*(Math.PI/2))+e+n},outSine:function(t,n,e,o){return e*Math.sin(t/o*(Math.PI/2))+n},inOutSine:function(t,n,e,o){return-e/2*(Math.cos(Math.PI*t/o)-1)+n},inExpo:function(t,n,e,o){return 0==t?n:e*Math.pow(2,10*(t/o-1))+n},outExpo:function(t,n,e,o){return t==o?n+e:e*(-Math.pow(2,-10*t/o)+1)+n},inOutExpo:function(t,n,e,o){return 0==t?n:t==o?n+e:(t/=o/2)<1?e/2*Math.pow(2,10*(t-1))+n:e/2*(-Math.pow(2,-10*--t)+2)+n},inCirc:function(t,n,e,o){return-e*(Math.sqrt(1-(t/=o)*t)-1)+n},outCirc:function(t,n,e,o){return e*Math.sqrt(1-(t=t/o-1)*t)+n},inOutCirc:function(t,n,e,o){return(t/=o/2)<1?-e/2*(Math.sqrt(1-t*t)-1)+n:e/2*(Math.sqrt(1-(t-=2)*t)+1)+n},inElastic:function(t,n,e,o){var i=1.70158,r=0,a=e;if(0==t)return n;if(1==(t/=o))return n+e;if(r||(r=.3*o),a<Math.abs(e)){a=e;var i=r/4}else var i=r/(2*Math.PI)*Math.asin(e/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin(2*(t*o-i)*Math.PI/r))+n},outElastic:function(t,n,e,o){var i=1.70158,r=0,a=e;if(0==t)return n;if(1==(t/=o))return n+e;if(r||(r=.3*o),a<Math.abs(e)){a=e;var i=r/4}else var i=r/(2*Math.PI)*Math.asin(e/a);return a*Math.pow(2,-10*t)*Math.sin(2*(t*o-i)*Math.PI/r)+e+n},inOutElastic:function(t,n,e,o){var i=1.70158,r=0,a=e;if(0==t)return n;if(2==(t/=o/2))return n+e;if(r||(r=.3*o*1.5),a<Math.abs(e)){a=e;var i=r/4}else var i=r/(2*Math.PI)*Math.asin(e/a);return 1>t?-.5*a*Math.pow(2,10*(t-=1))*Math.sin(2*(t*o-i)*Math.PI/r)+n:a*Math.pow(2,-10*(t-=1))*Math.sin(2*(t*o-i)*Math.PI/r)*.5+e+n},inBack:function(t,n,o,i,r){return r==e&&(r=1.70158),o*(t/=i)*t*((r+1)*t-r)+n},outBack:function(t,n,o,i,r){return r==e&&(r=1.70158),o*((t=t/i-1)*t*((r+1)*t+r)+1)+n},inOutBack:function(t,n,o,i,r){return r==e&&(r=1.70158),(t/=i/2)<1?o/2*t*t*(((r*=1.525)+1)*t-r)+n:o/2*((t-=2)*t*(((r*=1.525)+1)*t+r)+2)+n}})}(t,n),function(t,n,e){var o,a,u,c,l=i("detective/raf"),s=i("rolling/easing"),f="onwheel"in n.createElement("div")?"wheel":n.onmousewheel!==e?"mousewheel":"DOMMouseScroll",h=0,d=0,v=[],p=n.documentElement,m=!0,b=function(){m=!0};t.addEventListener("resize",b,!1);var M=function(){m&&(o=Math.max(p.clientHeight,t.innerHeight||0),u=Math.max(p.clientWidth,t.innerWidth||0),a=o/2,c=u/2,m=!1);for(var n in v){var e=v[n];e.a&&e.animations(),e.c&&e.updated&&e.conditions()}d&&l(M)},g=function(e,o){var i=this;if(i.el=e,i.isWindow=e===n.body||e===p,o.a){i.type="rollto",i.duration=o.duration,i.ease=s[o.ease],i.cb=o.cb,i.a={};for(var r in o.a)i.a[r]={b:e[r],c:o.a[r]};i.onScroll=function(){i.stop(),e.removeEventListener(f,i.onScroll)},e.addEventListener(f,i.onScroll,!1),i.begin=Date.now()}else o.c&&(i.onScroll=function(){i.updated=!0},i.isWindow?t.addEventListener("scroll",i.onScroll,!1):e.addEventListener("scroll",i.onScroll,!1),t.addEventListener("resize",i.onScroll,!1),i.type="rollon",i.c=[],i.add(o));i.start()};g.prototype={add:function(t){this.c.push(t),this.update()},start:function(){this.id=h++,this.el.setAttribute("data-"+this.type,this.id),v[this.id]=this,1===++d&&M()},stop:function(){this.el.removeEventListener(f,this.onScroll),this.el.removeAttribute("data-"+this.type),delete v[this.id],d--},done:function(){var t=this;setTimeout(function(){t.cb(t.el)},0)},animations:function(){var t=this,n=this.el,e=t.a,o=Date.now()-t.begin;o>t.duration&&(o=t.duration,t.stop(),t.cb&&t.done());for(var i in e)n[i]=t.ease(o,e[i].b,e[i].c,t.duration)},update:function(){var t=this.c;for(var n in t){var e=t[n];e.selector&&(e.on=this.el.querySelectorAll(e.selector))}this.updated=!0},conditions:function(){var t,n,e,i,r=this,l=r.el,s=r.c,f=l.getBoundingClientRect();for(var h in s)for(var d=s[h],v=d.c,p=d.on,m=0,b=p.length;b>m;m++){var M,g=p[m],w=g.getBoundingClientRect();l===g?(t=l.scrollTop,n=l.scrollLeft,r.isWindow?(e=t+o,i=n+u):(e=t+l.offsetHeight,i=n+l.offsetWidth)):r.isWindow?(t=w.top,n=w.left,e=w.bottom-o,i=w.right-u):(t=w.top-f.top,n=w.left-f.left,e=w.bottom-f.bottom,i=w.right-f.right);for(var E in v){var y=v[E];M=!0;for(var S in y){var O=Object.keys(y[S])[0],A=y[S][O];if("top"===O&&A>t||"middle"===O&&(t-A>a||-a>e+A)||"bottom"===O&&e>A||"left"===O&&A>n||"center"===O&&(n-A>c||-c>i+A)||"right"===O&&i>A){M=!1;break}}if(M===!0)break}"true"===g.getAttribute("data-rollon-state")!==M&&(g.setAttribute("data-rollon-state",M),d.cb(M,g))}r.updated=!1}},r("rolling/engine",{rollon:function(t,n){var e=t.getAttribute("data-rollon");return null===e?new g(t,n):(v[e].add(n),v[e])},rollto:function(t,n){var e=t.getAttribute("data-rollto");return e&&v[e].stop(),new g(t,n)}})}(t,n),function(t,n,e){var o=i("rolling/engine").rollto,a=!!navigator.userAgent.match(/webkit/i),u=function(e,i,r){(e===t||e===n.body||e===n.documentElement)&&(e=a?n.body:n.documentElement);var u={},c=i.to,l=i.direction||"vertical";if("string"==typeof c&&(c=e.querySelector(c),!c))return!1;if(c instanceof Element){var s=c.getBoundingClientRect();c={top:s.top,left:s.left}}else c.top-=e.scrollTop,c.left-=e.scrollLeft;if("vertical"===l||"both"===l){var f=c.top+(i.shiftTop||0);0!==f&&(u.scrollTop=f)}if("horizontal"===l||"both"===l){var h=c.left+(i.shiftLeft||0);0!==h&&(u.scrollLeft=h)}return Object.keys(u).length?o(e,{a:u,duration:i.duration||1e3,ease:i.ease||"linear",cb:r}):void 0};r("rollTo",u,!0)}(t,n),function(t,n,e){var o=i("rolling/engine").rollon,a=/^([a-z]+)(?:\(([-0-9]+)\))?/,u=!!navigator.userAgent.match(/webkit/i),c=function(e,i,r){(e===t||e===n.body||e===n.documentElement)&&(e=u?n.body:n.documentElement);var c,l=i.condition.split(" "),s={cb:r,c:[]};"string"==typeof i.on&&(s.selector=i.on),"string"==typeof i.on?s.selector=i.on:s.on=i.on?i.on[0]?i.on:[i.on]:[e];for(var f in l){var h=l[f].match(a),d={};(0==f||"or"===h[1])&&(c=[],s.c.push(c)),"and"!==h[1]&&"or"!==h[1]&&(d[h[1]]=~~h[2],c.push(d))}return o(e,s,r)};r("rollOn",c,!0)}(t,n),function(t,n,e){var o=i("rolling/rollto"),r=i("rolling/rollon");jQuery.fn.extend({rollTo:function(t,n,e){return t instanceof jQuery&&(t=t[0]),o(this[0],t,n,e),this},rollOn:function(t,n,e){return t instanceof jQuery&&(t=t[0]),r(this[0],t,n,e),this}})}(t,n)}(window,document);