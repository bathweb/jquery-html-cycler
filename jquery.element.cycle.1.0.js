/* Cycle HTML element plugin
 * written by Tom Natt, Feb 2011
 * Licensed under Apache License Version 2.0, January 2004
 * See https://github.com/bathweb/jquery-html-cycler/blob/master/LICENSE
 *
 */

(function( $ ){

    // plugin variables
    $.cycle = {};
    $.cycle.current = 0;
    $.cycle.elements = "";
    $.cycle.firstElement = "";
    $.cycle.elementCount = 0;
    $.cycle.cycleId = 0;
    $.cycle.selectElement = "";
    $.cycle.options = "";

    $.fn.cycle = function(options) {
        return this.each(function() {

            // Settings list and the default values
            $.cycle.options = $.extend({
                                transitionTime: 4000,
                                clickTransitionTime: 500,
                                cycleTime: 6000,
                                elementsFile: "elements/elementlist.html",
                                elementContainer: "#elements",
                                elementIdentifier: ".element",
                                forwardButton: "#next",
                                backButton: "#prev"
                            }, options);

            $.cycle.selectElement = $.cycle.options.elementContainer + " " + $.cycle.options.elementIdentifier;

            // read the elements file
            $.ajax({
                    url: $.cycle.options.elementsFile,
                    async: false,
                    cache: false,
                    success: function(data) {
                        $.cycle.elements = data;
                    }
            });

            // add the element from the web page to the element list
            $.cycle.firstElement = $($.cycle.options.elementContainer).html();
            $.cycle.elements = $($.cycle.elements).find("li").parent().prepend('<li><a href=""></a></li>');

            // record total number of elements
            $.cycle.elementCount = $($.cycle.elements).children("li").length;

            /* Manual cycle listeners */
            registerManualCycleListeners();

            /* Automatic cycling listeners and timer */
            if ($.cycle.options.cycleTime > 0) {
                // pause on mouseenter
                $($.cycle.options.elementContainer).mouseenter(function() {
                    stopCycle()
                });
                // restart on mouseout
                $($.cycle.options.elementContainer).mouseleave(function() {
                    startCycle()
                });

                // start the auto cycling
                startCycle();
            }


        });
    };

    function registerManualCycleListeners() {
        // forward on click
        $($.cycle.options.forwardButton).click(function() {
            $.fn.cycle.go($.cycle.options.clickTransitionTime);
            return false;
        });

        // backwards on click
        $($.cycle.options.backButton).click(function() {
            $.fn.cycle.go($.cycle.options.clickTransitionTime, false);
            return false;
        });
    }

    function disableManualCycleListeners() {
        $($.cycle.options.forwardButton).unbind("click");
        $($.cycle.options.forwardButton).bind("click", function() { return false; });
        $($.cycle.options.backButton).unbind("click");
        $($.cycle.options.backButton).bind("click", function() { return false; });
    }

    $.fn.cycle.go = function go(time, forward) {

        // lock the buttons
        disableManualCycleListeners();
        stopCycle();

        // default to forwards
        if (forward == null) {
            forward = true;
        }

        if (forward) {
            // next in list
            $.cycle.current++;
            // if we've reached the end of the list, loop back
            if ($.cycle.current == $.cycle.elementCount) {
                $.cycle.current = 0;
            }
        } else {
            // previous in list
            $.cycle.current--;
            // if gone before the first, loop
            if ($.cycle.current < 0) {
                $.cycle.current = $.cycle.elementCount - 1;
            }
        }

        // load the appropriate next element
        var nextElementLoad = $($.cycle.elements).children("li:eq("+$.cycle.current+")").children("a").attr("href");
        var nextElement = $.cycle.firstElement;
        if (nextElementLoad != "") {
            $.ajax({
                    url: nextElementLoad,
                    async: false,
                    cache: false,
                    success: function(data) {
                        nextElement = data;
                    }
            });
        }

        // add the new element into the page
        $($.cycle.selectElement).after(nextElement);
        $($.cycle.selectElement + ":eq(1)").css("display", "none");


        // fade in the new html and fade out the old
        $($.cycle.selectElement + ":first").fadeOut(time, function() {
            // remove the old one
            $($.cycle.selectElement + ":first").remove();
        });
        $($.cycle.selectElement + ":eq(1)").fadeIn(time, function() {
            // unlock the buttons
            // (when the fade ends to avoid multiple fades at once causing horrible things to happen to the DOM)
            startCycle();
            registerManualCycleListeners();

        });
    }

    // start the automatic cycling
    function startCycle() {
        if ($($.cycle.selectElement).length == 1 && $.cycle.cycleId == 0) {
            $.cycle.cycleId = setInterval("$.fn.cycle.go($.cycle.options.transitionTime)", $.cycle.options.cycleTime);
        }
    }

    // stop the automatic cycling
    function stopCycle() {
        clearInterval($.cycle.cycleId);
        $.cycle.cycleId = 0;
    }

})( jQuery );
