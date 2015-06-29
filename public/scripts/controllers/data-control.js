define(['angular', 'sample-module'], function(angular, sampleModule) {
  'use strict';
  return sampleModule.controller('DataControlCtrl', ['$scope', function($scope) {

    $scope.context = {
      name: 'This is context',
      // using api from weather underground: http://www.wunderground.com/
      url: 'http://api.wunderground.com/api/e77862ea276e303e/conditions/q/CA/San_Francisco.json?callback=JSON_CALLBACK'
    };

  }]);
});
