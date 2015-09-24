define(['angular-mocks', 'app'], function() {
    'use strict';

    describe('Sample controller', function() {

        beforeEach(module('predixApp'));

        var $scope, ctrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('SampleCtrl', {
                $scope: $scope
            });
        }));

        /**
         * Sample test for your Angular controller logic.
         *
         * For more info about testing your Angular code, see: https://docs.angularjs.org/guide/unit-testing
         */
        it('should set the url on the context', function() {
            expect($scope.context.url).toBe('http://api.wunderground.com/api/e77862ea276e303e/conditions/q/CA/San_Ramon.json?callback=JSON_CALLBACK');
        });

    });

});
