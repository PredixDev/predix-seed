// angular seed app specific
// polymer seed could have this as service for sample card which displays weather
define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('SampleCtrl', ['$scope', function($scope) {

        $scope.context = {
            url: 'http://api.wunderground.com/api/e77862ea276e303e/conditions/q/CA/San_Ramon.json?callback=JSON_CALLBACK'
        };

    }]);
});
