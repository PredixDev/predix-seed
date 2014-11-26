define([ 'angular-mocks', 'app' ], function(mocks, app) {
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

			it('should have name on $scope', function () {
				expect($scope.name).toBeDefined();
			});
			it('should have correct name on $scope', function () {
				expect($scope.name).toBeDefined('home');
			});
		});
	});
});
