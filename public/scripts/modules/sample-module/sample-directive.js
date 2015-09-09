define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';

    sampleModule.directive('appVersion', ['version', function(version) {
        return {
            restrict: 'E',
            link: function(scope, elm) {
                elm.text('Version ' + version);
            }
        };
    }]);

    return sampleModule;
});
