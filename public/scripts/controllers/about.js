define(['angular', 'sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('AboutCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {

        $log.info('about controller loaded!');
    }]);
});
