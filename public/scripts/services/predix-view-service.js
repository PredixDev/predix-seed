/*global define */
define(['angular', 'sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixAssetService is a sample angular service that integrates with Predix Asset Server API
    */
    module.factory('PredixViewService', ['$http', '$q', function ($http, $q) {
        return {
            getDecksByTags: function (tags) {
                var deferred = $q.defer();
                $http.get('api/views/decks/tags?values=' + tags, {headers: {'predix-zone-id': 'predix-seed'}})
                    .then(function (res) {
                        deferred.resolve(res.data);
                    },
                    function () {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        };
    }]);
});
