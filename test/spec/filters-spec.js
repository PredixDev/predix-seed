/* jshint unused:false */
define(['angular-mocks', 'app'], function (mocks, app) {
	'use strict';
	describe('app.filters:', function () {
		beforeEach(module('app.filters'));
		var slugify;

		beforeEach(function () {
			inject(function ($injector, $rootScope, slugifyFilter) {
				slugify = slugifyFilter;
			});
		});

		describe('slugifyFilter - Simple filter to slugify strings', function () {
			it('should turn a string into a slug', function () {
				var input, output;
				input = 'This is now a slug';
				output = 'This-is-now-a-slug';
				expect(slugify(input)).toEqual(output);
			});
			it('should turn a string into a lowercase slug', function () {
				var input, output;
				input = 'This is now a slug';
				output = 'this-is-now-a-slug';
				expect(slugify(input, true)).toEqual(output);
			});
		});
	});
});
