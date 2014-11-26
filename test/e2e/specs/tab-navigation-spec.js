'use strict';

var navigationBar = require('../models/navigation-bar');

xdescribe('The page navigation bar', function () {

	beforeEach(function () {
		navigationBar.clickPage('Home');
	});

	it('navigates to the appropriate url', function () {
		expect(browser.getLocationAbsUrl()).toContain('home');
	});

	it('shows the selected page', function () {
		expect(navigationBar.getActivePageName()).toBe('Home');
	});

	it('highlights the pages tab that is currently being viewed', function () {
		expect(navigationBar.isPageActive('Home')).toBeTruthy();
	});
});
