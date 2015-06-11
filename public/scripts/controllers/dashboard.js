/**
 * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
 * Customize your widgets by:
 *  - Overriding or extending widget API methods
 *  - Changing widget settings or options
 */
/* jshint unused: false */
define(['angular',
    'sample-module'
], function(angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardCtrl', ['VCAP_SERVICES', '$scope', '$q', function(VCAP_SERVICES, $scope, $q) {

        window.px.dealer.init();
        
        $scope.contextSelectorConfig = {
            //baseUrl: VCAP_SERVICES.predixAssetExp2 + '/services', // the base uri where your asset instance is
            baseUrl: 'http://predix-asset-mvp2-exp1.grc-apps.svc.ice.ge.com/api/asset', // the base uri where your asset instance is
            rootEntityId: null, // the root of the context browser
            onOpenContext: function(contextDetails) { // callback when the open button is hit in the context browser
                $scope.$apply(function() {

                    // need to clean up the context details so it doesn't have the infinite parent/children cycle,
                    // which causes problems later (can't interpolate: {{context}} TypeError: Converting circular structure to JSON)
                    var newContext = angular.copy(contextDetails);
                    newContext.children = [];
                    newContext.parent = [];

                    $scope.context = newContext;

                    $scope.decks = window.px.dealer.getDecksByClassification($scope.context.classification);
                    if ($scope.decks.length){
                        $scope.selectedDeck = $scope.decks[0].url;
                    }


                });
            },
            transformSelectedEntityDetails: function(entity) { // configure key value pairs to show in the entity info panel in the context browser (the selected entity)
                return [
                    {label: 'Tom Edison'},  // (ex: {label: entity[0].attributes['Customer Name'].value})
                    {label: '12/24/2001'},
                    {label: 'Williamsburg Contract'},
                    {label: 'Serial Number', value: '345hwfher2wh3f8h47f'}
                ];
            },
            transformPinnedEntityDetails: function(entity) { // configure key value pairs to show in the entity info panel in dashboard (the pinned entity)
                return [
                    {label: 'Tom Edison'},  // (ex: {label: entity[0].attributes['Customer Name'].value})
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
        //    getEntityChildren: function(parentId, rangeStart) { // override fetching the children if you're not using Predix Asset by passing parentId and rangeStart (starting row number of the next batch of child entities) which supports pagination.
        //        var deferred = $q.defer();
        //        // customize your url here
        //        var childrenUrl = this.baseUrl + '/asset?filter=topLevelOnly=true:parent=' + parentId;
        //
        //        // get your data from your url
        //        $http.get(childrenUrl, {headers: headers})
        //            .success(function(data, status, headers) {
        //
        //                // resolve the promise with the child entity with the object format below
        //                var childEntities = {
        //                    meta: { total: numberOfChildrenTotal }, // the total number of child entities, NOT the number returned (this allows support for pagination)
        //                    data: data // child entities (can be only 1 page)
        //                };
        //                deferred.resolve(childEntities);
        //            })
        //            .error(function(data, status, headers, config) {
        //                deferred.reject('Error fetching asset with id ' + parentId);
        //            });
        //
        //        return deferred.promise;
        //    },
        //    getEntityDetails: function(entityId) { // override for fetching details about an entity, out of the box we don't do any fetching for entity details... you must implement this to fetch
        //        var deferred = $q.defer();
        //        var entityDetailUrl = this.baseUrl + entityId;
        //
        //        $http.get(entityDetailUrl)
        //            .success(function(data) {
        //                deferred.resolve(data); // just resolve with the details returned, you're responsible for transforming them in transformSelectedEntityDetails and transformPinnedEntityDetails method anyway
        //            })
        //            .error(function(data, status, headers, config) {
        //                deferred.reject('Error fetching asset detail with id ' + entityId);
        //            });
        //
        //        return deferred.promise;
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
