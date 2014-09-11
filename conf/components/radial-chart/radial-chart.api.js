define([ "jquery", "vruntime", "pie-chart", "json!./radial-chart.schema.json", "text!./radial-chart.tmpl"], function($, vRuntime, PieChart, Schema, Template) {
    
    var RadialChartIIDSWidget = vRuntime.widget.BaseWidget.extend({
        schema: Schema,
        template: Template,
        init : function() {
            this._super.apply(this, arguments);
            this._createViewModelFromSchema.call(this);
        },
        
        _initComponent : function() {
            var chartOptions = this._getChartOptions();
            $.extend(chartOptions, this.widgetSettings);
            
            try {
                this.setComponent(new Highcharts.Chart(chartOptions));
            } catch (e) {
                this._showError(e);
            }
        },
        
        _getChartOptions : function() {
            var chartOptions = {
	            title: {
                    text: this.title()
                },
                subtitle:{
                	text: this.subtitle()
                },               
                chart : {
                    renderTo : this.$view.children().get(0),
                    type : 'pie'
                },
                tooltip: {
                    formatter: function() {
                       var val = Math.abs(this.point.y);
                       return '<b>'+ this.point.name +'</b>: '+ val + '%';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: this._shouldShowLabels(),
                            distance: this._getDataLabelDistance()
                        },
                        
                        showInLegend: true
                    }
                },
                series: [this._getSeriesConfig()]
            };
            
            return chartOptions;
        },
        
        _getSeriesConfig: function() {
            var innerSize = this._isDonutChart() ? '75%' : '0%';
        
            var seriesConfig = {
                type: 'pie',
                innerSize: innerSize,
                data: this.data()
            };
            
            return seriesConfig;
        },
        
        _isDonutChart: function() {
            return this.chartType() == "Donut";
        },
        
        _shouldShowLabels: function() {
            return this.showLabels() === "true";
        },
        
        _getDataLabelDistance: function() {
            if (this.dataLabelPlacement() == "inside") {
                return -1;
            } else {
                return 30;
            }
        },
        
        render : function(options) {
            ko.applyBindings(this, this.$view.get(0).children[0]);

            // for Highchart to be sized correctly, need to do show before update
            this.show();

            // do one initial call to initialize the VM with the property editor values
            this._updateViewModelWithData(this._transformData({}));
            
            //initialize the high chart
            this._initComponent();
            
            // must call update so users can overwrite it
            this.update(this.data());
            
            return this;
        },
        
        update : function(data) {
            this._updateViewModelWithData(this._transformData(data));
            
            if (this.getComponent() == null) {
                return;
            }
            
            //remove series from chart but do not redraw
            if (this.getComponent().series.length > 0) {
                this.getComponent().series[0].remove(false);
            }
            
            try {
                //add series to chart and redraw
                this.getComponent().options.plotOptions.pie.dataLabels.enabled = this._shouldShowLabels();
                this.getComponent().addSeries(this._getSeriesConfig());
            } catch(e) {
                this._showError(e);
            }
            
            return this;
        },
        
        _showError: function(e) {
            this.$view.empty();
            var error = this._createErrorMessage(e);
            var $error = $("<div>").addClass("alert").addClass("alert-error").text(error);
            this.$view.before($error);
        },
        
        _createErrorMessage: function(e) {
            var errorUrlIndex = e.indexOf(":");
            return parent.window.Messages("widget.highcharts.error") + e.substring(errorUrlIndex);
        }
    });

    return RadialChartIIDSWidget;
});
