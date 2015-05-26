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
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .state('widgets', {
                url: '/widgets',
                templateUrl: 'views/widgets.html',
                controller: 'WidgetsCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('cards', {
                url: '/cards',
                templateUrl: 'views/cards.html',
                controller: 'CardsCtrl'
            })
            .state('w2w', {
                url: '/w2w',
                templateUrl: 'views/widget-to-widget.html',
                controller: 'WidgetToWidgetCtrl'
            })
            .state('fetchData', {
                url: '/fetchData',
                templateUrl: 'views/fetch-data.html',
                controller: 'FetchData'
            });


        $urlRouterProvider
            .otherwise('home');
    }]);
});
