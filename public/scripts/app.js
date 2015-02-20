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
    'widgets-module'
], function($, angular, ngResource, vRuntime) {
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
        'predix.configurable-dashboard'
    ]);

    predixApp.config(['WidgetLoaderServiceProvider', 'ContextBrowserServiceProvider', 'ViewServiceProvider', function (WidgetLoaderServiceProvider, ContextBrowserServiceProvider, ViewServiceProvider) {
        WidgetLoaderServiceProvider.loadWidgetsFrom([
            'bower_components/px-datagrid/src',
            'bower_components/px-time-series/src'
        ]);
        ViewServiceProvider.setViewUrl('http://dev-dashboard-server.grc-apps.svc.ice.ge.com');

        /**
         * Enable the following line to use SampleEntityService as Entity Tree data provider for the Configurable dashboard context browser
         */
        ContextBrowserServiceProvider.setContextService('SampleEntityService');

        ViewServiceProvider.setViewUrl('http://dev-dashboard-server.grc-apps.svc.ice.ge.com');

        DatasourceServiceProvider.setContextMetadataUrl('dashboard-mock-server.grc-apps.svc.ice.ge.com/qa/service/readerApp/Entity');
    }]);

    /**
     * A configurable dashboard sample entity service
     */
    predixApp.factory('SampleEntityService', function(){
        return {
            baseUrl: '/services/asset',
            rootEntityId: null,
            transform: function (entity){
                return  {
                    name: entity.assetId,
                    id: entity.uri,
                    parentId: entity.parent,
                    classification: entity.specification,
                    isOpenable: !(entity.attributes && entity.attributes.isNotOpenable)
                };
            },
            getEntityChildrenUrl: function (parentEntityId){
                return this.baseUrl + '?filter=parent='+parentEntityId;
            }
        };
    });

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
                {state: 'widgets', label: vRuntime.messages('Widgets')},
                {state: 'dashboard.main', label: vRuntime.messages('Dashboard')}
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

        // Example UAA Configuration
        $scope.site = 'https://predixuaa.grc-apps.svc.ice.ge.com';  // The location of your UAA server. The /oauth/token routes will be added by predix.oauth.
        $scope.clientId = 'app';                                // Your app id that you registered with Cloud Foundry.
        $scope.redirectUri = $location.absUrl();                // Where the UAA server should redirect the user on successful login. Typically, the last page the user was visiting.
        $scope.loginTemplate= 'views/home.html';

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
