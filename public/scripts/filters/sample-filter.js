/*global define */
define(['angular', 'filters-module'], function(angular, filters) {
	'use strict';
	
	/* Filters */
	filters.filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		}
	}]);
	
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