define(['angular', 'sample-module'], function (angular, sampleModule) {
	'use strict';
	return sampleModule.controller('HomeCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
		$scope.name = 'Home';

		$log.info('home controller loaded!');
	}]);
});
