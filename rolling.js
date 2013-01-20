/*jshint
    strict: false,
    browser:true,
    jquery: true
*/
;(function($, window, document, undefined) {

    var $e = $.event,
        $es = $e.special,
        isMozilla = !!navigator.userAgent.match(/firefox/i);

//throttled roll
    var rollTimeout;

    $.fn.throttledroll = function( fn ) {
        return fn ? this.on( "throttledroll", fn ) : this.trigger( "throttledroll", ["execAsap"] );
    };

    $es.throttledroll = {
        setup: function() {
            $e.add(this, "scroll", $es.throttledroll.handler, {} );
        },
        teardown: function() {
            $e.remove(this, "scroll", $es.throttledroll.handler );
        },
        handler: function( event, execAsap ) {
            var self = this,
                args = arguments;

            // set correct event type
            event.type = "throttledroll";

            if (rollTimeout) {
                clearTimeout(rollTimeout);
            }
            rollTimeout = setTimeout(function() {
                $e.handle.apply( self, args );
            }, execAsap === "execAsap"? 0 : 100);
        }
    };

    // userroll event for interrupting scrolling
    var wheelEvents =  !isMozilla ? "mousewheel" : // IE, opera, safari
                                           "DOMMouseScroll"; // firefox

    $.fn.userroll = function( fn ){
        return this[ fn ? "on" : "trigger" ]( "userroll", fn );
    };

    $es.userroll = {
        setup: function(){
            $e.add( this, wheelEvents, wheelHandler, {} );
        },
        teardown: function(){
            $e.remove( this, wheelEvents, wheelHandler );
        }
    };

    function wheelHandler( event ){
        event.type = "userroll"; // hijack the event
        return $e.handle.call( this, event);
    }


// roll to function
    $.fn.extend({
        rollTo: function(roll, options, callback){
            var self = this[0],
                direction,
                rollTo,
                scroll,
                $elem;

            if(typeof options === 'function' && callback === undefined) {
                callback = options;
                options = {};
            }

            options = $.extend(options, {
                direction: 'vertical',
                shift: 0,
                duration: 1000,
                ease: 'linear'
            });

            direction = (options.direction === 'vertical');

            //selector
            if(typeof roll === 'string') {
                $elem = $(roll);
                if(!$elem) {
                    return this; // didn't do anything and didn't brake chain
                }
                rollTo = (direction ? $elem.position().top : $elem.position().left) + options.shift;

            } else if(typeof roll === 'number') {  //value
                rollTo = roll;
            } else {
                rollTo = (direction ? $(this).position().top : $(this).position().left) + options.shift;
            }

            if(self === window) {
                $elem = isMozilla ? $('html') : $('body');
            } else {
                $elem = $(self);
            }

            scroll = direction ? {scrollTop: rollTo} : {scrollLeft: rollTo};

            $elem.stop()
                .animate(scroll, options.duration, options.ease, function(){
                    if(typeof callback === 'function') {
                        callback();
                    }
                })
                .one('userroll', function(){
                    $elem.stop();
                });

            return this;
        }
    });

})(jQuery, window, document);
