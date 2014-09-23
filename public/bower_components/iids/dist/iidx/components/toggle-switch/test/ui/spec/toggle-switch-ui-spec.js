'use strict';

/*
 * Copyright (c) 2013 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

/**
 * @class UI test spec for toggle-switch.
 *
 * @author Jeff Reichenberg
 *
 * TODO: make a selenium "PageObject out of the toggle switch to provide an interface to expected behavior
 */

var webdriver = require('test-dependencies/node_modules/selenium-webdriver'),
    mocha = require('test-dependencies/node_modules/selenium-webdriver/testing'),
    chai = require('chai'),
    webdriverFactory = require('test-dependencies').webdriverFactory;

var driver;

before(function() {
    driver = webdriverFactory.setup();
});

after(function() {
    webdriverFactory.teardown();
});

describe('Instancing Toggle Switch from provided DOM data attribute', function () {

    before(function(done) {
        driver.get('/test/ui/fixtures/index.html').then(function() {//nav to our test fixture.  Can pull this up outside of tests with "$ http-server" and then http://localhost:8080/test/ui/fixtures/index.html

            driver.wait(function() {// explicit wait: until 1st toggle-switch is auto-instanced in the DOM
                return driver.isElementPresent(webdriver.By.css(".has-switch"));
            }, 2000);

            done();
        }, done);
    });

    it('should automatically instance a toggle button from the expected DOM', function (done) {
        driver.findElement(webdriver.By.css(".has-switch")).then(function(instancedToggleSwitchRootElement) {
            chai.expect(instancedToggleSwitchRootElement).not.to.be.null;
            done();
        }, done);
    });
});

describe('Instancing Toggle Switch from dynamically-added DOM', function () {

    it('should not automatically instance a toggle button without the expected DOM', function (done) {
        //verify the last input checkbox not auto-instanced as a toggle switch b/c it does not have the expected DOM
        driver.isElementPresent(webdriver.By.xpath("//input[last()]/ancestor::div[@class='has-switch']")).then(function (isWrappedBySwitch) {
            chai.expect(isWrappedBySwitch).to.be.false;
            done();
        }, done);
    });

    it('should be instanced via JavaScript', function (done) {
        //verify the last input checkbox gets instanced as a toggle switch when called via JavaScript
        driver.executeScript("$('input').toggleSwitch();").then(function () {
            driver.isElementPresent(webdriver.By.xpath("//input[last()]/ancestor::div[contains(@class, 'has-switch')]")).then(function (isWrappedBySwitch) {
                chai.expect(isWrappedBySwitch).to.be.true;
                done();
            }, done);
        }, done);
    });
});

describe('Underlying form field interactions', function () {

    it('should set the "checked" property of the checkbox inside the toggle button', function (done) {
        //programatically set the state of the toggle switch and check underlying checkboxes "checked" state
        driver.executeScript("$('input').eq(0).toggleSwitch().$switch.setState(true);").then(function (ret) {
            driver.findElement(webdriver.By.xpath("//input[1]")).then(function (checkbox) {
                    checkbox.isSelected().then(function (checked) {
                        chai.expect(checked).to.be.true;
                        done();
                    }, done);
            }, done);
        }, done);
    });

    it('should unset the "checked" property of the checkbox inside the toggle button', function (done) {
        //programatically set the state of the toggle switch and check underlying checkboxes "checked" state
        driver.executeScript("$('input').eq(0).toggleSwitch().$switch.setState(false);").then(function () {
            driver.findElement(webdriver.By.xpath("//input[1]")).then(function (checkbox) {
                    checkbox.isSelected().then(function (checked) {
                        chai.expect(checked).to.be.false;
                        done();
                    }, done);
            }, done);
        }, done);
    });
});
