define(['angular', 'sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('SampleCardsCtrl', ['$scope', function($scope) {

        $scope.context = {
            name: 'This is context'
        };

        document.addEventListener('px-deck-ready', function () {
            document.querySelector('px-deck').init();
        });

    }]);
});
