/** global angular, require */
/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
	'require',
	'jquery',
	'angular',
	'angular-resource',
	'vruntime',
	'directives/main',
	'filters/main',
	'services/main',
	'controllers/main',
	'routes',
	'interceptors'
], function (require, $, angular, ngResource, vRuntime
						 /*, directives, filters, services, controllers, routes, interceptors*/) {
	'use strict';

	/**
	 * Application definition
	 * This is where the AngularJS application is defined and all application dependencies declared.
	 * @type {module}
	 */
	var predixApp = angular.module('predixApp', [
		'ngResource',
		'app.controllers',
		'app.directives',
		'app.services',
		'app.filters',
		'app.routes',
		'app.interceptors'
	]);

	predixApp.run(function () {
		// Application DataSources are defined here
		//vRuntime.datasource.create('ScatterChart', 'http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/line', {});
	});

	/**
	 * Main Controller
	 * This controller is the top most level controller that allows for all
	 * child controllers to access properties defined on the $rootScope.
	 */
	predixApp.controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

		//Global application object
		window.App = $rootScope.App = {
			version: '1.0',
			name: 'Predix Seed',
			session: {},
			tabs: [
				{state: 'home', label: vRuntime.messages('Home')},
				{state: 'about', label: vRuntime.messages('About')}
			]
		};

		//Unbind all widgets from datasources and widgets when page changes
		$rootScope.$on('$routeChangeStart', function () {
			vRuntime.binder.unbindAll();
		});

		$rootScope.logout = function (event) {
			event.preventDefault();
			location.replace('logout');
		};

	}]);

	//Set on window for debugging
	window.predixApp = predixApp;

	//Return the application  object
	return predixApp;
});
