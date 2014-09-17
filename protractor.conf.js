exports.config = {
    baseUrl: 'http://localhost:9000',
    seleniumAddress: 'http://localhost:4444/wd/hub',
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