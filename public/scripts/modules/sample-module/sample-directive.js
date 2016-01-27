// same idea as others... this is a sample of a directive
// it's a simple example of a directive
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
