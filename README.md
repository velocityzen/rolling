
# Rolling

Several jQuery extensions for scrolling window

## rollTo()

__Rolling always interupt when user start to scroll__

    $(window).rollTo(roll, options, callback);

    __roll__            //selector or number
    options = {
        shift: 0,       //shift of original position, can be negative
        duration: 1000, //animation duration
        ease: 'linear'  //easing function
    }
    callback            //callback function

### Usage

```js
// scroll window to position 10
$(window).rollTo(10);

// scroll window to navigation
$(window).rollTo('nav');
$(window).rollTo('.navigation');
$(window).rollTo('#navigation');

// scroll window to footer and call function when ended.
$(window).rollTo('footer', function() {alert('done');});

// scroll div to position 10px from top and call function when ended.
$('div.scroll-area').rollTo(30, { shift: -20 }, function() {alert('done');});

```

## userroll and throttledroll events

__userroll__ — fires when user start scrolling.
__throttledroll__ — like usual scroll event but fires rarely

You can use it like any jQuery event.