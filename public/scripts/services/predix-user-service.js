/*global define */
define(['angular', 'sample-module'], function (angular, module) {
    'use strict';
    /**
     * PredixAssetService is a sample angular service that integrates with Predix Asset Server API
     */
    module.factory('PredixUserService', ['$q', function ($q) {
        return {
            isAuthenticated: function(){
                return this.getUserInfo();
            },
            login: function(uiState){
                window.px.auth.login(uiState);
            },
            getUserInfo: function(){
                var deferred = $q.defer();
                window.px.auth.getUserInfo().then(function(){
                    deferred.resolve();
                }, function(){
                    deferred.reject();
                });
                return deferred.promise;
            }
        };
    }]);
});
