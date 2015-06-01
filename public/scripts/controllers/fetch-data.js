define(['angular', 'sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('FetchData', ['$scope', function($scope) {

        $scope.show = function() {
            angular.element('#mycard')[0].showCard();
        };

        $scope.hide = function() {
            angular.element('#mycard')[0].hideCard();
        };

    }]);
});
