'use strict';

var TimeSeries = function() {

    var getTitle = function(widget) {
        return getAllText('.highcharts-title', widget);
    };

    var getSubtitle = function(widget) {
        return getAllText('.highcharts-subtitle', widget);
    };

    var getXAxisTitle = function(widget) {
        return getAllText('.highcharts-xaxis-title', widget);
    };

    var getYAxisTitle = function(widget) {
        return getAllText('.highcharts-yaxis-title', widget);
    };

    var getYAxisLabels = function(widget) {
        return getAllText('.highcharts-yaxis-labels', widget);
    };

    var getSeries = function(widget) {
        var deferred = protractor.promise.defer();
        widget.all(by.css('.highcharts-series'))
            .then(function(series) {
                deferred.fulfill(series);
            });
        return deferred.promise;
    };

    var getSeriesLabels = function(widget) {
        return getAllText('.highcharts-legend-item', widget);
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

        getTitle(widget).then(function(title) {
            getSubtitle(widget).then(function(subtitle) {
                getXAxisTitle(widget).then(function(xAxisTitle) {
                    getYAxisTitle(widget).then(function(yAxisTitle) {
                        getSeries(widget).then(function(series) {
                            getYAxisLabels(widget).then(function(yAxisLabels) {
                                getSeriesLabels(widget).then(function(labels) {

                                    content.getTitle = function() {
                                        return title;
                                    };

                                    content.getSubtitle = function() {
                                        return subtitle;
                                    };

                                    content.getXAxisTitle = function() {
                                        return xAxisTitle;
                                    };

                                    content.getYAxisTitle = function() {
                                        return yAxisTitle;
                                    };

                                    content.hasYAxisLabels = function() {
                                        return yAxisLabels;
                                    };

                                    content.numSeries = function() {
                                        return series.length;
                                    };

                                    content.getSeriesLabels = function() {
                                        return labels;
                                    };

                                    deferred.fulfill(content);
                                });
                            });
                        });
                    });
                });
            });
        });

        return deferred.promise;

    };

};

module.exports = new TimeSeries();
