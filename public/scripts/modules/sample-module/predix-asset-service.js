define(['angular', './sample-module'], function(angular, module) {
    'use strict';

    /**
     * PredixAssetService is a sample service that integrates with Predix Asset Server API
     */
    module.factory('PredixAssetService', ['$q', '$http', function($q, $http) {
        /**
         * Predix Asset server base url
         */
        var baseUrl = '/sample-data';

        /**
         * transform the asset entity into an object format consumable by px-context-browser item
         */
        var transformChildren = function(entities) { // transform your entity to context browser entity format
            var result = [];
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var transformedEntity =  {
                    name: entity.assetId, // Displayed name in the context browser
                    id: entity.uri, // Unique ID (could be a URI for example)
                    identifier: entity.uri, // Unique ID (could be a URI for example)
                    parentId: entity.parent, // Parent ID. Used to place the children under the corresponding parent in the browser.
                    classification: entity.classification, // Classification used for fetching the views.
                    isOpenable: true
                };

                if (entity.children){
                    transformedEntity.children = transformChildren(entity.children);
                }

                result.push(transformedEntity);
            }
            return result;
        };

        /**
         * fetch the asset children by parentId
         */
        var getEntityChildren = function(parentId, options) {
            var deferred = $q.defer();
            var childrenUrl = baseUrl + '/sample-asset-'+parentId+'.json'; //'?pageSize=' + numberOfRecords + '&topLevelOnly=true&filter=parent=' + parentId;
            var childEntities = {
                meta: {link: ''},
                data: []
            };
            if (options && options.hasOwnProperty('link')) {
                if (options.link === '') {
                    deferred.resolve(childEntities);
                    return deferred.promise;
                }
                else {
                    //overwrite url if there is link
                    childrenUrl = options.link;
                }
            }

            $http.get(childrenUrl)
                .success(function(data, status, headers) {
                    var linkHeader = headers('Link');
                    var link = '';
                    if (data.length !== 0) {
                        if (linkHeader && linkHeader !== '') {
                            var posOfGt = linkHeader.indexOf('>');
                            if (posOfGt !== -1) {
                                link = linkHeader.substring(1, posOfGt);
                            }
                        }
                    }

                    childEntities = {
                        meta: {link: link, parentId: parentId},
                        data: data
                    };
                    deferred.resolve(childEntities);
                })
                .error(function() {
                    deferred.reject('Error fetching asset with id ' + parentId);
                });


            return deferred.promise;
        };

        /**
         * get asset by parent id
         */
        var getAssetsByParentId = function(parentId, options) {
            var deferred = $q.defer();

            getEntityChildren(parentId, options).then(function(results) {
                results.data = transformChildren(results.data);

                deferred.resolve(results);

            }, function() {
                deferred.reject('Error fetching asset with id ' + parentId);
            });

            return deferred.promise;
        };

        return {
            getAssetsByParentId: getAssetsByParentId
        };
    }]);
});
