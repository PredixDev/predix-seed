/*global define, Messages */
define(['angular', 'filters-module'], function (angular, filters) {
	'use strict';

	/* Filters */
	filters.filter('interpolate', ['version', function (version) {
		return function (text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]);

	/**
	 * Usage:
	 * First param is the key in the conf/messages.* file, to use in views.
	 *
	 * {{ 'locale.key.from.messages' | vmessages : arg1:arg2:... }}
	 */
	filters.filter('vmessages', function () {
		return function () {
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

	filters.filter('slugify', function () {
		return function (input, lowercase) {
			var out;
			out = '';
			out = input.replace(/\s/g, '-');
			if (lowercase) {
				out = out.toLowerCase();
			}
			return out;
		};
	});

	return filters;
});
