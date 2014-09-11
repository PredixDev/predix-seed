define([ "jquery", "vruntime"], function ($, vRuntime) {

            /**
             * I am the base Highcharts IIDS Widget class.  I contain common functionality
             * from different Highcharts widgets, such as the Series and Scatter Charts.
             * 
             * @class HighchartsIIDSWidget
             * @module Common.Views
             * @extends BaseWidget
             * @uses $
             * @uses ko
             * @uses BaseWidget
             * @requires $, ko, BaseWidget
             */
            var HighchartsIIDSWidget = vRuntime.widget.BaseWidget.extend({
                /**
                 * I initialize the HighchartsIIDSWidget class, creating the view model
                 * from the schema.
                 * 
                 * @method init
                 * @constructor
                 */
                init: function () {
                    this._super.apply(this, arguments);
                    this._createViewModelFromSchema.call(this);
                },
                /**
                 * I return the Highcharts options object that defines the chart.  I just
                 * return a default empty options object; subclasses should override me.
                 *
                 * @returns {Object}
                 * @protected
                 */
                _getChartOptions: function () {
                    return {};
                },
                /**
                 * I handle getting the series and categories objects.  I just
                 * return a default empty options object; subclasses should override me.
                 * 
                 * @returns {Object}
                 * @protected
                 */
                _getSeriesAndCategories: function () {
                    return {};
                },
                /**
                 * I handle creating and displaying the error message for a Highcharts error.
                 * @param e
                 * @returns {string}
                 * @protected
                 */
                _createErrorMessage: function (e) {
                    var errorUrlIndex = e.indexOf(":");
                    return parent.window.Messages("widget.highcharts.error") + e.substring(errorUrlIndex);
                },
                /**
                 * I handle initializing the Highchart instance, using the options defined in _getChartOptions
                 * and extended by the options that are passed in.
                 * @param options additional options to extend default options
                 * @protected
                 */
                _initComponent: function (options) {

                    // extend the chart options by the user's options so they can overwrite anything
                    var chartOptions = this._getChartOptions();
                    $.extend(chartOptions, options);

                    this.setComponent(new Highcharts.Chart(chartOptions));
                },
                /**
                 * I initialize and render the widget.
                 * 
                 * @method render
                 * @param options additional options to extend the default chart options
                 * @example
                 * ```
                 * options = {
                 *     series: {
                 *         cursor: 'pointer',
                 *         point: {
                 *              events: {
                 *                 click: function(event) {
                 *                     console.log("clicked " + this.category);
                 *                 }
                 *             }
                 *         }
                 *     }                                 
                 * }
                 * ```
                 * @returns {HighchartsIIDSWidget}
                 */
                render: function (options) {

                    ko.applyBindings(this, this.$view.get(0).children[0]);

                    // for Highchart to be sized correctly, need to do show before update
                    this.show();

                    // do one initial call to initialize the VM with the property editor values
                    this._updateViewModelWithData(this._transformData({}));

                    // initialize with user entered options
                    this._initComponent(options);

                    // must call update so users can overwrite it
                    this.update(this.data());

                    return this;
                },
                /**
                 * I update the widget with the given data for any widget settings fields
                 * which are set to $ref.
                 * 
                 * Only the series and categories will be updated; changes to the 
                 * title, subtitle, etc. will not be reflected unless render is called.
                 *
                 * @method update
                 * @param data {Object} The data to pass into the widget for updating.
                 * @returns {HighchartsIIDSWidget}
                 */
                update: function (data) {

                    this._updateViewModelWithData(this._transformData(data));

                    var seriesAndCategories = this._getSeriesAndCategories();
                    var seriesArray = seriesAndCategories.series;
                    var categoriesArray = seriesAndCategories.categories;

                    if (seriesArray && categoriesArray) {

                        //remove all series
                        while (this._component.series.length > 0) {
                            this._component.series[0].remove(false);
                        }

                        //set chart x axis categories if any
                        if (this._component.xAxis && this._component.xAxis[0]) {
                            if (categoriesArray.length) {
                                this._component.xAxis[0].setCategories(categoriesArray, false);
                            }
                        }

                        //set series
                        try {

                            for (var x = 0; x < seriesArray.length; x++) {
                                this._component.addSeries(seriesArray[x], false);
                            }

                        } catch (e) {

                            // clear the chart and add the error message
                            this.$view.empty();
                            var error = this._createErrorMessage(e);
                            this.$view.before("<div class='alert alert-error'>" + error + "</div>");
                        }
                        ;

                        this._component.redraw();
                    }

                    return this;
                }
            });

            return HighchartsIIDSWidget;
        });