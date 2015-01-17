/*global define */
define(['angular', 'widgets-module'], function (angular, directives) {
	'use strict';

	/* Directives  */
	directives.directive('appVersion', ['version', function (version) {
		return {
			restrict: 'E',
			link: function (scope, elm, attrs) {
				console.log(scope, elm, attrs);
				elm.text(version);
			}
		};
	}]);

	return directives;
});
