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
    'px-oauth',
    'px-dashboard',
    'px-datasource',
    'widgets-module'
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
        'predix.widgets',
        'predix.oauth',
        'predix.datasource',
        'predix.configurable-dashboard'
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
    predixApp.controller('MainCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

        //Global application object
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'Predix Seed',
            session: {},
            tabs: [
                {icon: 'fa-home', state: 'home', label: 'Home', l10nId: 'Home'},
                {icon: 'fa-newspaper-o', state: 'about', label: 'About', l10nId: 'About'},
                {icon: 'fa-bar-chart', state: 'widgets', label: 'Widgets', l10nId: 'Widgets'},
                {icon: 'fa-tachometer', state: 'dashboard', label: 'Dashboard', l10nId: 'Dashboard'},
                {icon: 'fa-tachometer', state: 'cards', label: 'Cards', l10nId: 'Cards'},
                {icon: 'fa-tachometer', state: 'w2w', label: 'Widget to Widget', l10nId: 'Widget to Widget'}
            ]
        };

        // Example UAA Configuration
        $scope.site = 'https://uaa-staging.nurego.com';  // The location of your UAA server. The /oauth/token routes will be added by predix.oauth.
        $scope.clientId = 'experience_seed_app';                                    // Your app id that you registered with Cloud Foundry.
        $scope.redirectUri = $location.absUrl();                    // Where the UAA server should redirect the user on successful login. Typically, the last page the user was visiting.
    }]);


    //Set on window for debugging
    window.predixApp = predixApp;

    //Return the application  object
    return predixApp;
});
