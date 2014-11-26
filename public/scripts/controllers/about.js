/**
 * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
 * Customize your widgets by:
 *  - Overriding or extending widget API methods
 *  - Changing widget settings or options
 */
define(['angular', 'controllers-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('AboutCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
		$scope.name = 'About';
		$log.info($scope, $rootScope);
	}]);

	return controllers;
});
