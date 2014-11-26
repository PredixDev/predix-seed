/**
 * Home Page Object pattern is a best practice, you create page objects based on the views of your application.
 * @constructor
 */
var Home = function () {
	'use strict';
	this.name = element(by.css('.page-header'));
	this.get = function () {
		browser.driver.get(browser.params.baseUrl + '/home');
		return browser.driver.sleep(2000);
	};
};
module.exports = Home;
