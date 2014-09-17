'use strict';

var NavigationBar = (function(){
    var NavigationBar = function(){

    };

    NavigationBar.prototype.clickPage = function(pageName){
        var pageButton = element(by.linkText(pageName));
        pageButton.click();
    };

    NavigationBar.prototype.getActivePage = function(){

    };

    NavigationBar.prototype.isPageActive = function(pageName){

    };

    return NavigationBar;
})();


module.exports = NavigationBar;