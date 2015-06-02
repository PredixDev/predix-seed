define(['angular', 'sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('SampleCardsCtrl', ['$scope', function($scope) {

        $scope.context = {
            name: 'This is context'
        };
    }]);
});
