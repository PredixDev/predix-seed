/**
 * Here we need to import angular-mocks becuase it has the methods for testing and loading modules.
 * angular is already added to the angular-mocks deps config so angular will be included as well.
 *
 * The second requirement is the application, since inside app.js we included a requirement to
 * app.filters it will be loaded (file) so we can create a new instance of the app.filters module
 * and then test those filter individually.
 */
define([ 'angular-mocks', 'app' ], function(mocks, app) {
	describe('app.filters:', function () {
		beforeEach(module('app.filters'));
		var slugify;


		beforeEach(function () {
			inject(function ($injector, $rootScope, slugifyFilter) {
				slugify = slugifyFilter;
			});
		});

		describe('sampleFilter - The test case for the filter.', function () {
			it('should meet [blank] expectation.', function(){

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