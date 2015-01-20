define(['angular', 'controllers-module'], function (angular, controllers) {
	'use strict';
	return controllers.controller('HomeCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
		$scope.name = 'Home';

		$log.info('home controller loaded!');
	}]);
});
