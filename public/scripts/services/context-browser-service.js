/*global define */
define(['angular', 'sample-module'], function (angular, module) {
    'use strict';

    module.factory('ContextBrowserService', function ($q, $http) {

        var defaultConfig = {
            baseUrl: 'http://predix-asset-mvp2-seed-app.grc-apps.svc.ice.ge.com/asset',
            rootEntityId: null,
            clientId: 'experience_seed_app',
            transformChildren: function(entity) { // transform your entity to context browser entity format
                return {
                    name: entity.assetId, // Displayed name in the context browser
                    id: entity.uri, // Unique ID (could be a URI for example)
                    parentId: entity.parent, // Parent ID. Used to place the children under the corresponding parent in the browser.
                    classification: entity.classification, // Classification used for fetching the views.
                    isOpenable: true
                };
            },
            getEntityChildren: function (parentId, options) {
                var self = this;
                var numberOfRecords = 100;
                var deferred = $q.defer();
                var childrenUrl = this.baseUrl + '?pageSize=' + numberOfRecords + '&topLevelOnly=true&filter=parent=' + parentId;
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

                //TODO: remove the headers when Predix Asset ready
                $http.get(childrenUrl, {headers: {'x-tenant': this.clientId }})
                    .success(function (data, status, headers) {
                        var linkHeader = headers('Link');
                        var link = '';
                        if (data.length !== 0){
                            if (linkHeader && linkHeader !== '') {
                                var posOfGt = linkHeader.indexOf('>');
                                if (posOfGt !== -1) {
                                    link = linkHeader.substring(1, posOfGt);
                                }
                            }
                        }

                        childEntities = {
                            meta: {link: link},
                            data: data
                        };
                        deferred.resolve(childEntities);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject('Error fetching asset with id ' + parentId);
                    });

                return deferred.promise;
            }
        };

        var loadContextTree = function () {
            var rootId = this.config.rootEntityId;
            if (rootId === undefined) {
                rootId = null;
            }
            return this.getChildren(rootId);
        };

        var getChildren = function (parentId, options) {
            var self = this;
            var deferred = $q.defer();

            this.config.getEntityChildren(parentId, options).then(function (results) {
                var transformedChildren = [];
                for (var i = 0; i < results.data.length; i++) {
                    transformedChildren.push(self.config.transformChildren(results.data[i]));
                }

                results.data = transformedChildren;

                deferred.resolve(results);

            }, function () {
                deferred.reject('Error fetching asset with id ' + parentId);
            });

            return deferred.promise;
        };

        var ContextService = function (userConfig) {
            this.config = angular.extend({}, defaultConfig, userConfig);
            this.loadContextTree = loadContextTree.bind(this);
            this.getChildren = getChildren.bind(this);
        };

        var getInstance = function (userConfig) {
            return new ContextService(userConfig);
        };

        return {
            getInstance: getInstance
        };
    });
})
;
