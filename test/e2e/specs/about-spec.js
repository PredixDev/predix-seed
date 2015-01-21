'use strict';

var navigationBar = require('../models/navigation-bar');
var page = require('../models/page');

describe('About Page', function() {

    beforeEach(function() {
        navigationBar.clickPage('About');
    });

    it('should have a title', function() {
        expect(page.getName()).toEqual('About');
    });

    it('navigates to the appropriate url', function() {
        expect(browser.getLocationAbsUrl()).toContain('about');
    });

    it('shows the selected page', function() {
        expect(navigationBar.getActivePageName()).toBe('About');
    });

    it('highlights the pages tab that is currently being viewed', function() {
        expect(navigationBar.isPageActive('About')).toBeTruthy();
    });
});
