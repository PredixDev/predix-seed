exports.config = {
    baseUrl: 'http://localhost:9000',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [ 'test/e2e/specs/*.js' ],
    seleniumserverjar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
    chromedriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver',
    seleniumargs: ['-dwebdriver.chrome.driver="/usr/local/lib/node_modules/protractor/selenium/chromedriver"'],
    capabilities: {
        'browserName': 'chrome'
    },
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    },
    onPrepare: function() {
        browser.driver.get('http://localhost:9000');
        browser.manage().window().setSize(1024, 768);
        require('./test/e2e/models/login-page').login();
    },
    onComplete: function() {
        browser.driver.quit();
    }
};