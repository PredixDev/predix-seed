'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */
describe('A Predix App', function() {

    var CommonTests = require('./CommonTests');
    var commonTests = new CommonTests('static-data-1', 'Static Data 1');

    //navigate to the target page
    beforeEach(function () {
        commonTests.navigate();
    });

    //do common tests
    commonTests.applicationNameAndNavTests();
    commonTests.pageNameAndNavTests();

    describe('should contains static pie chart', function () {
        it('should contains title and Subtitle', function () {
            var titleElements = element.all(by.css('#module-0 .module-body text'));
            expect(titleElements.get(0).getText()).toEqual('Title');
            expect(titleElements.get(1).getText()).toEqual('Subtitle');
        });

        it('should contains legend', function () {
            var ledgendElements = element.all(by.css('#module-0 .module-body .highcharts-legend tspan'));
            expect(ledgendElements.get(0).getText()).toEqual('Bananas');
            expect(ledgendElements.get(1).getText()).toEqual('Oranges');
            expect(ledgendElements.get(2).getText()).toEqual('Apples');
        });
    });

});