/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define(['angular', 'angular-ui-router', 'px-oauth'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router', 'predix.oauth']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('root', {
                templateUrl: 'views/root.html',  // Provide a common root template for all states (i.e. nav-bar)
                abstract: true,
                parent: 'secure'                        // On initial load, ensures oauth token exists
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                parent: 'root'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                parent: 'root'
            })
            .state('widgets', {
                url: '/widgets',
                templateUrl: 'views/widgets.html',
                controller: 'WidgetsCtrl',
                parent: 'root'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                abstract: true,
                parent: 'root'
            });

        $urlRouterProvider
            .otherwise('home');
    }]);
});
