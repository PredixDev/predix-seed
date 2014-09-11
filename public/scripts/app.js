
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
], function (require, $, angular, ngResource, vRuntime, directives, filters, services, controllers, routes, interceptors) {
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
	
    predixApp.run(['$location', '$rootScope', function($location, $rootScope) {
         
        // Application DataSources are defined here
        vRuntime.datasource.create("ScatterChart", "http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/line", {});
        vRuntime.datasource.create("SeriesChart", "http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/line", {});
        vRuntime.datasource.create("DataGrid", "http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/datagridlarge", {});
        vRuntime.datasource.create("RadialChart", "http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/donut", {});
        vRuntime.datasource.create("Gauge", "http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/gauge", {});
        vRuntime.datasource.create("Bar", "http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/bar", {});
        vRuntime.datasource.create("messagelist", "http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/msglist", {});
        vRuntime.datasource.create("Paragraph", "http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/para", {});
        vRuntime.datasource.create("realtimegauge", "ws://sjc1dsppf09.crd.ge.com:3001", {});
        vRuntime.datasource.create("realtimespline", "ws://sjc1dsppf09.crd.ge.com:3001", {}); 
            
    }]);
	


    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    predixApp.controller('MainCtrl',['$scope', '$rootScope', '$location',  function($scope, $rootScope, $location){
		
        //Global application object
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'Predix Seed',
            session: {},
            tabs: [
		        {state: 'static-data-1', label: vRuntime.messages('Application.Static_Data_1')},
		        {state: 'static-data-2', label: vRuntime.messages('Application.Static_Data_2')},
		        {state: 'service-data-1', label: vRuntime.messages('Application.Service_Data_1')},
		        {state: 'service-data-2', label: vRuntime.messages('Application.Service_Data_2')},
		        {state: 'widget-to-widget', label: vRuntime.messages('Application.Widget_to_Widget')},
		        {state: 'websocket', label: vRuntime.messages('Application.websocket')} 
            ]
        };

        //Unbind all widgets from datasources and widgets when page changes
        $rootScope.$on('$routeChangeStart', function() {
            vRuntime.binder.unbindAll();
        });

        $rootScope.logout = function(event){
            event.preventDefault();
            location.replace('logout');
        };
                 
    }]);

    //Enable logging to the console. (levels are ERROR, WARN, SUCCESS, INFO, NONE)
    //get a logger instance
    //var logger = vRuntime.logger.create('runtimetest');
    //set logger instance level
    //logger.setLevel(vRuntime.logger.global.INFO);
    //logger.warn('here is app module');
     
    //Set on window for debugging
    window.predixApp = predixApp;
	
    //Return the application  object
    return predixApp;
});
