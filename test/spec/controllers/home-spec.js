/* jshint unused:false */
define(['angular-mocks', 'app'], function (mocks, app) {
	'use strict';
	describe('app.controllers:', function () {
		beforeEach(module('predixApp'));

		describe('Testing HomeCtrl:', function () {
			var $scope, ctrl;

			beforeEach(inject(function ($rootScope, $controller) {
				$scope = $rootScope.$new();
				ctrl = $controller('HomeCtrl', {
					$scope: $scope
				});
			}));

			it('should have correct name on $scope', function () {
				expect($scope.name).toBe('Home');
			});
		});
	});
});
