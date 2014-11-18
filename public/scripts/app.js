
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
        vRuntime.datasource.create("ScatterChart", "http://alp1experience6.cloud.ge.com:9090/service/dummydata/line", {});
        vRuntime.datasource.create("timeseries", "http://alp1experience6.cloud.ge.com:9090/service/dummydata/line", {});
        vRuntime.datasource.create("DataGrid", "http://alp1experience6.cloud.ge.com:9090/service/dummydata/datagridlarge", {});
        vRuntime.datasource.create("Bar", "http://alp1experience6.cloud.ge.com:9090/service/dummydata/bar", {});
        vRuntime.datasource.create("realtimegauge", "ws://alp1experience6.cloud.ge.com:3001", {});

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
                {state: 'page-1', label: vRuntime.messages('Application.Page', 1)},
                {state: 'page-2', label: vRuntime.messages('Application.Page', 2)},
                {state: 'page-3', label: vRuntime.messages('Application.Page', 3)}
            ]
        };

        //Unbind all widgets from datasources and widgets when page changes
        $rootScope.$on('$routeChangeStart', function() {
            if ($rootScope.displayInfoMessageRouteCount >= $rootScope.displayInfoMessageNavCount) {
                $rootScope.displayInfoMessage = false;
                $rootScope.displayInfoMessageRouteCount = 0;
                $rootScope.displayInfoMessageNavCount = 0;
            }
            $rootScope.displayInfoMessageRouteCount++;
            vRuntime.binder.unbindAll();
        });



        //$rootScope.serviceUrl = "http://3.39.77.88:9090/service/";
        $rootScope.serviceUrl = "http://localhost:9090/service/";
        // Application DataSources are defined here
        //VRuntime.services.datasource.create("cardService", "http://3.239.240.40:9090/service/cardstore/cards", {});
        //deepak ip: 3.39.78.156
       // VRuntime.services.datasource.create("cardService", "http://3.39.78.156:9090/service/cardstore/cards", {});

        $rootScope.displayInfoMessageRouteCount = 0;
        $rootScope.displayInfoMessageNavCount = 0;

        $rootScope.showMsg = function(msg, cls, navCount) {
            $timeout(function() {
                $rootScope.displayMessage = msg;
                $rootScope.alertClass = cls;
                $rootScope.displayInfoMessage = true;
            });
            $rootScope.displayInfoMessageRouteCount = 0;
            $rootScope.displayInfoMessageNavCount = navCount || 0;
        }

        $rootScope.$on("$routeChangeStart", function (evt, next) {
            if ($rootScope.displayInfoMessageRouteCount >= $rootScope.displayInfoMessageNavCount) {
                $rootScope.displayInfoMessage = false;
                $rootScope.displayInfoMessageRouteCount = 0;
                $rootScope.displayInfoMessageNavCount = 0;
            }
            $rootScope.displayInfoMessageRouteCount++;
        });

        VRuntime.services.datasource.create("packService", $rootScope.serviceUrl + "appConfig/apps", {});



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
