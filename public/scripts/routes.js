/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define(['angular', 'angular-ui-router', 'controllers/main'], function (angular) {
	'use strict';
	return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

		//Turn on or off HTML5 mode which uses the # hash
		$locationProvider.html5Mode(false);

		/**
		 * Router paths
		 * This is where the name of the route is matched to the controller and view template.
		 */
		$stateProvider
			.state('home', {url: '/home', templateUrl: 'views/home.html', controller: 'HomeCtrl'})
			.state('about', {url: '/about', templateUrl: 'views/about.html', controller: 'AboutCtrl'})
            .state('widgets', {url: '/widgets', templateUrl: 'views/widgets.html', controller: 'WidgetsCtrl'})
        ;

		$urlRouterProvider
			.otherwise('home');
	}]);
});
