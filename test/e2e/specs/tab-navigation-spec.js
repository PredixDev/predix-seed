'use strict';

var navigationBar = require('../models/navigation-bar');

describe('The page navigation bar', function() {

    beforeEach(function() {
        navigationBar.clickPage('Page 2');
    });

    it('navigates to the appropriate url', function() {
        expect(browser.getLocationAbsUrl()).toContain('page-2');
    });

    it('shows the selected page', function() {
        expect(navigationBar.getActivePageName()).toBe('Page 2');
    });

    it('highlights the page\'s tab that is currently being viewed', function() {
        expect(navigationBar.isPageActive('Page 2')).toBeTruthy();
    });
});