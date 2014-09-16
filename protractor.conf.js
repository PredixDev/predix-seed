/**
 * Protractor Configuration file
 */
exports.config = {
	baseUrl: 'http://localhost:9000',
	seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
    chromeDriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver',
    seleniumArgs: ['-Dwebdriver.chrome.driver="/usr/local/lib/node_modules/protractor/selenium/chromedriver"'],
    	//seleniumServerJar: 'test/selenium/selenium-server-standalone-2.37.0.jar',
	//chromeDriver: 'test/selenium/chromedriver',
	// Spec patterns are relative to the location of the spec file. They may include glob patterns.
	specs: [ 'test/e2e/*.js' ],
	capabilities: {
		// should be able to omit this property if phantomjs installed globally
		// 'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs'
		'browserName': 'chrome'
		// 'browserName' : 'phantomjs'
	},

	/**
	 * The params object will be passed directly to the protractor instance, and can be accessed from your test. It is
	 * an arbitrary object and can contain anything you may need in your test. This can be changed via the command line
	 * as: --params.login.user 'Joe'
	 */
	params: {
		login: {
			user: 'admin',
			password: 'admin1234'
		}
	},
	jasmineNodeOpts: {
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 30000
	},
	onPrepare: function () {
		//jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('test-target/', true, true));
	}
};
