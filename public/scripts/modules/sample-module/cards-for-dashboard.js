define(['angular', './sample-module'], function(angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('CardsForDashCtrl', ['$scope', function($scope) {

        $scope.context = {
            name: 'Time Series'
        };

    }]);
});
