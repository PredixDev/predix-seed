/* jshint unused:false, undef:false */
define(['angular-mocks', 'interceptors'], function (mocks, interceptors) {
    'use strict';
    describe('interceptors', function () {
        beforeEach(module('app.interceptors'));

        var  httpBackend, http, successCallback, errorCallback;
        beforeEach(inject(function ($httpBackend, $http) {
            httpBackend = $httpBackend;
            http = $http;
        }));

        describe('When getting 200 response', function () {
            beforeEach(function () {
                successCallback = jasmine.createSpy('successCallback');
                errorCallback = jasmine.createSpy('errorCallback');
                httpBackend.when('GET', '/api').respond(201, '');
                http.get('/api').then(successCallback, errorCallback);
            });

            it('should pass through interceptor', function () {
                httpBackend.flush();
                expect(successCallback).toHaveBeenCalled();
            });

        });
    });
});
