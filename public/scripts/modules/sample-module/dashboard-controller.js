define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardsCtrl', ['$scope', '$log', 'PredixAssetService', 'PredixViewService', function ($scope, $log, PredixAssetService, PredixViewService) {

        // This asset service previously connected to the Predix Asset service backend microservice
        // but now it just gets data from the local folder sample-data

        PredixAssetService.getAssetsByParentId('root').then(function (initialContext) {

            // ERIC: this loads data from the asset service and marks one of them as a
            // pre-selected first asset
            // pre-select the 1st asset
            // design smell, why are we setting data on initialContext ? asset would never do this
            initialContext.data[0].selectedAsset = true;

            // initialContexts is used only on dashboards browser-context
            // ... look in views/dashboards.html
            $scope.initialContexts = initialContext;

            // once again... smelly?
            $scope.initialContextName = initialContext.data[0].name;

            //load view selector
            // call the method to actually update dom based on selected asset / context
            // see below for function definition...
            $scope.openContext($scope.initialContexts.data[0]);

        }, function (message) {
            $log.error(message);
        });

        // ERIC: needed for px-deck-selector in views/dashboards.html
        $scope.decks = [];
        $scope.selectedDeckUrl = null;

        // callback for when the Open button is clicked
        $scope.openContext = function (contextDetails) {

            // need to clean up the context details so it doesn't have the infinite parent/children cycle,
            // which causes problems later (can't interpolate: {{context}} TypeError: Converting circular structure to JSON)
            // ERIC: WTF?
            // Context browser has an unserializble data
            // WTF?!?!?!??!?!?!?!?!?!?!?!?!??!?!?!
            var newContext = angular.copy(contextDetails);
            newContext.children = [];
            newContext.parent = [];

            // url end point can change from context to context
            // so the same card can display different data from different contexts

            var url = {
                'parent': {
                    'datagrid-data': '/sample-data/datagrid-data.json'
                },
                'child': {
                    'core-vibe-rear-cruise': '/sample-data/core-vibe-rear-cruise.json',
                    'delta-egt-cruise': '/sample-data/delta-egt-cruise.json'
                },
                'child2': {
                    'core-vibe-rear-cruise': '/sample-data/core-vibe-rear-cruise0.json',
                    'delta-egt-cruise': '/sample-data/delta-egt-cruise.json'
                },
                'child3': {
                    'core-vibe-rear-cruise': '/sample-data/core-vibe-rear-cruise1.json',
                    'delta-egt-cruise': '/sample-data/delta-egt-cruise.json'
                }
            };

            // ERIC: adding these urls to the context so that the decks and cards can fetch data
            newContext.urls = url[newContext.id];

            // ERIC: set context to newContext.. $scope.context is used by px-dashboard
            $scope.context = newContext;

            // GOAL: Get decks by tags that are associated with the newContext... then add them to
            // $scope so that they can be used by px-deck-selector

            // Tag string can be classification from contextDetails
            PredixViewService.getDecksByTags(newContext.classification) // gets all decks for this context
                .then(function (decks) {
                    $scope.decks = [];

                    if (decks && decks.length > 0) {
                        decks.forEach(function (deck) {
                            $scope.decks.push({name: deck.title, id: deck.id});
                        });
                    }
                });
        };

        $scope.viewServiceBaseUrl = PredixViewService.baseUrl;


        // GOAL: context browser doesn't need to know about any endpoints or urls
        // want to have a function that gives you a context like ID... the pass in custom functions
        // data-table has a similar thing, also context browser, validating a cell
        // ASK MARTIN about it...
        
        $scope.getChildren = function (parent, options) {
            return PredixAssetService.getAssetsByParentId(parent.id, options);
        };

        $scope.handlers = {
            itemOpenHandler: $scope.openContext,
            getChildren: $scope.getChildren
            // (optional) click handler: itemClickHandler: $scope.clickHandler
        };
    }]);
});
