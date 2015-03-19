exports.config = {
    baseUrl: 'http://localhost:9000',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/e2e/specs/**/*.js'],
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
    onPrepare: function() {
        browser.manage().window().setSize(1024, 768);

        browser.driver.get(browser.params.baseUrl);

        //If authentication is enabled - use this instead of the wait below
        //require('./test/e2e/models/login-page').login();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                //if redirected to home successfully, start the test
                return /home/.test(url);
            });
        }, 6000);
    },
    onComplete: function() {
        browser.driver.quit();
    }
};
