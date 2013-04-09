/*jshint
    strict: false,
    browser:true,
    jquery: true
*/
;(function($, window, document, undefined) {
    var $e = $.event,
        $es = $e.special,
        isMozilla = !!navigator.userAgent.match(/firefox/i),
        //timeouts
        throttledrollTimeout, userstoprollTimeout;

    //throttled roll
    $.fn.extend({
        throttledroll: function( fn ) {
            return fn ? this.on( "throttledroll", fn ) : this.trigger( "throttledroll", [true] );
        }
    });

    $es.throttledroll = {
        setup: function() {
            $e.add(this, "scroll", $es.throttledroll.handler, {} );
        },
        teardown: function() {
            $e.remove(this, "scroll", $es.throttledroll.handler );
        },
        handler: function(event, execAsap) {
            var self = this,
                args = arguments;

            event.type = "throttledroll";

            if (throttledrollTimeout) {
                clearTimeout(throttledrollTimeout);
            }
            throttledrollTimeout = setTimeout(function() {
                $e.dispatch.apply(self, args);
            }, execAsap === true ? 0 : 100);
        }
    };

    //userstartroll & userstoproll event for interrupting scrolling
    var wheelEvents =  !isMozilla ? "mousewheel" : // IE, opera, safari
        "DOMMouseScroll"; // firefox

    $.fn.extend({
        userstartroll: function(fn){
            return this[ fn ? "on" : "trigger" ]("userstartroll", fn );
        },

        userstoproll: function(fn){
            return fn ? this.on( "userstoproll", fn ) : this.trigger( "userstoproll", [true] );
        }
    });

    $es.userstartroll = {
        setup: function(){
            $e.add( this, wheelEvents, $es.userstartroll.handler, {} );
        },
        teardown: function(){
            $e.remove( this, wheelEvents, $es.userstartroll.handler );
        },
        handler: function(event) {
            event.type = "userstartroll"; // hijack the event
            return $e.dispatch.apply( this, arguments);
        }
    };

    $es.userstoproll = {
        setup: function(){
            $e.add( this, wheelEvents, $es.userstoproll.handler, {} );
        },
        teardown: function(){
            $e.remove( this, wheelEvents, $es.userstoproll.handler );
        },
        handler: function(event, execAsap) {
            var self = this,
                args = arguments;

            event.type = "userstoproll";

            if (userstoprollTimeout) {
                clearTimeout(userstoprollTimeout);
            }
            userstoprollTimeout = setTimeout(function() {
                $e.dispatch.apply(self, args);
            }, execAsap === true ? 0 : 200);
        }
    };


    //roll to function
    $.fn.extend({
        rollTo: function(roll, options, callback){
            var self = this[0],
                typeOf = typeof roll,
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
            if(typeOf === 'string' || typeOf === 'object') {
                $elem = $(roll);
                if(!$elem) {
                    return this; // didn't do anything and didn't brake chain
                }
                rollTo = (direction ? $elem.position().top : $elem.position().left) + options.shift;

            } else if(typeOf === 'number') {  //value
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
                    callback && callback();
                })
                .one('userstartroll', function(){
                    $elem.stop();
                });

            return this;
        }
    });

})(jQuery, window, document);
