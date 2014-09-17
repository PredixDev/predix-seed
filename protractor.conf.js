exports.config = {
    baseUrl: 'http://localhost:9000',
    seleniumAddress: 'http://localhost:4444/wd/hub',
//    seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
//    chromeDriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver',
//    seleniumArgs: ['-Dwebdriver.chrome.driver="/usr/local/lib/node_modules/protractor/selenium/chromedriver"'],

    // Spec patterns are relative to the location of the spec file. They may include glob patterns.
    specs: [ 'test/e2e/specs/*.js' ],

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
        testBoostrapper();
    }
};

var testBoostrapper = function() {
    browser.driver.get('http://localhost:9000');

    browser.driver.findElement(by.id('username')).sendKeys('demo');
    browser.driver.findElement(by.id('password')).sendKeys('demo');
    browser.driver.findElement(by.id('loginButton')).click();

    browser.driver.sleep(browser.params.wait);
    browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            return /page-1/.test(url);
        });
    }, 3000);

};