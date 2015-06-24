/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('cards', {
                url: '/cards',
                templateUrl: 'views/cards.html'
            })
            .state('interactions', {
                url: '/interactions',
                templateUrl: 'views/interactions.html'
            })
            .state('dataControl', {
                url: '/dataControl',
                templateUrl: 'views/data-control.html',
                controller: 'DataControlCtrl'
            })
            .state('components', {
                url: '/components',
                templateUrl: 'views/components.html'
            });


        $urlRouterProvider
            .otherwise(function(){
                document.querySelector('px-app-nav').markSelected('/about');
                return 'about';
            });
    }]);
});
