/**
 * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
 * Customize your widgets by:
 *  - Overriding or extending widget API methods
 *  - Changing widget settings or options
 */
/* jshint unused: false */
define(['angular',
    'sample-module'
], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardCtrl', ['VCAP_SERVICES', '$scope', 'ContextBrowserService', function (VCAP_SERVICES, $scope, ContextBrowserService) {

        $scope.ContextBrowserServiceInstance = ContextBrowserService.getInstance({});

        $scope.ContextBrowserServiceInstance.loadContextTree().then(function(initialContext) {
            $scope.initialContexts = initialContext;
        }, function(message) {
            $log.error(message);
        });

        // callback for when the Open button is clicked
        $scope.openContext = function(contextDetails, breadcrumbs) {

            $scope.$apply(function () {

                // need to clean up the context details so it doesn't have the infinite parent/children cycle,
                // which causes problems later (can't interpolate: {{context}} TypeError: Converting circular structure to JSON)
                var newContext = angular.copy(contextDetails);
                newContext.children = [];
                newContext.parent = [];

                $scope.context = newContext;

                $scope.selectedDeck = 'bower_components/px-sample-cards/sample-deck.html';
            });
        };

        $scope.getChildren = function(parentId, options) {
            return $scope.ContextBrowserServiceInstance.getChildren(parentId, options);
        };

        $scope.isOpenable = function(node) {
            if (node && node.isOpenable) {
                return node.isOpenable;
            }
            else {
                $log.log('node.isOpenable does not exist, returning false for isOpenable');
                return false;
            }
        };

        $scope.handlers = {
            itemOpenHandler: $scope.openContext,
            isOpenable: $scope.isOpenable,
            getChildren: $scope.getChildren
            // (optional) click handler: itemClickHandler: $scope.clickHandler
        };

    }]);
});
