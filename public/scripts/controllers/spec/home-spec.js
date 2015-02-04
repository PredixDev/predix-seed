/* jshint unused:false */
define(['angular-mocks', 'app'], function(mocks, app) {
    'use strict';
    describe('Testing HomeCtrl:', function() {
        beforeEach(module('predixApp'));

        var $scope, ctrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('HomeCtrl', {
                $scope: $scope
            });
        }));

        it('should have correct name on $scope', function() {
            expect($scope.name).toBe('Home');
        });
    });
});
