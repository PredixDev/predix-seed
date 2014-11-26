/* jshint unused:false, undef:false */
define(['angular-mocks', 'interceptors'], function (mocks, interceptors) {
	'use strict';
	describe('interceptors', function () {
		beforeEach(module('app.interceptors'));

		var scope, httpBackend, http;
		beforeEach(inject(function ($httpBackend, $http) {
			httpBackend = $httpBackend;
			http = $http;
		}));

		describe('When making $http request', function () {
			beforeEach(function () {
				httpBackend.when('GET', '/api').respond([{}, {}, {}]);
				http.get('/api');
			});

			it('should have X-Requested-With header', function () {

				httpBackend.expectGET('/api', undefined, function (headers) {
					return headers['X-Requested-With'] === 'XMLHttpRequest';
				}).respond(201, '');

				httpBackend.flush();
			});

			xit('should intercept session timeout', function () {

			});
		});

		describe('When getting 200 response', function () {
			var successCallback, errorCallback;

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

		describe('When server returns non 200 status', function () {
			beforeEach(function () {
				successCallback = jasmine.createSpy('successCallback');
				errorCallback = jasmine.createSpy('errorCallback');
				httpBackend.when('GET', '/api').respond(500, '');
				http.get('/api').then(successCallback, errorCallback);
			});

			it('should pass through interceptor', function () {
				httpBackend.flush();
				expect(errorCallback).toHaveBeenCalled();
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

			it('should redirect to /logout', function () {
				httpBackend.flush();
				expect(window.location.replace).toHaveBeenCalledWith('/logout');
			});

			afterEach(function () {
				window.location.replace = _replace;
			});

		});

	});

});
