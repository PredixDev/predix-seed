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
], function(angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardCtrl', ['$scope', function($scope) {

        $scope.contextSelectorConfig = {
            baseUrl: '/services/asset',
            rootEntityId: null,
            // example data transformation and children url if you are not using Asset
            //transform: function(entity) {
            //    return {
            //        name: entity.assetId,
            //        id: entity.uri,
            //        parentId: entity.parent,
            //        classification: entity.specification,
            //        isOpenable: !(entity.attributes && entity.attributes.isNotOpenable)
            //    };
            //},
            //getEntityChildrenUrl: function(parentEntityId) {
            //    return this.baseUrl + '?filter=parent=' + parentEntityId;
            //},
            onOpenContext: function(contextDetails) {
                $scope.context = contextDetails;
            }
        };

        //$scope.disabled = true;

    }]);
});
