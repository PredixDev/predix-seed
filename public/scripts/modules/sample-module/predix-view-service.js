/*global define */
define(['angular', './sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixViewService is a sample angular service that integrates with Predix View Service API
    */
    module.factory('PredixViewService', ['$http', '$q', function ($http, $q) {
        return {
            baseUrl: '/api/view-service',
            getDecksByTags: function (tags) {
                var deferred = $q.defer();
                $http.get(this.baseUrl + '/decks/tags?values=' + tags + '&filter[order]=createTimeStamp ASC')
                    .then(function (res) {
                        deferred.resolve(res.data);
                    },
                    function () {
                        deferred.reject('Error fetching decks with tags ' + tags);
                    });
                return deferred.promise;
            }
        };
    }]);
});
