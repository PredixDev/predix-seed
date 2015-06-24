/* jshint unused:false */
define(['angular-mocks', 'app'], function(mocks, app) {
    'use strict';
    describe('Testing DataControlCtrl:', function() {

        beforeEach(module('predixApp'));

        var $scope, ctrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('DataControlCtrl', {
                $scope: $scope
            });
        }));

        it('should have correct name on $scope', function() {
            //expect($scope.name).toBe('About');
        });
    });
});
