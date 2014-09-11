
/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define([ 'angular', 'controllers/main', 'angular-ui-router' ], function (angular, controllers) {
    'use strict';
    return angular.module('app.routes', [ 'ui.router' ]).config([ "$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(false);

          /**
           * Router paths
           * This is where the name of the route is matched to the controller and view template.
           */
          $stateProvider
              .state('static-data-1', {url: '/static-data-1', templateUrl: 'assets/views/static-data-1.html', controller: 'StaticData1Ctrl'})
              .state('static-data-2', {url: '/static-data-2', templateUrl: 'assets/views/static-data-2.html', controller: 'StaticData2Ctrl'})
              .state('service-data-1', {url: '/service-data-1', templateUrl: 'assets/views/service-data-1.html', controller: 'ServiceData1Ctrl'})
              .state('service-data-2', {url: '/service-data-2', templateUrl: 'assets/views/service-data-2.html', controller: 'ServiceData2Ctrl'})
              .state('widget-to-widget', {url: '/widget-to-widget', templateUrl: 'assets/views/widget-to-widget.html', controller: 'WidgetToWidgetCtrl'})
              .state('websocket', {url: '/websocket', templateUrl: 'assets/views/websocket.html', controller: 'WebsocketCtrl'});

          $urlRouterProvider
              .otherwise('static-data-1');
    } ]);
});
