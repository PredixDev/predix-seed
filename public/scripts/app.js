/** global angular, require */
/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
    'jquery',
    'angular',
    'angular-resource',
    'vruntime',
    'main',
    'routes',
    'interceptors'
], function($, angular, ngResource, vRuntime) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var myapp = angular.module('myapp', [
        'ngResource',
        'app.routes',
        'app.interceptors',
        'sample.module',
        'predix.widgets'
    ]);

    myapp.run(function() {
        // Application DataSources are defined here
        //vRuntime.datasource.create('ScatterChart', 'http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/line', {});
    });

    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    myapp.controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

        //Global application object
        $rootScope.App = {
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
        $rootScope.$on('$routeChangeStart', function() {
            vRuntime.binder.unbindAll();
        });

        $rootScope.logout = function(event) {
            event.preventDefault();
            location.replace('logout');
        };

    }]);

    //Return the application  object
    return myapp;
});
