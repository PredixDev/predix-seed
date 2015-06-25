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
    controllers.controller('DashboardCtrl', ['VCAP_SERVICES', '$scope', '$q', '$http', 'ContextBrowserService', function (VCAP_SERVICES, $scope, $q, $http, ContextBrowserService) {


        $scope.ContextBrowserServiceInstance = ContextBrowserService.getInstance({});

        // default to 3 display levels if none are passed in
        $scope.displayLevels = $scope.displayLevels || 3;

        // the name to display in the context browser
        $scope.labelField = $scope.labelField || 'name';

        // the parent/child fields to matchup when checking if data should be added to the tree
        // (only add data if the child's parentId matches the parent's id)
        $scope.parentIdField = $scope.parentIdField || 'parentId';
        $scope.idField = $scope.idField || 'id';

        $scope.ContextBrowserServiceInstance.loadContextTree().then(function(initialContext) {
            $scope.initialContexts = initialContext;
        }, function(message) {
            $log.error(message);
        });

        // callback for when the Open button is clicked
        $scope.openEntity = function(openedContext, breadcrumbs) {
            //if (breadcrumbs.length > 0) {
            //    // px-tree-navigation always returns an empty string as the first element in the breadcrumbs
            //    breadcrumbs = breadcrumbs.slice(1);
            //}

            $scope.openContext(openedContext);

            //angular.element('.context-browser-dropdown').removeClass('open');
        };


        $scope.openContext = function (contextDetails) { // callback when the open button is hit in the context browser
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
            itemOpenHandler: $scope.openEntity,
            isOpenable: $scope.isOpenable,
            getChildren: $scope.getChildren
            // (optional) click handler: itemClickHandler: $scope.clickHandler
        };

    }]);
});
