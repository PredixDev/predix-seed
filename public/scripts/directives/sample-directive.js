/*global define */
define(['angular', 'directives-module'], function(angular, directives) {
	'use strict';

    /* Directives  */
    directives.directive('appVersion', ['version', function(version) {
        return {
            restrict: 'E',
            link: function(scope, elm, attrs) {
                elm.text(version);
            }
        }
    }]);
	
	return directives;
});