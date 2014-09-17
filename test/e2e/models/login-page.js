'use strict';

var LoginPage = (function() {
    var LoginPage = function() {

    };

    LoginPage.prototype.login = function(pageName) {
        browser.driver.findElement(by.id('username')).sendKeys('demo');
        browser.driver.findElement(by.id('password')).sendKeys('demo');
        browser.driver.findElement(by.id('loginButton')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /page-1/.test(url);
            });
        }, 3000);
    };

    return LoginPage;
})();


module.exports = LoginPage;