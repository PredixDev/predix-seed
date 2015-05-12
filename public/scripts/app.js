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
    'interceptors',
    'px-oauth',
    'px-dashboard',
    'px-datasource',
    'widgets-module',
    'line-chart'
], function ($, angular, ngResource, vRuntime) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var predixApp = angular.module('predixApp', [
        'ngResource',
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

    predixApp.config(['WidgetLoaderServiceProvider', 'ViewServiceProvider', 'DatasourceServiceProvider', 'VCAP_SERVICES', function (WidgetLoaderServiceProvider, ViewServiceProvider, DatasourceServiceProvider, VCAP_SERVICES) {
        WidgetLoaderServiceProvider.loadWidgetsFrom([
            'bower_components/px-datagrid/src',
            'bower_components/px-time-series/src'
        ]);

        ViewServiceProvider.setViewUrl(VCAP_SERVICES.viewPersistenceService);

        DatasourceServiceProvider.setContextMetadataUrl('http://dashboard-mock-server.grc-apps.svc.ice.ge.com/qa');
    }]);

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
                {icon: 'fa-home', state: 'home', label: vRuntime.messages('Home'), l10nId: 'Home'},
                {icon: 'fa-newspaper-o', state: 'about', label: vRuntime.messages('About'), l10nId: 'About'},
                {icon: 'fa-bar-chart', state: 'widgets', label: vRuntime.messages('Widgets'), l10nId: 'Widgets'},
                {icon: 'fa-warning', state: 'alarm', label: 'Alarm', l10nId: 'Alarm'},
                {icon: 'fa-tachometer', state: 'dashboard', label: vRuntime.messages('Dashboard'), l10nId: 'Dashboard'}
            ]
        };

        //Unbind all widgets from datasources and widgets when page changes
        $rootScope.$on('$routeChangeStart', function () {
            vRuntime.binder.unbindAll();
        });

        // Example UAA Configuration
        $scope.site = 'https://uaa-staging.nurego.com';  // The location of your UAA server. The /oauth/token routes will be added by predix.oauth.
        $scope.clientId = 'experience_seed_app';                                    // Your app id that you registered with Cloud Foundry.
        $scope.redirectUri = $location.absUrl();                    // Where the UAA server should redirect the user on successful login. Typically, the last page the user was visiting.
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
