'use strict';

var LoginPage = (function(){
    var LoginPage = function(){

    };

    LoginPage.prototype.login = function(){
        element(by.id('username')).sendKeys('admin');
        element(by.id('password')).sendKeys('admin1234');
        element(by.id('loginButton')).click();
    };

    return LoginPage;
})();


module.exports = LoginPage;