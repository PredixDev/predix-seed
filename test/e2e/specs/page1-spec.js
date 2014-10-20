'use strict';

var navigationBar = require('../models/navigation-bar');

describe('The page navigation bar', function() {

    beforeEach(function() {
        navigationBar.clickPage('Page 1');
    });

    it('navigates to the appropriate url', function() {
        expect(browser.getLocationAbsUrl()).toContain('page-1');
    });
 
   it('verify the highchart-1 on the page-1', function() {
        expect(browser.getLocationAbsUrl()).toContain('page-1');
        expect(element(by.id("page-1-module-1-title")).getText()).toBe('Module');
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("text.highcharts-title tspan")).isPresent()).toBe(true);
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("text.highcharts-title tspan")).getText()).toBe('Static Directive Chart');
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("text.highcharts-subtitle tspan")).getText()).toBe('Subtitle');
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-legend-item:nth-of-type(1) text tspan")).getText()).toBe('A');
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-legend-item:nth-of-type(2) text tspan")).getText()).toBe('B');
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-legend-item:nth-of-type(3) text tspan")).getText()).toBe('C');


        expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-legend-item:nth-of-type(1) path")).getAttribute("stroke")).
        toBe('#005CB9');
        
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-legend-item:nth-of-type(2) path")).getAttribute("stroke")).
        toBe('#ff9821');
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-legend-item:nth-of-type(3) path")).getAttribute("stroke")).
        toBe('#46ad00');
        
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("text.highcharts-xaxis-title")).getText()).toBe("Time");

        //Verify the chart lines 
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-series:nth-of-type(1)")).isPresent()).toBe(true);
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-series:nth-of-type(3)")).isPresent()).toBe(true);
        expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-series:nth-of-type(5)")).isPresent()).toBe(true);

  expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-series-group g:nth-of-type(1) path")).isPresent()).toBe(true);
      //  expect(element(by.css("div#page-1-module-1-body")).element(by.css("g.highcharts-series-group g:nth-of-type(1) path")).getAttribute("visibility")).
       // toBe('hidden');

       // browser.actions().mouseMove(element(by.css(""))).perform();


  
   //     expect(element(by.id("bar2id")).element(by.css("text.num")).getText()).toBe('2.024');
    });
    // it('shows the selected page', function() {
    //     expect(navigationBar.getActivePageName()).toBe('Page 2');
    // });

    // it('highlights the page\'s tab that is currently being viewed', function() {
    //     expect(navigationBar.isPageActive('Page 2')).toBeTruthy();
    // });


});