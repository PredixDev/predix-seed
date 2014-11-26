/* jshint unused:false */
define(['angular-mocks', 'app'], function (mocks, app) {
	'use strict';
	describe('app.controllers:', function () {
		beforeEach(module('predixApp'));

		describe('Testing Main Controller', function () {
			var $scope, ctrl;

			beforeEach(inject(function ($rootScope, $controller) {
				$scope = $rootScope.$new();
				ctrl = $controller('MainCtrl', {
					$scope: $scope
				});
			}));
			xit('should have widgetSettings1 object', function () {
				expect($scope.widgetSettings1).toBeDefined();
			});
		});
	});
});
