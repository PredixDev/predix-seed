//Location of angular app.
var baseUrl = "http://localhost:9000";

//Handle creating screenshots.
var fs = require('fs');
function writeScreenShot(data, filename) {
	var stream = fs.createWriteStream('test-target/screenshots/' + filename);
	stream.write(buf = new Buffer(data, 'base64'));
	stream.end();
}

//The Page Object pattern is a best practice, you create page objects based on the views of your application.
var AppView = function() {
	this.name = element(by.binding("App.name"));
	//this.version = element(by.binding("App.version"));

	this.get = function() {
		browser.driver.get(baseUrl);
		//Because of manual bootstrap
		browser.driver.sleep(1500);
	};
};

/**
 * Example test spec that will load the welcome page and do some content checks.
 */
describe('14.2 Predix App', function() {
	var _appView;
	it('should have a title', function() {
		_appView = new AppView();
		_appView.get();
		browser.debugger();

		expect(_appView.name.getText()).toBeDefined();
//		expect(_appView.version.getText()).toEqual('1.0');
	});
});
