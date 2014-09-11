define([ 'angular-mocks', 'app' ], function(mocks, app) {

	describe('predixApp', function() {
		var $scope, ctrl;

		beforeEach(module('predixApp'));

		beforeEach(inject(function($rootScope, $controller) {
			$scope = $rootScope.$new();
			ctrl = $controller('MainCtrl', {
				$scope : $scope
			});
		}));

		describe('MainCtrl', function(){

		});

	});

});