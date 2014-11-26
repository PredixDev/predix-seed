exports.config = {
	baseUrl: 'http://localhost:9000',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['test/e2e/specs/*.js'],
	seleniumserverjar: 'node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
	chromedriver: 'node_modules/protractor/selenium/chromedriver',
	seleniumargs: ['-dwebdriver.chrome.driver="node_modules/protractor/selenium/chromedriver"'],
	capabilities: {
		'browserName': 'chrome'
	},
	jasmineNodeOpts: {
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 600000
	},
	params: {
		baseUrl: 'http://localhost:9000/#'
	},
	onPrepare: function () {
		browser.manage().window().setSize(1024, 768);

		//TODO If authentication is enabled.
		//require('./test/e2e/models/login-page').login();

	},
	onComplete: function () {
		browser.driver.quit();
	}
};
