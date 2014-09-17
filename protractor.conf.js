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
        browser.driver.get('http://localhost:9000');
    },
    onComplete: function() {
        browser.driver.quit();
    }
};