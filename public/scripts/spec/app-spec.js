/* jshint unused:false */
define(['angular-mocks', 'app'], function(mocks) {
    'use strict';
    describe('myapp', function() {
        var $scope, ctrl;
        beforeEach(module('predixApp'));
        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('MainCtrl', {
                $scope: $scope
            });
        }));
        describe('MainCtrl', function() {

        });
    });
});
