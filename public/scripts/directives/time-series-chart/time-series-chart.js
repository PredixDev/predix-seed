/*
predix-workbench - 14.1.0 - Tuesday, August 26th, 2014, 7:42:11 PM 

Copyright © 2012-2014 General Electric Company. All rights reserved. 
The copyright to the computer software herein is the property of General Electric Company. The software may be used and/or copied only 
with the written permission of General Electric Company or in accordance with the terms and conditions stipulated in the agreement/contract under which the software has been supplied.
*/
"use strict";

define([ "vruntime", "directives-module", "line-chart" ], function(vRuntime, directives) {
    var TimeSeriesChart = vRuntime.widget.BaseDirective.extend({
        scope: {
            title: "@",
            subtitle: "@",
            xAxisTitle: "@",
            yAxisTitle: "@",
            xAxisKey: "@",
            yAxisKey: "@",
            seriesKey: "@",
            maxNumPoints: "@",
            data: "@",
            uuid: "@"
        },
        template: '<div id="widget-{{$id}}" style="width:100%;margin: 0 auto"><div class="time-series-chart" style="width:100%;margin: 0 auto"></div></div>',
        vLink: function(scope, element, attrs) {
            this._super(scope, element, attrs);
            var self = this, chartConfig = this.buildConfig(scope);
            scope.chart = new Highcharts.Chart(chartConfig), scope.numPointsDisplayed = {}, 
            scope.$watch("data", function(newData) {
                self.dataChanged.call(self, scope, newData);
            }, !0);
        },
        buildConfig: function(scope) {
            var config = {
                chart: {
                    type: "spline",
                    renderTo: scope.vElement.find(".time-series-chart").get(0)
                },
                title: {
                    text: scope.title
                },
                subtitle: {
                    text: scope.subtitle
                },
                xAxis: {
                    type: "datetime",
                    tickPixelInterval: 150,
                    title: {
                        text: scope.xAxisTitle
                    }
                },
                yAxis: {
                    title: {
                        text: scope.yAxisTitle
                    }
                },
                series: []
            };
            return config;
        },
        addPoint: function(scope, chartSeries, seriesId, point) {
            var isScrolling = !0;
            scope.maxNumPoints > scope.numPointsDisplayed[seriesId] && (isScrolling = !1, scope.numPointsDisplayed[seriesId]++), 
            chartSeries.addPoint(point, !0, isScrolling);
        },
        addSeries: function(scope, seriesId, point) {
            var newseries = {
                id: seriesId,
                name: seriesId,
                data: [ point ]
            };
            scope.chart.addSeries(newseries), scope.numPointsDisplayed[seriesId] = 1;
        },
        dataChanged: function(scope, newData) {
            var dataPoints;
            try {
                "" !== newData && (dataPoints = angular.fromJson(newData));
            } catch (e) {
                throw new Error("timeSeriesChart.handleData() - " + e.message || e);
            }
            for (var index in dataPoints) {
                var x, y, seriesId, dataPoint, chartSeries, point;
                dataPoint = dataPoints[index], seriesId = dataPoint[scope.seriesKey], x = dataPoint[scope.xAxisKey], 
                y = dataPoint[scope.yAxisKey], null != seriesId && (chartSeries = scope.chart.get(seriesId), 
                point = [ x, y ], chartSeries ? this.addPoint(scope, chartSeries, seriesId, point) : this.addSeries(scope, seriesId, point));
            }
            scope.chart.redraw();
        },
        vDestroy: function(scope) {
            this._super(scope), scope.chart && scope.chart.destroy(), scope.vElement.remove();
        }
    });
    return directives.directive("timeSeriesChart", function() {
        return new TimeSeriesChart();
    }), TimeSeriesChart;
});