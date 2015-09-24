define(['angular-mocks', 'app'], function() {
    'use strict';

    describe('appVersion directive', function() {

        var $compile, $rootScope;

        // Load the predixApp module, which contains the directive
        beforeEach(module('predixApp'));

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(function(_$compile_, _$rootScope_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        /**
         * Sample test for the sample directive.
         *
         * For more info about testing your Angular code, see: https://docs.angularjs.org/guide/unit-testing
         */
        it('should render the version', function() {
            var element = $compile('<app-version></app-version>')($rootScope);
            $rootScope.$digest();
            expect(element.html()).toContain('Version 0.1');
        });

    });
});
