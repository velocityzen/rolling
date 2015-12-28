!function(t,n,o,e){var e=e||{},i=function(n){var o=e[n]||t[n];if(!o)throw new Error("Requested module '"+n+"' has not been defined.");return o},r=function(n,o,i){i?t[n]=o:e[n]=o};!function(t,n,o){for(var e,i=0,l=["ms","moz","webkit","o"],u=0;u<l.length&&!t.requestAnimationFrame;++u)e=t[l[u]+"RequestAnimationFrame"];e||(e=t.requestAnimationFrame||function(n){var o=(new Date).getTime(),e=Math.max(0,16-(o-i)),r=t.setTimeout(function(){n(o+e)},e);return i=o+e,r}),r("util/detective",{requestAnimationFrame:e})}(t,n),function(t,n,o){r("rolling/easing",{linear:function(t,n,o,e){return o*t/e+n},inQuad:function(t,n,o,e){return o*(t/=e)*t+n},outQuad:function(t,n,o,e){return-o*(t/=e)*(t-2)+n},inOutQuad:function(t,n,o,e){return(t/=e/2)<1?o/2*t*t+n:-o/2*(--t*(t-2)-1)+n},inCubic:function(t,n,o,e){return o*(t/=e)*t*t+n},outCubic:function(t,n,o,e){return o*((t=t/e-1)*t*t+1)+n},inOutCubic:function(t,n,o,e){return(t/=e/2)<1?o/2*t*t*t+n:o/2*((t-=2)*t*t+2)+n},inQuart:function(t,n,o,e){return o*(t/=e)*t*t*t+n},outQuart:function(t,n,o,e){return-o*((t=t/e-1)*t*t*t-1)+n},inOutQuart:function(t,n,o,e){return(t/=e/2)<1?o/2*t*t*t*t+n:-o/2*((t-=2)*t*t*t-2)+n},inQuint:function(t,n,o,e){return o*(t/=e)*t*t*t*t+n},outQuint:function(t,n,o,e){return o*((t=t/e-1)*t*t*t*t+1)+n},inOutQuint:function(t,n,o,e){return(t/=e/2)<1?o/2*t*t*t*t*t+n:o/2*((t-=2)*t*t*t*t+2)+n},inSine:function(t,n,o,e){return-o*Math.cos(t/e*(Math.PI/2))+o+n},outSine:function(t,n,o,e){return o*Math.sin(t/e*(Math.PI/2))+n},inOutSine:function(t,n,o,e){return-o/2*(Math.cos(Math.PI*t/e)-1)+n},inExpo:function(t,n,o,e){return 0==t?n:o*Math.pow(2,10*(t/e-1))+n},outExpo:function(t,n,o,e){return t==e?n+o:o*(-Math.pow(2,-10*t/e)+1)+n},inOutExpo:function(t,n,o,e){return 0==t?n:t==e?n+o:(t/=e/2)<1?o/2*Math.pow(2,10*(t-1))+n:o/2*(-Math.pow(2,-10*--t)+2)+n},inCirc:function(t,n,o,e){return-o*(Math.sqrt(1-(t/=e)*t)-1)+n},outCirc:function(t,n,o,e){return o*Math.sqrt(1-(t=t/e-1)*t)+n},inOutCirc:function(t,n,o,e){return(t/=e/2)<1?-o/2*(Math.sqrt(1-t*t)-1)+n:o/2*(Math.sqrt(1-(t-=2)*t)+1)+n},inElastic:function(t,n,o,e){var i=1.70158,r=0,l=o;if(0==t)return n;if(1==(t/=e))return n+o;if(r||(r=.3*e),l<Math.abs(o)){l=o;var i=r/4}else var i=r/(2*Math.PI)*Math.asin(o/l);return-(l*Math.pow(2,10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/r))+n},outElastic:function(t,n,o,e){var i=1.70158,r=0,l=o;if(0==t)return n;if(1==(t/=e))return n+o;if(r||(r=.3*e),l<Math.abs(o)){l=o;var i=r/4}else var i=r/(2*Math.PI)*Math.asin(o/l);return l*Math.pow(2,-10*t)*Math.sin((t*e-i)*(2*Math.PI)/r)+o+n},inOutElastic:function(t,n,o,e){var i=1.70158,r=0,l=o;if(0==t)return n;if(2==(t/=e/2))return n+o;if(r||(r=e*(.3*1.5)),l<Math.abs(o)){l=o;var i=r/4}else var i=r/(2*Math.PI)*Math.asin(o/l);return 1>t?-.5*(l*Math.pow(2,10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/r))+n:l*Math.pow(2,-10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/r)*.5+o+n},inBack:function(t,n,e,i,r){return r==o&&(r=1.70158),e*(t/=i)*t*((r+1)*t-r)+n},outBack:function(t,n,e,i,r){return r==o&&(r=1.70158),e*((t=t/i-1)*t*((r+1)*t+r)+1)+n},inOutBack:function(t,n,e,i,r){return r==o&&(r=1.70158),(t/=i/2)<1?e/2*(t*t*(((r*=1.525)+1)*t-r))+n:e/2*((t-=2)*t*(((r*=1.525)+1)*t+r)+2)+n}})}(t,n),function(t,n,o){var e,l,u=i("util/detective").requestAnimationFrame,a=i("rolling/easing"),c="onwheel"in n.createElement("div")?"wheel":n.onmousewheel!==o?"mousewheel":"DOMMouseScroll",s=0,h=0,f=[],d=n.documentElement,g=function(t,n,o){t.addEventListener(n,o,!1)},v=function(t,n,o){t.removeEventListener(n,o)},p=!0,m=function(){p=!0};g(t,"resize",m);var b=function(){p&&(e=Math.max(d.clientHeight,t.innerHeight||0),l=Math.max(d.clientWidth,t.innerWidth||0));for(var n in f){var o=f[n];(o.toUpdate||p)&&o.calc()}p=!1,h&&u(b)},w={rollto:function(){var t=this,n=this.el,o=t.a,e=Date.now()-t.begin;e>t.duration&&(e=t.duration,t.stop(),t.cb&&t.done());for(var i in o)n[i]=t.ease(e,o[i].b,o[i].c,t.duration)},rollon:function(){var t=this,n=t.el,o=t.c,e=n.getBoundingClientRect();for(var i in o)for(var r=o[i],l=r.c,u=r.on,a=0,c=u.length;c>a;a++){var s,h=u[a],f=h.getBoundingClientRect(),d=n===h;t.current={};for(var g in l){var v=l[g];s=!0;for(var p in v){var m=Object.keys(v[p])[0],b=v[p][m][0],w=v[p][m][1],M=t.getPos(m+b,d,e,f);if("top"===m||"left"===m?w>M:M>w){s=!1;break}}if(s===!0)break}var P=h.getAttribute("data-rollon-state-"+i);P&&"true"===P===s||(h.setAttribute("data-rollon-state-"+i,s),r.cb(s,h))}t.toUpdate=!1},rolldirections:function(){var t=this;console.log(t.el.scrollTop,t.el.scrollLeft);var n,o=t.top-t.el.scrollTop,e=t.left-t.el.scrollLeft,i=Math.abs(o),r=Math.abs(e),l=t.c;for(var u in l){var a=l[u];"v"===a.d&&i>a.t?(n=0>o,t.vertical!==n&&(t.vertical=n,a.cb(t.vertical))):"h"===a.d&&r>a.t&&(n=0>e,t.horizontal!==n&&(t.horizontal=n,a.cb(t.horizontal)))}t.top=t.el.scrollTop,t.left=t.el.scrollLeft,t.toUpdate=!1}},M=function(o,e,i){var r=this;switch(r.el=o,r.isWindow=o===n.body||o===d,r.type=e,r.calc=w[e],e){case"rollto":r.duration=i.duration,r.ease=a[i.ease],r.cb=i.cb,r.a={};for(var l in i.a)r.a[l]={b:o[l],c:i.a[l]};r.onScroll=function(){r.stop(),v(o,c,r.onScroll)},g(o,c,r.onScroll),r.begin=Date.now(),r.toUpdate=!0;break;case"rolldirections":r.top=o.scrollTop,r.left=o.scrollLeft,r.onScroll=function(){r.toUpdate=!0},g(o,c,r.onScroll),r.c=[],r.add(i);break;case"rollon":r.onScroll=function(){r.toUpdate=!0},r.isWindow?g(t,"scroll",r.onScroll):g(o,"scroll",r.onScroll),r.c=[],r.add(i)}r.start()};M.prototype={add:function(t){this.c.push(t),this.update()},start:function(){this.id=s++,this.el.setAttribute("data-"+this.type,this.id),f[this.id]=this,1===++h&&b()},stop:function(){this.a?v(this.el,c,this.onScroll):(v(t,"resize",this.onScroll),v(t,"scroll",this.onScroll),v(this.el,"scroll",this.onScroll),this.el.removeAttribute("data-rollon-state")),this.el.removeAttribute("data-"+this.type),delete f[this.id],h--},done:function(){var t=this;setTimeout(function(){t.cb(t.el)},0)},update:function(){var t=this.c;for(var n in t){var o=t[n];o.selector&&(o.on=this.el.querySelectorAll(o.selector))}this.toUpdate=!0},getPos:function(t,n,o,e){return this.current[t]||(this.current[t]=P[t].call(this,n,o,e)),this.current[t]}};var P={toptop:function(t,n,o){return this.isWindow?o.top:t?this.el.scrollTop:o.top-n.top},topmiddle:function(t,n,o){return this.getPos("toptop",t,n,o)+o.height/2},topbottom:function(t,n,o){return this.isWindow?o.bottom:o.bottom-n.top},middletop:function(t,n,o){return this.getPos("toptop",t,n,o)-(this.isWindow?e/2:n.height/2)},middlemiddle:function(t,n,o){return this.getPos("middletop",t,n,o)+o.height/2},middlebottom:function(t,n,o){return-this.getPos("bottombottom",t,n,o)-(this.isWindow?e/2:n.height/2)},bottomtop:function(t,n,o){return this.isWindow?o.top-e:o.top-n.bottom},bottommiddle:function(t,n,o){return this.getPos("bottombottom",t,n,o)-o.height/2},bottombottom:function(t,n,o){return this.isWindow?o.bottom-e:t?this.el.scrollHeight-this.el.scrollTop-this.el.offsetHeight:o.bottom-n.bottom},leftleft:function(t,n,o){return this.isWindow?o.left:t?this.el.scrollLeft:o.left-n.left},leftcenter:function(t,n,o){return this.getPos("leftleft",t,n,o)+o.width/2},leftright:function(t,n,o){return this.isWindow?o.right:o.right-n.left},centerleft:function(t,n,o){return this.getPos("leftleft",t,n,o)-(this.isWindow?l/2:n.width/2)},centercenter:function(t,n,o){return this.getPos("centerleft",t,n,o)+o.width/2},centerright:function(t,n,o){return-this.getPos("rightright",t,n,o)-(this.isWindow?l/2:n.width/2)},rightleft:function(t,n,o){return this.isWindow?o.left-l:o.left-n.right},rightcenter:function(t,n,o){return this.getPos("rightright",t,n,o)-o.width/2},rightright:function(t,n,o){return this.isWindow?o.right-l:t?this.el.scrollWidth-this.el.scrollLeft-this.el.offsetWidth:o.right-n.right}};r("rolling/engine",{on:function(t,n){var o=t.getAttribute("data-rollon");return null===o?new M(t,"rollon",n):(f[o].add(n),f[o])},to:function(t,n){var o=t.getAttribute("data-rollto");return o&&f[o].stop(),new M(t,"rollto",n)},directions:function(t,n){var o=t.getAttribute("data-rolldirections");return null===o?new M(t,"rolldirections",n):(f[o].add(n),f[o])}})}(t,n),function(t,n,o){var e=i("rolling/engine").to,l=!!navigator.userAgent.match(/webkit/i),u=function(o,i,r){(o===t||o===n.body||o===n.documentElement)&&(o=l?n.body:n.documentElement);var u={},a=i.to,c=i.direction||"vertical";if("string"==typeof a&&(a=o.querySelector(a),!a))return!1;if(a instanceof Element){var s=a.getBoundingClientRect();a={top:s.top,left:s.left}}else a.top-=o.scrollTop,a.left-=o.scrollLeft;if("vertical"===c||"both"===c){var h=a.top+(i.shiftTop||0);0!==h&&(u.scrollTop=h)}if("horizontal"===c||"both"===c){var f=a.left+(i.shiftLeft||0);0!==f&&(u.scrollLeft=f)}return Object.keys(u).length?e(o,{a:u,duration:i.duration||1e3,ease:i.ease||"linear",cb:r}):void 0};r("rolling/to",u)}(t,n),function(t,n,o){var e=i("rolling/engine").on,l=/^([a-z]+)(?:\(([-0-9]+|([a-z]+)(?:\(([-0-9]+|)\))?)\))?/,u=!!navigator.userAgent.match(/webkit/i),a=function(o,i,r){(o===t||o===n.body||o===n.documentElement)&&(o=u?n.body:n.documentElement);var a,c=i.condition.split(" "),s={cb:r,c:[]};"string"==typeof i.on?s.selector=i.on:i.on instanceof HTMLElement?s.on=[i.on]:i.on||(s.on=[o]);for(var h in c){var f=c[h].match(l),d={};if(!f)throw new Error("Can't parse conditions");(0==h||"or"===f[1])&&(a=[],s.c.push(a)),"and"!==f[1]&&"or"!==f[1]&&(f[3]||(f[3]=f[1],f[4]=f[2]),d[f[1]]=[f[3],~~f[4]],a.push(d))}return e(o,s,r)};r("rolling/on",a)}(t,n),function(t,n,o){var e=i("rolling/engine").directions,l=!!navigator.userAgent.match(/webkit/i),u=function(o,i,r){return(o===t||o===n.body||o===n.documentElement)&&(o=l?n.body:n.documentElement),"function"==typeof i&&(r=i,i={}),e(o,{d:i.direction?i.direction[0]:"v",t:i.threshold||0,cb:r})};r("rolling/directions",u)}(t,n),function(t,n,o){var e=i("rolling/to"),r=i("rolling/on"),l=i("rolling/directions");jQuery.fn.extend({rollTo:function(t,n){return e(this[0],t,n),this},rollOn:function(t,n){return r(this[0],t,n),this},rollDirections:function(t,n){return l(this[0],t,n),this}})}(t,n)}(window,document);