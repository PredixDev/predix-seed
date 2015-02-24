/**
 * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
 * Customize your widgets by:
 *  - Overriding or extending widget API methods
 *  - Changing widget settings or options
 */
/* jshint unused: false */
define(['angular',
    'sample-module',
    'vruntime'
], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardCtrl', ['$scope', '$rootScope', '$q', function ($scope, $rootScope, $q) {

        $scope.contextSelectorConfig = {
            baseUrl: '/services/asset',
            rootEntityId: null
        };

        $scope.selectedContext =  function(contextDetails) {

            $scope.context = contextDetails;
            var defer = $q.defer();

            if(!contextDetails || !contextDetails.identifier || !contextDetails.name || !contextDetails.classification) {
                window.logger.error('context is not properly formatted with identifier, name, classification');
                defer.reject();
                return defer.promise;
            }

            $scope.context = contextDetails;
        };

    }]);
});
