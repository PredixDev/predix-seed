define(['angular', 'sample-module'], function (angular, sampleModule) {
    'use strict';
    return sampleModule.controller('DataControlCtrl', ['$scope', function ($scope) {

        $scope.context = {
            name: 'This is context',
            // using api from weather underground: http://www.wunderground.com/
            url: 'http://api.wunderground.com/api/e77862ea276e303e/conditions/q/CA/San_Ramon.json?callback=JSON_CALLBACK',
            urls: [
                {
                    name: 'San Ramon',
                    url: 'http://api.wunderground.com/api/e77862ea276e303e/conditions/q/CA/San_Ramon.json?callback=JSON_CALLBACK'
                },
                {
                    name: 'Niskayuna',
                    url: 'http://api.wunderground.com/api/e77862ea276e303e/conditions/q/NY/Niskayuna.json?callback=JSON_CALLBACK'
                },
                {
                    name: 'Rio de Janeiro',
                    url: 'http://api.wunderground.com/api/e77862ea276e303e/conditions/q/Brazil/Rio_de_Janeiro.json?callback=JSON_CALLBACK'
                },
                {
                    name: 'Munich',
                    url: 'http://api.wunderground.com/api/e77862ea276e303e/conditions/q/Germany/Munich.json?callback=JSON_CALLBACK'
                },
                {
                    name: 'Shanghai',
                    url: 'http://api.wunderground.com/api/e77862ea276e303e/conditions/q/China/Shanghai.json?callback=JSON_CALLBACK'
                }
            ]
        };

    }]);
});
