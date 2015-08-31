# Rolling

Everything about scroll

**All calculations are super optimized for smooth scrolling**

## rollDirections(el, [options], cb)
Calls `cb` when `el` scrolling changed direction

*   **el** — element to scroll
*   **options**
    -   **direction** — 'vertical || horizontal', default "vertical"
    -   **threshold** — scroll change should be bigger that threshold, defaul 0
*   **callback** — callback function, optional

### Example
```js
rollDirections(window, {
        direction: "vertical",
        threshold: 5
    },
    function(dir) {
        console.log(dir); //prints true for down and false for up
    }
);
```

## rollTo(el, options, [cb])
Scrolls element for your pleasure.
__Rolling is always interrupted when a user starts to scroll__

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
Calls the callback function if the conditions result is changed.

*   **el** — element to scroll
*   **options**
    -   **on** — html element or selector`
    -   **condition** conditions for an html element position relative to the scroll position of the `el`
*   **callback** — callback function, gets boolean value on condition changes and an html element that triggered the change

### Conditions
Example: `'top(20) and bottom(-20)'`

#### Keywords
*   **vertical**: _top_, _middle_, _bottom_
*   **horizontal**: _left_, _center_, _right_
*   **logic**:  _and_, _or_

Keywords can be included in each other within same direction, outside keyword means `el` position to compare and inside keyword target position to compare. This way:

* `"top(bottom(20))"` — full condition, means top position of the `el` should be compare to bottom position of target, and difference should be less than `20`
* `"top"` — basicaly, this is shortcut for `"top(top(0))"`
* `"top(20)"` — `"top(top(20))"`
* `"top(bottom)"` — `"top(bottom(0))"`

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
