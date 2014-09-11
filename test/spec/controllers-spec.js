define([ 'angular-mocks', 'app' ], function(mocks, app) {


	describe('app.controllers:', function () {
		beforeEach(module('predixApp'));

		describe('Testing Dashboard Controller', function () {
			var $scope, ctrl;


			beforeEach(inject(function ($rootScope, $controller) {
				$scope = $rootScope.$new();
				ctrl = $controller('Ctrl1', {
					$scope: $scope
				});
				console.log(ctrl)
			}));

			xit('should have widgetSettings1 object', function () {
				expect($scope.widgetSettings1).toBeDefined();
			});

			xit('should have widgetSettings2 object', function () {
				expect($scope.widgetSettings2).toBeDefined();
			});


		});
	});

});