;(function($, window, document, undefined) {

    var $e = $.event;

//throttled roll
    var rollTimeout;

    $.fn.throttledroll = function( fn ) {
        return fn ? this.on( "throttledroll", fn ) : this.trigger( "throttledroll", ["execAsap"] );
    };

    $e.special.throttledroll = {
        setup: function() {
            $e.add(this, "scroll", $e.special.throttledroll.handler, {} );
        },
        teardown: function() {
            $e.remove(this, "scroll", $e.special.throttledroll.handler );
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
    var wheelEvents = !$.browser.mozilla ? "mousewheel" : // IE, opera, safari
        "DOMMouseScroll"+( $.browser.version<"1.9" ? " mousemove" : "" ); // firefox

    $.fn.userroll = function( fn ){
        return this[ fn ? "on" : "trigger" ]( "userroll", fn );
    };

    $e.special.userroll = {
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
                rollTo,
                $elem;

            if(typeof options === 'function' && callback === undefined) {
                callback = options;
                options = {}
            }

            options = $.extend(options, {
                shift: 0,
                duration: 1000,
                ease: 'linear'
            });

            //selector
            if(typeof roll === 'string') {
                $elem = $(roll);
                if(!$elem) {
                    return this; // didn't do anything and didn't brake chain
                }
                rollTo = $elem.position().top + options.shift;

            } else if(typeof roll === 'number') {  //value
                rollTo = roll;
            } else {
                rollTo = $(this).position().top + options.shift;
            }

            if(self === window) {
                $elem = $.browser.mozilla ? $('html') : $('body');
            } else {
                $elem = $(self);
            }

            $elem.stop()
                .animate({scrollTop: rollTo}, options.duration, options.ease, function(){
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

})(jQuery, window, document, undefined);