'use strict';

var NavigationBar = function() {
    this.clickPage = function(pageName) {
        var pageButton = element(by.linkText(pageName));
        pageButton.click();
        browser.driver.wait(function() {
            return element(by.id(pageName.toLowerCase().replace(' ', '-') + '-page')).isPresent();
        }, 3000);
    };

    this.getActivePageName = function() {
        var activePage = element(by.css('li.active'));
        return activePage.getText();
    };

    this.isPageActive = function(pageName) {
        return this.getActivePageName()
            .then(function(activePageName) {
                return activePageName === pageName;
            });
    };
};

module.exports = new NavigationBar();
