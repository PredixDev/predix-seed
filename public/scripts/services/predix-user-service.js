/*global define */
define(['angular', 'sample-module'], function (angular, module) {
    'use strict';
    /**
     * PredixAssetService is a sample angular service that integrates with Predix Asset Server API
     */
    module.factory('PredixUserService', ['$q', '$http', '$location', function ($q, $http, $location) {
        return {
            isAuthenticated: function(){
                return this.getUserInfo();
            },
            login: function(uiState){
                var protocol = $location.protocol();
                var host = $location.host();
                var port = $location.port();
                window.location.replace('/login?redirectUri='+protocol+'://'+host+':'+port+uiState.url);
            },
            getUserInfo: function(){
                return $http.get('/userinfo');
            }
        };
    }]);
});
