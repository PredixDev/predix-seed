'use strict';

var navigationBar = require('../models/navigation-bar');
var timeseries = require('../models/timeseries.js');
var datagrid = require('../models/datagrid');

describe('Components Page', function() {

    beforeEach(function() {
        navigationBar.clickPage('Components');
    });

    it('navigates to the appropriate url', function() {
        expect(browser.getLocationAbsUrl()).toContain('components');
    });

    it('shows the selected page', function() {
        expect(navigationBar.getActivePageName()).toBe('Components');
    });

    it('highlights the pages tab that is currently being viewed', function() {
        expect(navigationBar.isPageActive('Components')).toBeTruthy();
    });
});

describe('Components Page', function() {

    beforeEach(function() {
        navigationBar.clickPage('Time series');
    });

    it('navigates to the appropriate url', function() {
        expect(browser.getLocationAbsUrl()).toContain('timeSeries');
    });

    it('renders a time series', function() {
        element(by.css('.time-series-chart')).then(function(widget) {
            timeseries.getContent(widget).then(function(content) {
                expect(content.getXAxisTitle()).toEqual([]);
                expect(content.getYAxisTitle()).toEqual([]);
                expect(content.hasYAxisLabels()).not.toEqual(['']);
                expect(content.numSeries()).toEqual(2); // 1 series on the chart + navigator
                expect(content.getSeriesLabels()).toEqual(['Winter 1970-1971']);
            });
        });
    });

    it('renders a data grid', function() {
        element(by.css('.sample-datagrid')).then(function(widget) {
            datagrid.getContent(widget).then(function(content) {
                expect(content.getTitle()).toEqual('Datagrid');
                expect(content.getHeaders()).toEqual('ID Timestamp Quality Value');
                expect(content.getNumRows()).toEqual(6);
                expect(content.getRow(0)).toContain('Good');
                expect(content.getRow(0)).toContain('1432');
                expect(content.getRow(1)).toContain('Good');
                expect(content.getRow(1)).toContain('1857');
                expect(content.getRow(2)).toContain('Poor');
                expect(content.getRow(2)).toContain('720');
                expect(content.getRow(3)).toContain('Excellent');
                expect(content.getRow(3)).toContain('2600');
                expect(content.getRow(4)).toContain('Poor');
                expect(content.getRow(4)).toContain('530');
                expect(content.getRow(5)).toContain('Excellent');
                expect(content.getRow(5)).toContain('2134');
            });
        });
    });
});
