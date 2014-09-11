define(["jquery", "widgets/common/highcharts-iids-widget", "widgets/common/highcharts-data-mapper","scatter-chart", "json!./scatter-chart.schema.json", "text!./scatter-chart.tmpl"], function($, HighchartsIIDSWidget, HighchartsDataMapper, ScatterChart, Schema, Template) {
    
    var ScatterChart = HighchartsIIDSWidget.extend({
        schema: Schema,
        template: Template,
        _getChartOptions : function() {
            
            var chartOptions = {
                chart : {
                    renderTo : this.$view.children().get(0),
                    type : "scatter"
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
        
            return chartOptions;
            
        },
        _getSeriesAndCategories : function() {
            
            var options = {
                "xAxisKey" : this.xAxisKey(),
                "yAxisKey" : this.yAxisKey(),
                "seriesKey" : this.seriesKey(),
                "dataPadding" : this.dataPadding(),
                "data" : this.data()
            };
            
            var mapper = new HighchartsDataMapper(options);
            
            // Scatter chart takes data in tuples, never in categories
            var seriesAndCategories = {};
            seriesAndCategories.series = mapper.getSeriesAsTuples();
            seriesAndCategories.categories = [];
            return seriesAndCategories;
        }
        
    });

    return ScatterChart;
});
