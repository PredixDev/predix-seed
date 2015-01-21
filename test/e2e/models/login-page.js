'use strict';

var LoginPage = function() {
    this.login = function() {
        browser.driver.findElement(by.id('username')).sendKeys('demo');
        browser.driver.findElement(by.id('password')).sendKeys('demo');
        browser.driver.findElement(by.id('loginButton')).click();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /home/.test(url);
            });
        }, 10000);
    };
};

module.exports = new LoginPage();
