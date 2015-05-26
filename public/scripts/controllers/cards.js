define(['angular', 'sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('CardsCtrl', ['$scope', '$timeout', function($scope, $timeout) {

        $scope.context = {
            name: 'This is context',
            url: 'http://3.39.78.124:3000/gauge'
        };

        $timeout(function(){
            $scope.context.name = 'This is a new context';
        }, 3000);

    }]);
});
