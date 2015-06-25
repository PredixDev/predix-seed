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
    controllers.controller('DashboardCtrl', ['VCAP_SERVICES', '$scope', '$q', '$http', function (VCAP_SERVICES, $scope, $q, $http) {

        $scope.contextSelectorConfig = {
            // baseUrl: VCAP_SERVICES.predixAssetExp2,
            baseUrl: 'http://predix-asset-mvp2-seed-app.grc-apps.svc.ice.ge.com/asset',  //the base uri where your asset instance is
            rootEntityId: null, // the root of the context browser
            onOpenContext: function (contextDetails) { // callback when the open button is hit in the context browser
                $scope.$apply(function () {

                    // need to clean up the context details so it doesn't have the infinite parent/children cycle,
                    // which causes problems later (can't interpolate: {{context}} TypeError: Converting circular structure to JSON)
                    var newContext = angular.copy(contextDetails);
                    newContext.children = [];
                    newContext.parent = [];

                    $scope.context = newContext;

                    $scope.selectedDeck = 'bower_components/px-sample-cards/sample-deck.html';
                });
            },
            transformChildren: function(entity) { // transform your entity to context browser entity format
                return {
                    name: entity.assetId, // Displayed name in the context browser
                    id: entity.uri, // Unique ID (could be a URI for example)
                    parentId: entity.parent, // Parent ID. Used to place the children under the corresponding parent in the browser.
                    classification: entity.classification, // Classification used for fetching the views.
                    isOpenable: true
                };
            }
        };


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
        //            classification: entity.classification, // Classification used for fetching the views.
        //            isOpenable: !(entity.attributes && entity.attributes.isNotOpenable) // Is the open button displayed?
        //        };
        //    },
        //    getEntityChildren: function(parentId, options) { // override fetching the children if you're not using Predix Asset by passing parentId and options.rangeStart (starting row number of the next batch of child entities) which supports pagination.
        //        var deferred = $q.defer();
        //        // customize your url here
        //        var childrenUrl = this.baseUrl + '?filter=parent=' + parentId;
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
        //    }
        //};

    }]);
});
