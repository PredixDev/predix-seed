/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define([ 'angular' ], function (angular) {
    'use strict';
    /**
    * Application configurations
    * This is where configuration is setup for your application.
    */
    return angular.module('app.interceptors', []).config(['$httpProvider', '$locationProvider', function($httpProvider, $locationProvider){
        
        /* 
        * Predix V server is expecting X-Requested-With header to identify the ajax traffic
        * When session is timed out, v session manager will return a json response instead of a redirect
        */
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        
        /*
         * Application http interceptor configuration
         * If you are using Siteminder, this interceptor can be used to capture the session timeout on an AJAX request.
         * You can implement your conditions in this interceptor according to your own requirement.
         */
        $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
            return {
                // optional method
                'request': function(config) {
                    // do something on success
                    return config;
                },
                // optional method
                'requestError': function(rejection) {
                    //handle error
                    return $q.reject(rejection);
                },
                // optional method
                'response': function(response) {
                    // do something on success
                    return response;
                },
                // optional method
                'responseError': function(rejection) {

                    //redirect to logout page when V-server throws unauthorized status
                    if (rejection.status === 401){
                       location.replace("/logout");
                    }

                    //handle error
                    return $q.reject(rejection);
                }
            };
        }]);
    }]);
});