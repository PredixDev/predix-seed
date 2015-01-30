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
    'dashboard/main',
    'routes',
    'interceptors',
    'oauth'
], function (require, $, angular, ngResource, vRuntime, directives, filters, services, controllers, dashboard, routes, interceptors) {
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
        'app.interceptors',
        'oauth'
    ]);

    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    predixApp.controller('MainCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

        //Global application object
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'Predix Seed',
            session: {},
            tabs: [
                {state: 'home', label: vRuntime.messages('Home')},
                {state: 'about', label: vRuntime.messages('About')},
                {state: 'widgets', label: vRuntime.messages('Widgets')}
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

    //Enable logging to the console. (levels are ERROR, WARN, SUCCESS, INFO, NONE)
    //get a logger instance
    window.logger = vRuntime.logger.create('config dash');
    //set logger instance level
    window.logger.setLevel(vRuntime.logger.global.WARN);

    //Set on window for debugging
    window.predixApp = predixApp;

    //Return the application  object
    return predixApp;
});
