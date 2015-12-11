/**
 * These are actual tests for the Predix Asset Service.  Take 'em of leave 'em. :)
 */
define(['angular', 'angular-mocks', 'app'], function(angular) {
    'use strict';

    describe('The Predix View Service', function() {
        var PredixViewService, $log, $httpBackend, q, successCallback, errorCallback, $rootScope;

        beforeEach(module('predixApp'));

        beforeEach(function() {
            angular.module('testModule', ['predixApp']);
            module('testModule');
        });

        beforeEach(inject(function(_PredixViewService_, _$httpBackend_, _$rootScope_, $q, _$log_) {
            PredixViewService = _PredixViewService_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            q = $q;
            $log = _$log_;
        }));

        describe('with predix view service', function() {

            describe('when getting asset by tag', function() {
                var decks = [
                    {
                        id: 1,
                        slug: 'px-deck',
                        title: 'sample deck'
                    },
                    {
                        id: 2,
                        slug: 'px-deck',
                        title: 'another sample deck'
                    }

                ];

                beforeEach(function() {
                    successCallback = jasmine.createSpy('successCallback');
                    errorCallback = jasmine.createSpy('errorCallback');

                    $httpBackend.when('GET', '/api/view-service/decks/tags?values=test&filter[order]=createTimeStamp ASC').respond(decks);
                    PredixViewService.getDecksByTags('test').then(successCallback, errorCallback);
                });

                it('will fetch deck by tag values', function() {
                    $httpBackend.expectGET('/api/view-service/decks/tags?values=test&filter[order]=createTimeStamp ASC');
                    $httpBackend.flush();
                });

                it('will resolve the promise with the deck', function() {
                    $httpBackend.flush();
                    var context = successCallback.calls[0].args[0];
                    var deckData = decks[0];

                    expect(context.length).toBe(decks.length);
                    expect(context[0].id).toBe(deckData.id);
                    expect(context[0].title).toBe(deckData.title);
                    expect(context[0].slug).toBe(deckData.slug);
                });
            });

            describe('when response fails getting asset root', function() {

                beforeEach(function() {
                    successCallback = jasmine.createSpy('successCallback');
                    errorCallback = jasmine.createSpy('errorCallback');

                    $httpBackend.when('GET', '/api/view-service/decks/tags?values=test&filter[order]=createTimeStamp ASC').respond(500);
                    PredixViewService.getDecksByTags('test').then(successCallback, errorCallback);
                });

                it('reject promise if the GET fails', function() {
                    $httpBackend.flush();
                    expect(errorCallback).toHaveBeenCalledWith('Error fetching decks with tags test');
                });
            });
        });
    });
});
