define(['angular', 'controllers-module'], function (angular, controllers) {
	'use strict';
	return controllers.controller('AboutCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
		$scope.name = 'About';

		$log.info('about controller loaded!');
	}]);
});
