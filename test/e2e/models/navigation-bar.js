'use strict';

var NavigationBar = (function() {
    var NavigationBar = function() {

    };

    NavigationBar.prototype.clickPage = function(pageName) {
        var pageButton = element(by.linkText(pageName));
        pageButton.click();
    };

    NavigationBar.prototype.getActivePageName = function() {
        var activePage = element(by.css('li.active'));
        return activePage.getText();
    };

    NavigationBar.prototype.isPageActive = function(pageName) {
        return NavigationBar.prototype.getActivePageName()
            .then(function(activePageName) {
                return activePageName === pageName;
            });
    };

    return NavigationBar;
})();


module.exports = NavigationBar;