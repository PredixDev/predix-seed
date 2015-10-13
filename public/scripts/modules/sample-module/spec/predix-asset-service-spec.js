/**
 * These are actual tests for the Predix Asset Service.  Take 'em of leave 'em. :)
 */
define(['angular', 'angular-mocks', 'app'], function(angular) {
    'use strict';

    var topLevelData = [
        {
            'assetId': '001-1',
            'description': 'Mustang',
            'uri': '001-1',
            'classification': 'car',
            'parent': null,
            'attributes': {
                isNotOpenable: false
            }
        },
        {
            'assetId': '001-2',
            'description': 'Sandy',
            'uri': '001-2',
            'classification': 'car',
            'parent': null,
            'attributes': {
                isNotOpenable: false
            }
        },
        {
            'assetId': '001-3',
            'description': 'Nothing',
            'uri': '001-3',
            'classification': 'car',
            'parent': null,
            'attributes': {
                isNotOpenable: false
            }
        }
    ];

    var secondLevelData = [
        {
            'assetId': '001-1-1',
            'description': 'Wheels',
            'uri': '001-1-1',
            'classification': 'car',
            'parent': '001-1',
            'attributes': {
                isNotOpenable: false
            }
        },
        {
            'assetId': '001-1-2',
            'description': 'Brakes',
            'uri': '001-1-2',
            'classification': 'car',
            'parent': '001-1',
            'attributes': {
                isNotOpenable: false
            }
        }
    ];

    describe('The Predix Asset Service', function() {
        var PredixAssetService, $log, $httpBackend, q, successCallback, errorCallback, $rootScope;

        beforeEach(module('predixApp'));

        beforeEach(function() {
            angular.module('testModule', ['predixApp']);
            module('testModule');
        });

        beforeEach(inject(function(_PredixAssetService_, _$httpBackend_, _$rootScope_, $q, _$log_) {
            PredixAssetService = _PredixAssetService_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            q = $q;
            $log = _$log_;
        }));

        describe('with predix asset service', function() {

            describe('when getting asset root', function() {

                beforeEach(function() {
                    successCallback = jasmine.createSpy('successCallback');
                    errorCallback = jasmine.createSpy('errorCallback');

                    $httpBackend.when('GET', '/sample-data/sample-asset-null.json').respond(topLevelData);
                    PredixAssetService.getAssetsByParentId(null).then(successCallback, errorCallback);
                });

                it('will fetch context root with default url and rootEntityId null', function() {
                    $httpBackend.expectGET('/sample-data/sample-asset-null.json');
                    $httpBackend.flush();
                });

                it('will resolve the promise with the default transformed data', function() {
                    $httpBackend.flush();

                    var context = successCallback.calls[0].args[0].data;
                    var assetData = topLevelData[0];

                    expect(context.length).toBe(topLevelData.length);
                    expect(context[0].name).toBe(assetData.assetId);
                    expect(context[0].id).toBe(assetData.uri);
                    expect(context[0].classification).toBe(assetData.classification);
                    expect(context[0].parentId).toBe(assetData.parent);
                    expect(context[0].isOpenable).toBe(!(assetData.attributes && assetData.attributes.isNotOpenable));
                });
            });

            describe('when response fails getting asset root', function() {

                beforeEach(function() {
                    successCallback = jasmine.createSpy('successCallback');
                    errorCallback = jasmine.createSpy('errorCallback');

                    $httpBackend.when('GET', '/sample-data/sample-asset-null.json').respond(500);
                    PredixAssetService.getAssetsByParentId(null).then(successCallback, errorCallback);
                    $httpBackend.flush();
                });

                it('reject promise if the GET fails', function() {
                    expect(errorCallback).toHaveBeenCalledWith('Error fetching asset with id ' + null);
                });
            });

            describe('when getting the children of an asset', function() {

                beforeEach(function() {
                    successCallback = jasmine.createSpy('successCallback');
                    errorCallback = jasmine.createSpy('errorCallback');

                    $httpBackend.when('GET', '/sample-data/sample-asset-24.json').respond(secondLevelData);
                    PredixAssetService.getAssetsByParentId(24).then(successCallback, errorCallback);
                });

                it('will fetch asset root with default url and rootEntityId 24', function() {
                    $httpBackend.expectGET('/sample-data/sample-asset-24.json');
                    $httpBackend.flush();
                });

                it('will resolve the promise with the default transformed data', function() {
                    $httpBackend.flush();

                    var context = successCallback.calls[0].args[0].data;
                    var assetData = secondLevelData[0];
                    expect(context.length).toBe(secondLevelData.length);
                    expect(context[0].name).toBe(assetData.assetId);
                    expect(context[0].id).toBe(assetData.uri);
                    expect(context[0].classification).toBe(assetData.classification);
                    expect(context[0].parentId).toBe(assetData.parent);
                    expect(context[0].isOpenable).toBe(!(assetData.attributes && assetData.attributes.isNotOpenable));
                });

                it('will resolve the promise with empty string in meta.link', function() {
                    $httpBackend.flush();

                    var meta = successCallback.calls[0].args[0].meta;
                    expect(meta.link).toBe('');
                });
            });

            describe('when getting children with option link is empty', function() {
                var options = {link: ''};

                beforeEach(function() {
                    successCallback = jasmine.createSpy('successCallback');
                    errorCallback = jasmine.createSpy('errorCallback');

                    PredixAssetService.getAssetsByParentId(24, options).then(successCallback, errorCallback);
                    $rootScope.$apply();
                });

                it('will resolve the promise with url in meta.link', function() {
                    var result = successCallback.calls[0].args[0];
                    expect(result.meta.link).toBe('');
                    expect(result.data.length).toBe(0);
                });
            });

            describe('when response fails getting the children of a node', function() {

                beforeEach(function() {
                    successCallback = jasmine.createSpy('successCallback');
                    errorCallback = jasmine.createSpy('errorCallback');

                    $httpBackend.when('GET', '/sample-data/sample-asset-24.json').respond(500);
                    PredixAssetService.getAssetsByParentId(24).then(successCallback, errorCallback);
                    $httpBackend.flush();
                });

                it('reject promise if the GET fails', function() {
                    expect(errorCallback).toHaveBeenCalledWith('Error fetching asset with id 24');
                });
            });

        });
    });
});
