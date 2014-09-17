/*global define */
define(['angular', 'filters-module'], function(angular, filters) {
	'use strict';
	
	/* Filters */
	filters.filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		}
	}]);

    /**
     * Usage:
     * First param is the key in the conf/messages.* file, to use in views.
     *
     * {{ 'predix.widget.deleteReport.label' | vmessages }}
     */
    filters.filter('vmessages', function() {
        return function(input) {
            var out = '';
            if (input) {
                if(typeof Messages !== 'undefined') {
                    out = Messages(input);
                }else{
                    out = input;
                }
            }
            return out;
        };
    });
	
	filters.filter("slugify", function () {
		return function (input, lowercase) {
			var out;
			out = "";
			out = input.replace(/\s/g, "-");
			if (lowercase) {
				out = out.toLowerCase();
			}
			return out;
		};
	});
	
	return filters;
});