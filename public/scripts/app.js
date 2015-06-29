/** global angular, require */
/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
    'jquery',
    'angular',
    'main',
    'routes',
    'interceptors',
    'px-datasource'
], function ($, angular) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var predixApp = angular.module('predixApp', [
        'app.routes',
        'app.interceptors',
        'sample.module',
        'predix.datasource'
    ]);

    /**
     * Define constants here. This gives you access to you services registered in Cloud Foundry.
     * You can access the url VCAP_SERVICES.myServiceName.
     */
    predixApp.constant('VCAP_SERVICES', window.getRoutes());

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
                {icon: 'fa-home', state: 'about', label: 'About'},
                {icon: 'fa-tachometer', state: 'dashboard', label: 'Dashboard'},
                {icon: 'fa-th', state: 'cards', label: 'Cards', subitems: [
                    {state: 'interactions', label: 'Interactions'},
                    {state: 'dataControl', label: 'Data Control'}
                ]},
                {icon: 'fa-bar-chart', state: 'components', label: 'Components'}
            ]
        };

    }]);


    //Set on window for debugging
    window.predixApp = predixApp;

    //Return the application  object
    return predixApp;
});
