# Rolling

Scroll everything with no dependencies

## rollTo(el, options, [cb])
Scrolls element for your pleasure.
__Rolling is always interrupted when user starts to scroll__

*   **el** — element to scroll
*   **options**
	-	**to** — html element or selector or `{top: number, left: number}`
    -	**direction** — 'vertical || horizontal || both', default "vertical"
	-   **shiftTop** — shift of original position, can be negative, default 0
	-   **shiftLeft** — shift of original position, can be negative, default 0
	-	**duration** — animation duration, default 1000ms
	-	**ease** — easing function, default "linear"
*   **callback** — callback function, optional

### Easing functions
inQuad, outQuad, inOutQuad, inCubic, outCubic, inOutCubic, inQuart, outQuart, inOutQuart, inQuint, outQuint, inOutQuint, inSine, outSine, inOutSine, inExpo, outExpo, inOutExpo, inCirc, outCirc, inOutCirc, inElastic, outElastic, inOutElastic, inBack, outBack, inOutBack.

### Example
```js
rollTo(window, {
        to: "#content",
        direction: "both",
        shiftTop: 50,
        ease: "inOutExpo"
    },
    function() {console.log('done');}
);
```

## rollOn(el, options, cb)
Calls callback function on scroll element conditions.

*   **el** — element to scroll
*   **options**
    -   **on** — html element or selector or `{top: number, left: number}`
    -   **condition** conditions for html element position relative to scroll position of the el
    -   **direction** — _vertical_, _horizontal_, _both_, default "vertical"
*   **callback** — callback function, gets bool value about condition changes

### Conditions
Example: `'top(20) and bottom(-20)'`

#### Keywords
*   **top position**: _top_, _bottom_
*   **left position**: _left_, _right_
*   **logic**:  _and_, _or_

### Example
```js
 rollOn(window, {
        on: "#content",
        condition: "top(10) and bottom(-10)"
    },
    function(condition, el) {
        el.style.background = condition ? "#00ff00" : "#ff0000";
    }
);
```

## jQuery versions
### Usage
```js
// scroll window to position 10
$(window).rollTo({top:10});

// scroll window to navigation
$(window).rollTo({to: 'nav'});
$(window).rollTo({to: '.navigation'});
$(window).rollTo({to: '#navigation'});
$(window).rollTo({to: $('#navigation')});
```

## Browser support
Safari, Firefox, IE9+, Chrome, Mobile Safari.


License: MIT;
