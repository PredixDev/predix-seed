/**
 * About Page Object pattern is a best practice, you create page objects based on the views of your application.
 * @constructor
 */
var About = function () {
	'use strict';
	this.name = element(by.binding('tab.label'));
	this.get = function () {
		return browser.driver.get('#/about');
	};
};
module.exports = About;
