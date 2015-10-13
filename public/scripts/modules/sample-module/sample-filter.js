define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';

    sampleModule.filter('slugify', function() {
        return function(input, lowercase) {
            var out = input.replace(/\s/g, '-');
            if (lowercase) {
                out = out.toLowerCase();
            }
            return out;
        };
    });

    return sampleModule;
});
