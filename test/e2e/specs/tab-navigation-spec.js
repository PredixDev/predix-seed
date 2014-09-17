'use strict';

var NavigationBar = require('../pages/navigation-bar');
var LoginPage = require('../pages/login-page.js');

var navigationBar = new NavigationBar();
var loginPage = new LoginPage();

console.log('##################bill wuz here');

browser.get('http://localhost:9000');

console.log('logging in');
loginPage.login();
console.log('clicked log in button');

describe('The page navigation bar', function() {

    it('navigates to the clicked tab', function() {
        navigationBar.clickPage('Page 2');
    });

    it('highlights the page that is currently being viewed', function() {

    });
});