
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
              .state('page-1', {url: '/page-1', templateUrl: 'assets/views/page-1.html', controller: 'Page1Ctrl'})
              .state('page-2', {url: '/page-2', templateUrl: 'assets/views/page-2.html', controller: 'Page2Ctrl'})
              .state('page-3', {url: '/page-3', templateUrl: 'assets/views/page-3.html', controller: 'Page3Ctrl'});

          $urlRouterProvider
              .otherwise('page-1');
    } ]);
});
