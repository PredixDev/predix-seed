define(["jquery", "widgets/common/highcharts-iids-widget", "widgets/common/highcharts-data-mapper","line-chart", "json!./series-chart.schema.json", "text!./series-chart.tmpl"], function($, HighchartsIIDSWidget, HighchartsDataMapper, LineChart, Schema, Template) {
    
    var SeriesChart = HighchartsIIDSWidget.extend({
        schema: Schema,
        template: Template,
        _getChartOptions : function() {
            
            var seriesAndCategories = this._getSeriesAndCategories();
            var seriesArray = seriesAndCategories.series;
            var categoriesArray = seriesAndCategories.categories;
            
            var highchartType = this._getHighchartType();
            
            var chartOptions = {
                    chart : {
                        renderTo : this.$view.children().get(0),
                        type : highchartType
                    },
                    title : {
                        text : this.title()
                    },
                    subtitle : {
                        text : this.subtitle()
                    },
                    xAxis : {
                        title : {
                            text : this.xAxisTitle()
                        },
                        startOnTick: true,
                        endOnTick: true
                    },
                    yAxis : {
                        title : {
                            text : this.yAxisTitle()
                        }
                    },
                    series : []
                };
            
            if(categoriesArray.length > 0) {
                
                var categoryXAxis = {
                        xAxis : {
                            title : {
                                text : this.xAxisTitle()
                            },
                            categories: []
                        }
                };
                $.extend(chartOptions, categoryXAxis);
            }
            
            return chartOptions;
            
        },
        
        _getHighchartType : function() {
            var chartType = this.chartType();
            if(chartType === 'Vertical Bar') {
                chartType = 'column';
            } else if(chartType == 'Horizontal Bar') {
                chartType = 'bar';
            } else {
                chartType = chartType.toLowerCase();
            }
            
            return chartType;
        },
        
        _getSeriesAndCategories : function() {
            
            var options = {
                "xAxisKey" : this.xAxisKey(),
                "yAxisKey" : this.yAxisKey(),
                "seriesKey" : this.seriesKey(),
                "dataPadding": this.dataPadding(),
                "data" : this.data()
            };
            
            var mapper = new HighchartsDataMapper(options);
            
            var seriesAndCategories = {};
            if(mapper.isNumerical()) {
                seriesAndCategories.series = mapper.getSeriesAsTuples();
                seriesAndCategories.categories = [];
            }
            else {
                seriesAndCategories.series = mapper.getSeriesAsArray();
                seriesAndCategories.categories = mapper.getCategories();
            }
            return seriesAndCategories;
        }
        
    });

    return SeriesChart;
});
