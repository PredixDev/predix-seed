/**
 * Home Page Object pattern is a best practice, you create page objects based on the views of your application.
 * @constructor
 */
var Home = function() {
	this.name = element(by.binding('tab.label'));
	this.get = function() {
		return browser.driver.get('#/home');
	};
};
