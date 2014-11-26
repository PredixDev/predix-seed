/**
 * About Page Object pattern is a best practice, you create page objects based on the views of your application.
 * @constructor
 */
var About = function () {
	'use strict';

	this.name = element(by.css('.page-header'));
	this.get = function () {
		browser.driver.get(browser.params.baseUrl + '/about');
		return browser.driver.sleep(1500);
	};
};
module.exports = About;
