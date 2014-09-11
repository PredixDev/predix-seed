define(["lodash"], function (_) {

    /**
     * I take data that is in the legacy Visualization format, translate it to the 
     * Highcharts expected format, and optionally pad the data. 
     * 
     * Highcharts expect either:
     * * tuples for each series (if the x-axis is numeric) 
     * * an array of x-values (categories) and arrays of y-values for each series 
     * (if the x-axis is not numeric)
     * 
     * @class HighchartsDataMapper
     * @module Common.DataMapper
     * @param options the options object which specifies the keys, data, and how to pad the data; an example is below
     * @example
     *     // The HighchartsDataMapper is created with an options object, for example:
     *     var options = {
     *         "xAxisKey" : this.xAxisKey(), //the x-axis key
     *         "yAxisKey" : this.yAxisKey(), // the y-axis key
     *         "seriesKey" : this.seriesKey(), // the series key
     *         "dataPadding" : this.dataPadding(), // "Zeros" or "Nulls" or "none"
     *         "data" : this.data() // the data
     *     };
     * @constructor
     */
    var HighchartsDataMapper = function (options) {

        var xAxisKey;
        var yAxisKey;
        var seriesKey;
        var dataPadding;
        var data;

        var categories = [];
        var series = [];

        if (options) {
            xAxisKey = options.xAxisKey;
            yAxisKey = options.yAxisKey;
            seriesKey = options.seriesKey;
            dataPadding = options.dataPadding;
            data = options.data;
        }

        /**
         * Returns true if the data is numerical, false if it is categorical.  
         * 
         * This method only looks at the first point of the data that is passed in; the data
         * is assumed to be consistent along the x-axis (all numbers or all strings).
         * 
         * @method isNumerical
         */
        this.isNumerical = function () {

            if (data.length > 0) {
                var dataPoint = data[0];
                if (typeof dataPoint[xAxisKey] === 'string') {
                    return false;
                }
            }
            return true;
        };

        /**
         * I return the series object for a Highchart as arrays of tuples (optionally padded).  Each series will
         * have an array of tuples; each tuple is a numeric x-value and y-value.
         * 
         * @method getSeriesAsTuples
         * @example
         * ```
         * [{
         *     name: 'Tokyo',
         *     data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5]]
         * }, {
         *     name: 'New York',
         *     data: [[5, 5], [6, -5], [7, -5], [8, -4]]
         * }]
         * ```
         */
        this.getSeriesAsTuples = function () {

            if (xAxisKey && yAxisKey && seriesKey && dataPadding && data) {
                translateData(formatAsTuples);
            }
            return series;
        }

        /**
         * I return the series object for a Highchart as arrays (optionally padded).  Each array
         * will contain all the y-axis values for each series.
         * 
         * @method getSeriesAsArray
         * @example
         * ```
         * [{
         *     name: 'Tokyo',
         *     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5]
         * }, {
         *     name: 'New York',
         *     data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
         * }]
         * ```
         */
        this.getSeriesAsArray = function () {

            if (xAxisKey && yAxisKey && seriesKey && dataPadding && data) {
                translateData(formatAsSeriesAndCategories);
            }
            return series;
        };

        /**
         * I return the categories object for a highchart, which is an array of strings.
         * 
         * @method getCategories
         * @example
         * ```
         * ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
         * ```
         */
        this.getCategories = function () {

            // if the transformation hasn't been done, assume strings
            // for x's are categories and numbers for x's are numerical
            if (series.length <= 0) {

                if (xAxisKey && yAxisKey && seriesKey && dataPadding && data) {

                    if (this.isNumerical()) {
                        translateData(formatAsTuples);
                    }
                    else {
                        translateData(formatAsSeriesAndCategories);
                    }
                }
            }

            return categories;
        };

        /**
         * I am an internal method used by the formatting methods, which pads the data and 
         * translates it to the appropriate format (series/categories or tuples).
         * 
         * @method translateData
         * @param formatAppropriately
         * @private
         */
        function translateData(formatAppropriately) {
            if (dataPadding == "Zeros") {
                padDataWith(0);
            } else if (dataPadding == "Nulls") {
                padDataWith(null);
            }

            var workingSeries = {};
            var workingCategories = {};

            for (var i = 0; i < data.length; i++) {
                var dataPoint = data[i];

                var seriesName = dataPoint[seriesKey];
                if (!workingSeries.hasOwnProperty(seriesName)) {
                    workingSeries[seriesName] = {
                        name: seriesName,
                        data: []
                    };
                }

                var xValue = dataPoint[xAxisKey];
                var yValue = dataPoint[yAxisKey];
                formatAppropriately(workingSeries, workingCategories, seriesName, xValue, yValue);
            }

            for (var key in workingSeries) {
                series.push(workingSeries[key]);
            }

            for (var key in workingCategories) {
                categories.push(workingCategories[key]);
            }
        };

        /**
         * I am an internal method which handles formatting the data as tuples.
         * 
         * @method formatAsTuples
         * @param workingSeries
         * @param workingCategories
         * @param seriesName
         * @param xValue
         * @param yValue
         * @private
         */
        function formatAsTuples(workingSeries, workingCategories, seriesName, xValue, yValue) {
            workingSeries[seriesName].data.push([xValue, yValue]);
        };

        /**
         * I am an internal method which handles formatting data as series and categories.
         * 
         * @method formatAsSeriesAndCategories
         * @param workingSeries
         * @param workingCategories
         * @param seriesName
         * @param xValue
         * @param yValue
         * @private
         */
        function formatAsSeriesAndCategories(workingSeries, workingCategories, seriesName, xValue, yValue) {

            if (!workingCategories.hasOwnProperty(xValue)) {
                workingCategories[xValue] = xValue;
            }

            workingSeries[seriesName].data.push(yValue);
        };

        /**
         * I am an internal method which handles padding the data with a value.
         *
         * @method padDataWith
         * @param padValue
         * @private
         */
        function padDataWith(padValue) {
            var xAxisValues = _.chain(data)
                    .pluck(xAxisKey)
                    .uniq()
                    .value();

            var seriesNames = _.chain(data)
                    .pluck(seriesKey)
                    .uniq()
                    .value();

            var transformedData = [];
            for (var i = 0; i < seriesNames.length; i++) {
                var seriesName = seriesNames[i];
                var seriesIdentifyingProperties = {};
                seriesIdentifyingProperties[seriesKey] = seriesName;
                var xAxisIndexedDataPoints = _.chain(data)
                        .where(seriesIdentifyingProperties)
                        .indexBy(xAxisKey)
                        .value();

                var paddedSeries = [];
                for (var j = 0; j < xAxisValues.length; j++) {
                    if (xAxisIndexedDataPoints.hasOwnProperty(xAxisValues[j])) {
                        paddedSeries.push(xAxisIndexedDataPoints[xAxisValues[j]]);
                    } else {
                        var paddingObject = {};
                        paddingObject[xAxisKey] = xAxisValues[j];
                        paddingObject[seriesKey] = seriesName;
                        paddingObject[yAxisKey] = padValue;

                        paddedSeries.push(paddingObject);
                    }
                }

                transformedData = transformedData.concat(paddedSeries);
            }

            data = transformedData;
        };
    }

    return HighchartsDataMapper;
});