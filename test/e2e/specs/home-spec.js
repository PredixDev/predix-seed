'use strict';

var navigationBar = require('../models/navigation-bar');
var page = require('../models/page');

describe('Home Page', function() {

    beforeEach(function() {
        navigationBar.clickPage('Home');
    });

    it('should have a title', function() {
        expect(page.getName()).toEqual('Home');
    });

    it('navigates to the appropriate url', function() {
        expect(browser.getLocationAbsUrl()).toContain('home');
    });

    it('shows the selected page', function() {
        expect(navigationBar.getActivePageName()).toBe('Home');
    });

    it('highlights the pages tab that is currently being viewed', function() {
        expect(navigationBar.isPageActive('Home')).toBeTruthy();
    });
});
