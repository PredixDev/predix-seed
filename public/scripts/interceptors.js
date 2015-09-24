/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular'], function (angular) {
    'use strict';
    /**
     * Application configurations
     * This is where configuration is setup for your application.
     */
    return angular.module('app.interceptors', []).config(['$httpProvider', function ($httpProvider) {

        /*
         * Application http interceptor configuration
         * If you are using Siteminder, this interceptor can be used to capture the session timeout on an AJAX request.
         * You can implement your conditions in this interceptor according to your own requirement.
         */
        $httpProvider.interceptors.push(['$q', function ($q) {
            return {
                // optional method
                'request': function (config) {
                    // do something before request
                    return config;
                },
                // optional method
                'requestError': function (rejection) {
                    //handle error
                    return $q.reject(rejection);
                },
                // optional method
                'response': function (response) {
                    // do something on success
                    return response;
                },
                // (optional) Redirect user to login page when unauthorized (401)
                // If you want to allow 401's, you can remove this method.
                'responseError': function (rejection) {
                    // handle error
                    return $q.reject(rejection);
                }
            };
        }]);
    }]);
});
