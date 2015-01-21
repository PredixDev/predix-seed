/*global define */
define(['angular', 'sample-module'], function(angular, sampleModule) {
    'use strict';

    /* Directives  */
    sampleModule.directive('appVersion', ['version', function(version) {
        return {
            restrict: 'E',
            link: function(scope, elm, attrs) {
                console.log(scope, elm, attrs);
                elm.text(version);
            }
        };
    }]);

    return sampleModule;
});
