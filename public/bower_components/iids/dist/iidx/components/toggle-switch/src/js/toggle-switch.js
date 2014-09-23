'use strict';

define(['jquery', 'oo-utils', 'bootstrap-switch'], function ($, ooUtils) {

    var _prepareDom = function (elem, options) {
        var $elem = $(elem), $wrapper = $elem;
        if ($elem.is('input')) {
            $wrapper = $elem.wrap('<div></div>').parent(); // wrap
            $wrapper.attr("class", $elem.attr("class")); // copy css class names to wrapper from checkbox
            if ($elem.prop("disabled")) {
                //make sure to propagate "disabled" state as a css class to the wrapper
                $wrapper.addClass("disabled");
            }
        }
        if (!$wrapper.hasClass('make-switch')) { //add the expected css class for bootstrap-switch plugin
            $wrapper.addClass('make-switch');
        }
        if (options.offLabel || options.onLabel) {
            $wrapper.attr('data-on-label', options.onLabel);
            $wrapper.attr('data-off-label', options.offLabel);
        }
        return $wrapper;
    };

    var _defaultOptions = {
        onLabel: " ",
        offLabel: " "
    };

    ooUtils.makePlugin("toggleSwitch", {
        init: function (options, elem) {
            // Mix in the passed-in options with the default options
            var resolvedOptions = this.resolvedOptions = $.extend({}, _defaultOptions, options);
            var $wrapper;

            // Init the underlying bootstrap switch
            $(document).ready(function() {
                $wrapper = _prepareDom(elem, resolvedOptions);
                $wrapper.bootstrapSwitch(resolvedOptions);
            });

            this.$switch = {
                //proxy functions on base bootstrap-switch, because it unhelpfully does not expose itself
                toggleState: function() {
                    $wrapper.bootstrapSwitch("toggleState");
                },

                setState: function(state) {
                    $wrapper.bootstrapSwitch("toggleState", state);
                }
            };

            // return this so that we can chain and use the bridge with less code.
            return this;
        }
    });

    $(document).ready(function() {//instance appropriately tagged elements
        $('input[data-toggle-switch]').toggleSwitch();
    });

});
