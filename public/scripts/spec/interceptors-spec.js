define(['angular-mocks', 'interceptors'], function (mocks, interceptors) {
    'use strict';
    describe('interceptors', function () {
        beforeEach(module('app.interceptors'));

        var  httpBackend, http, Endpoint, successCallback, errorCallback;
        beforeEach(inject(function ($httpBackend, $http, _Endpoint_) {
            httpBackend = $httpBackend;
            http = $http;
            Endpoint = _Endpoint_;
            spyOn(Endpoint, 'redirect').andCallThrough();
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

        describe('When server returns 401 unauthorized status', function () {
            var _replace = null;
            beforeEach(function () {
                successCallback = jasmine.createSpy('successCallback');
                errorCallback = jasmine.createSpy('errorCallback');
                httpBackend.when('GET', '/api').respond(401, '');
                http.get('/api').then(successCallback, errorCallback);
                _replace = window.location.replace;
                spyOn(window.location, 'replace');
            });

            it('should redirect to the UAA logout page', function () {
                httpBackend.flush();
                expect(Endpoint.redirect).toHaveBeenCalled();
            });
        });
    });
});
