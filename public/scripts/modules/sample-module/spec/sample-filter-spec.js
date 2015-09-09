define(['angular-mocks', 'app'], function() {
    'use strict';

    describe('slugify filter', function() {

        beforeEach(module('predixApp'));

        var slugify;

        beforeEach(inject(function(slugifyFilter) {
            slugify = slugifyFilter;
        }));

        /**
         * Sample test for the sample slugify filter.
         *
         * For more info about testing your Angular code, see: https://docs.angularjs.org/guide/unit-testing
         */
        it('should turn a string into a slug', function() {
            var input, output;
            input = 'This is now a slug';
            output = 'This-is-now-a-slug';
            expect(slugify(input)).toEqual(output);
        });

        it('should turn a string into a lowercase slug', function() {
            var input, output;
            input = 'This is now a slug';
            output = 'this-is-now-a-slug';
            expect(slugify(input, true)).toEqual(output);
        });

    });

});
