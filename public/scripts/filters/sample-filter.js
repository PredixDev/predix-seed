/*global define, Messages */
define(['angular', 'sample-module'], function(angular, sampleModule) {
    'use strict';

    /* Filters */
    sampleModule.filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);

    /**
     * Usage:
     * First param is the key in the conf/messages.* file, to use in views.
     *
     * {{ 'locale.key.from.messages' | vmessages : arg1:arg2:... }}
     */
    sampleModule.filter('vmessages', function() {
        return function() {
            var out = '';
            if (arguments.length !== 0) {
                if (typeof Messages !== 'undefined') {
                    out = Messages.apply(this, arguments);
                } else {
                    out = Array.prototype.slice.call(arguments).join(' ');
                }
            }
            return out;
        };
    });

    sampleModule.filter('slugify', function() {
        return function(input, lowercase) {
            var out;
            out = '';
            out = input.replace(/\s/g, '-');
            if (lowercase) {
                out = out.toLowerCase();
            }
            return out;
        };
    });

    return sampleModule;
});
