define(['angular-mocks', 'app'], function() {
    'use strict';

    describe('version service', function() {

        beforeEach(module('predixApp'));

        var version;

        beforeEach(inject(function (_version_) {
            version = _version_;
        }));

        /**
         * Sample test for the sample version service.
         *
         * For more info about testing your Angular code, see: https://docs.angularjs.org/guide/unit-testing
         */
        it('should return the version', function() {
            expect(version).toBe('0.1');
        });
    });
});
