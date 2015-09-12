/*global define */
define(['angular', './sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixViewService is a sample angular service that integrates with Predix View Service API
    */
    module.factory('PredixViewService', ['$http', '$q', function ($http, $q) {
        return {
            getDecksByTags: function (tags) {
                var deferred = $q.defer();
                $http.get('/api/views/decks/tags?values=' + tags)
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
