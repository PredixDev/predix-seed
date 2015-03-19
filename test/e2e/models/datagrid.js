'use strict';

var Datagrid = function() {

    this.clickColumn = function(widget, columnIndex) {
        var deferred = protractor.promise.defer();

        widget.all(by.css('thead th')).then(function(headers) {
            headers[columnIndex].click();
            deferred.fulfill();
        });

        return deferred.promise;
    };

    this.searchFor = function(widget, searchText) {
        var deferred = protractor.promise.defer();

        widget.element(by.css('input.search-query')).then(function(searchBox) {
            searchBox.clear();
            searchBox.sendKeys(searchText);
            deferred.fulfill();
        });

        return deferred.promise;
    };

    this.getArrow = function(widget, columnIndex) {
        var deferred = protractor.promise.defer();

        widget.all(by.css('thead th')).then(function(columnHeaders) {
            columnHeaders[columnIndex].getAttribute('class').then(function(classes) {
                if (classes.indexOf('sorting_asc') !== -1) {
                    deferred.fulfill('up');
                }
                else if (classes.indexOf('sorting_desc') !== -1) {
                    deferred.fulfill('down');
                }
                else {
                    deferred.fulfill('');
                }
            });
        });

        return deferred.promise;
    };

    this.changeNumEntries = function(number) {
        var deferred = protractor.promise.defer();

        element(by.cssContainingText('.table-controls select[ng-model=\'itemsPerPage\'] option', number)).then(function(dropdownOption) {
            dropdownOption.click();
            deferred.fulfill();
        });

        return deferred.promise;
    };

    this.clickPagination = function(widget, number) {
        var deferred = protractor.promise.defer();
        widget.element(by.cssContainingText('.pagination li a', number)).then(function(btn) {
            btn.click().then(function() {
                deferred.fulfill();
            });
        });
        return deferred.promise;
    };

    var clickByCss = function(widget, selector) {
        var deferred = protractor.promise.defer();
        widget.element(by.css(selector)).then(function(btn) {
            btn.click().then(function() {
                deferred.fulfill();
            });
        });
        return deferred.promise;
    };

    this.clickForward = function(widget) {
        return clickByCss(widget, '.pagination i.icon-arrow-right');
    };

    this.clickBackward = function(widget) {
        return clickByCss(widget, '.pagination i.icon-arrow-left');
    };

    var isRightEnabled = function(widget) {
        var deferred = protractor.promise.defer();
        widget.all(by.css('.pagination li')).then(function(buttons) {
            buttons[buttons.length - 1].getAttribute('class').then(function(classes) {
                var isEnabled = true;
                if (classes.indexOf('disabled') > -1) {
                    isEnabled = false;
                }
                deferred.fulfill(isEnabled);
            });
        });
        return deferred.promise;
    };

    var isLeftEnabled = function(widget) {
        var deferred = protractor.promise.defer();
        widget.all(by.css('.pagination li')).then(function(buttons) {
            buttons[0].getAttribute('class').then(function(classes) {
                var isEnabled = true;
                if (classes.indexOf('disabled') > -1) {
                    isEnabled = false;
                }
                deferred.fulfill(isEnabled);
            });
        });
        return deferred.promise;
    };

    var getSelected = function(widget) {
        var deferred = protractor.promise.defer();
        widget.element(by.css('.pagination li.active')).then(function(activeElt) {
            activeElt.getText().then(function(text) {
                deferred.fulfill(text);
            });
        });
        return deferred.promise;
    };

    var getAll = function(widget) {
        return getAllText('.pagination li', widget);
    };

    this.checkPagination = function(widget) {
        var deferred = protractor.promise.defer();

        var content = {};

        isRightEnabled(widget).then(function(isForwardEnabled) {
            isLeftEnabled(widget).then(function(isBackwardEnabled) {
                getSelected(widget).then(function(selected) {
                    getAll(widget).then(function(all) {

                        content.isForwardEnabled = function() {
                            return isForwardEnabled;
                        };

                        content.isBackwardEnabled = function() {
                            return isBackwardEnabled;
                        };

                        content.getSelected = function() {
                            return selected;
                        };

                        content.getAll = function() {
                            return all;
                        };

                        deferred.fulfill(content);
                    });
                });
            });
        });
        return deferred.promise;
    };

    var getTitle = function(widget) {
        return getAllText('.datagrid-title', widget);
    };

    var getHeaders = function(widget) {
        return getAllText('table thead', widget);
    };

    var getRows = function(widget) {
        return getAllText('table tbody tr', widget);
    };

    var getAllText = function(theCss, widget) {
        var deferred = protractor.promise.defer();
        widget.all(by.css(theCss))
            .map(function(label) {
                return label.getText();
            })
            .then(function(allText) {
                deferred.fulfill(allText);
            });
        return deferred.promise;
    };

    this.getContent = function(widget) {
        var deferred = protractor.promise.defer();

        var content = {};

        getHeaders(widget).then(function(headers) {
            getRows(widget).then(function(rows) {
                getTitle(widget).then(function(title) {
                    content.getTitle = function() {
                        if (title.length <= 0) {
                            return '';
                        }
                        else {
                            return title[0];
                        }
                    };

                    content.getHeaders = function() {
                        if (headers.length <= 0) {
                            return '';
                        }
                        else {
                            return headers[0];
                        }
                    };

                    content.getNumRows = function() {
                        return rows.length;
                    };

                    content.getRow = function(index) {
                        return rows[index];
                    };

                    deferred.fulfill(content);
                });
            });
        });
        return deferred.promise;
    };
};

module.exports = new Datagrid();
