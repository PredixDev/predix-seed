'use strict';

/**
 * Page Object pattern is a best practice, you create page objects based on the views of your application.
 * @constructor
 */
var Page = function() {
    this.getName = function() {
        var deferred = protractor.promise.defer();
        element(by.css('.page-header')).then(function(header) {
            header.getText().then(function(name) {
                deferred.fulfill(name);
            });
        });
        return deferred.promise;
    };
};

module.exports = new Page();
