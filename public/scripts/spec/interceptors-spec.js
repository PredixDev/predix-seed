/* jshint unused:false, undef:false */
define(['angular-mocks', 'interceptors'], function(mocks, interceptors) {
    'use strict';
    describe('interceptors', function() {
        var scope, httpBackend, http, successCallback, errorCallback, $window;

        beforeEach(module('app.interceptors'));

        beforeEach(function () {
            $window = {location: { replace: jasmine.createSpy()} };

            module(function($provide) {
                $provide.value('$window', $window);
            });

            inject(function (_$httpBackend_, _$http_) {
                httpBackend = _$httpBackend_;
                http = _$http_;

                //to get around ui router issue https://github.com/angular-ui/ui-router/issues/212
                httpBackend.whenGET(/views.*/).respond(200, '');
            });
        });

        describe('When making $http request', function() {
            beforeEach(function() {
                httpBackend.when('GET', '/api').respond([{}, {}, {}]);
                http.get('/api');
            });

            it('should have X-Requested-With header', function() {
                httpBackend.whenGET('/api', undefined, function(headers) {
                    return headers['X-Requested-With'] === 'XMLHttpRequest';
                }).respond(201, '');
            });
        });

        describe('When getting 200 response', function() {
            beforeEach(function() {
                successCallback = jasmine.createSpy('successCallback');
                errorCallback = jasmine.createSpy('errorCallback');
                httpBackend.when('GET', '/api').respond(201, '');
                http.get('/api').then(successCallback, errorCallback);
                httpBackend.flush();
            });

            it('should pass through interceptor', function() {
                expect(successCallback).toHaveBeenCalled();
            });

        });

        describe('When server returns non 200 status', function() {
            beforeEach(function() {
                successCallback = jasmine.createSpy('successCallback');
                errorCallback = jasmine.createSpy('errorCallback');
                httpBackend.when('GET', '/api').respond(500, '');
                http.get('/api').then(successCallback, errorCallback);
            });

            it('should pass through interceptor', function() {
                httpBackend.flush();
                expect(errorCallback).toHaveBeenCalled();
            });
        });

        describe('When server returns 401 unauthorized status', function() {
            var _replace = null;
            beforeEach(function() {
                successCallback = jasmine.createSpy('successCallback');
                errorCallback = jasmine.createSpy('errorCallback');
                httpBackend.when('GET', '/api').respond(401, '');
                http.get('/api').then(successCallback, errorCallback);
                httpBackend.flush();
            });

            it('should redirect to /logout', function() {
                expect($window.location.replace).toHaveBeenCalledWith('/logout');
            });
        });

    });

});
