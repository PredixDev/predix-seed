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
            baseUrl: '/services', // the base uri where your asset instance is
            rootEntityId: null, // the root of the context browser
            onOpenContext: function(contextDetails) { // callback when the open button is hit in the context browser
                $scope.context = contextDetails;
            },
            transformSelectedEntityDetails: function(entity) { // configure key value pairs to show in the entity info panel in the context browser (the selected entity)
                return [
                    {label: 'Tom Edison'},  // (ex: {label: entity.attributes['Customer Name'].value})
                    {label: '12/24/2001'},
                    {label: 'Williamsburg Contract'},
                    {label: 'Serial Number', value: '345hwfher2wh3f8h47f'}
                ];
            },
            transformPinnedEntityDetails: function(entity) { // configure key value pairs to show in the entity info panel in dashboard (the pinned entity)
                return [
                    {label: 'Tom Edison'},  // (ex: {label: entity.attributes['Customer Name'].value})
                    {label: '12/24/2001'},
                    {label: 'Williamsburg Contract'},
                    {label: 'Serial Number', value: '345hwfher2wh3f8h47f'},
                    {label: 'Part Number', value: 32434},
                    {label: 'Part', value: '34wtefh8cdx'}
                ];
            }
        };

        /*
         * Optional
         * You can disable the context browser by setting $scope.disabled to true and passing the disabled attribute to context browser.
         * <px-context-selector data-disabled="disabled" ...></px-context-selector>
         *
         $scope.disabled = true;
         */

        /*
         * Optional
         * This is a "kitchen-sink" context selector configuration object. It shows you examples for all possible overrides.
         */
        //$scope.contextSelectorConfig = {
        //    baseUrl: '/services', // the base uri where your asset instance is
        //    rootEntityId: null, // the root of the context browser
        //    onOpenContext: function(contextDetails) { // callback when the open button is hit in the context browser
        //        $scope.context = contextDetails;
        //    },
        //    transformChildren: function(entity) { // transform your entity to context browser entity format
        //        return {
        //            name: entity.assetId, // Displayed name in the context browser
        //            id: entity.uri, // Unique ID (could be a URI for example)
        //            parentId: entity.parent, // Parent ID. Used to place the children under the corresponding parent in the browser.
        //            classification: entity.specification, // Classification used for fetching the views.
        //            isOpenable: !(entity.attributes && entity.attributes.isNotOpenable) // Is the open button displayed?
        //        };
        //    },
        //    getEntityChildrenUrl: function(parentEntityId) { // When a node is clicked, children are fetched using this URL.
        //        return this.baseUrl + '/asset?filter=parent=' + parentEntityId;
        //    },
        //    getEntityDetailUrl: function(entityId) { // When a node is clicked, the additional asset details are fetched using this URL.
        //        return this.baseUrl + entityId;
        //    },
        //    transformSelectedEntityDetails: function(entity) { // Configure key-value pairs to show in the entity info panel in the context browser (the selected entity)
        //        return [
        //            {label: 'John Doe'},  // (ex: {label: entity.attributes['Customer Name'].value})
        //            {label: '12/24/2001'},
        //            {label: 'Williamsburg Contract'},  // when you just pass a label, displayed as Label
        //            {label: 'Serial Number', value: '345hwfher2wh3f8h47f'}  // when you pass a label and a value, displayed as Label : Value
        //        ];
        //    },
        //    transformPinnedEntityDetails: function(entity) { // Configure key-value pairs to show in the entity info panel in dashboard (the pinned entity)
        //        return [
        //            {label: 'John Doe'},  // (ex: {label: entity.attributes['Customer Name'].value})
        //            {label: '12/24/2001'},
        //            {label: 'Williamsburg Contract'},
        //            {label: 'Serial Number', value: '345hwfher2wh3f8h47f'},
        //            {label: 'Part Number', value: 32434},
        //            {label: 'Part', value: '34wtefh8cdx'}
        //        ];
        //    }
        //};

    }]);
});
