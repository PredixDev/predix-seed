/**
 * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
 * Customize your widgets by:
 *  - Overriding or extending widget API methods
 *  - Changing widget settings or options
 */
'use strict';

define(['angular',
    'controllers-module',
    'widgets/radial-chart/radial-chart.api',
    'widgets/series-chart/series-chart.api',
    'widgets/gauge/gauge.api',
    'widgets/paragraph/paragraph.api',
    'vruntime'
], function(angular, controllers, RadialChart, SeriesChart, Gauge, Paragraph) {

    // Controller definition
    controllers.controller("Page3Ctrl", ["$scope", "$rootScope", "directiveBinder", function($scope, $rootScope, directiveBinder) {

        // Retrieve datasource instances
        //var myDS = vRuntime.datasource.getInstance("MyDatasource");

        /**
         * WIDGET PROPERTIES
         * Override the below properties (widgetOptions,widgetOverwrite,widgetSettings) for custom implementation.
         */
        $scope.widgetOptions1 = {
            /*
             * any options object to be passed into beforeRender method
             */
            beforeRender : {},
            /*
             * any options object to be passed into render method
             * these options are widget-specific, but for example, for a Series or Scatter Chart you can
             * pass in Highcharts configuration options to add to the default JSON object, such as:
             * plotOptions: {
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
             */
            render: {},

            /*
             * any options object to be passed into afterRender method
             */
            afterRender: {}
        };

        /*
         * use the following object to alter the widget method implementation
         */
        $scope.widgetOverwrite1 = {

            /*
             * method invoked before the render method
             * this method sets the widget template into the container div of the widget and kicks off knockout data binding
             * @param {options} - options would like to use for method
             */
            beforeRender: function(options){
                //call super class beforeRender method; comment out the following line to overwrite the super class method implementation
                this._super.call(this,options);
            },

            /*
             * method to initialize the 3rd party component and render the 3rd party component into the container div
             * @param {options} - options would like to use for method
             */
            render: function(options){
                //call super class render method; comment out the following line to overwrite super class method implementation
                this._super.call(this,options);
            },

            /*
             * method invoked after the widget is rendered on the DOM
             * this method can be used to setup additional event handlers
             * e.g. this.$view.on('click', handler); this setup a click handler delegate to the container div of the widget
             * this.$view is the cached jquery object of the widget container div
             * @param {options} - options would like to use for method
             */
            afterRender: function(options){
                //call super class afterRender method, comment out the following line to overwrite super class method implementation
                this._super.call(this,options);
            },

            /*
             * method invoked by the update method which should be used to convert web service data format into widget native format
             * e.g. transform web service data into highchart series, or into datatables.net format
             * @param {data} - raw data pass from update method, that need to transform into widget native data format
             * @return - tranformed data object
             */
            _transformData: function(data){
                //call super class _transformData method, comment out the following line to overwrite super class method implementation
                return this._super.call(this,data);
            },

            /*
             * method invoked by the data service to update the widget with new data
             * @param {data} - raw data passed from external data source
             */
            update: function(data){
                //call super class update method, comment out the following line to overwrite super class method implementation
                this._super.call(this,data);
            }
        };

        /*
         * These settings are the properties that were defined in the property editor in Workbench.
         * If you are hooking the widget up to a datasource, you need to define the datasource in the "global" property, and specify
         * which fields to map to using $ref, e.g.
         * {
         *    "global": {
         *        "datasource": {
         *            "name": "line"
         *         }
         *     },
         *     "properties": {
         *         "chartType": {
         *             "value": "Horizontal Bar"
         *         },
         *         "data": {
         *            "$ref": "line" // use the "line" key in the datasource
         *         }
         *     }
         * }
         */
        $scope.widgetSettings1 = {"global":{},"data":[],"properties":{"chartType":{"value":"Pie"},"title":{"value":"Title"},"showLabels":{"value":"true"},"data":{"value":[["Bananas",15],["Oranges",2],["Apples",18]]},"subtitle":{"value":"Subtitle"},"dataLabelPlacement":{"value":"outside"}}};

        // Create widget1
        $scope.widget1 = vRuntime.widget.create(RadialChart, "a9e03a56-5b71-44cb-9d53-99f8ac122878_", $scope.widgetSettings1, $scope.widgetOverwrite1);

        // Render widget1 through life cycle methods
        vRuntime.widget.render($scope.widget1, $scope.widgetOptions1, $('#page-3-module-1-body'));

        // Connect widget1 to event bus
        vRuntime.binder.bind($scope.widget1);

        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view1 = $scope.widget1.$view;

        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component1 = $scope.widget1.getComponent();


        /**
         * WIDGET PROPERTIES
         * Override the below properties (widgetOptions,widgetOverwrite,widgetSettings) for custom implementation.
         */
        $scope.widgetOptions2 = {
            /*
             * any options object to be passed into beforeRender method
             */
            beforeRender : {},
            /*
             * any options object to be passed into render method
             * these options are widget-specific, but for example, for a Series or Scatter Chart you can
             * pass in Highcharts configuration options to add to the default JSON object, such as:
             * plotOptions: {
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
             */
            render: {},

            /*
             * any options object to be passed into afterRender method
             */
            afterRender: {}
        };

        /*
         * use the following object to alter the widget method implementation
         */
        $scope.widgetOverwrite2 = {

            /*
             * method invoked before the render method
             * this method sets the widget template into the container div of the widget and kicks off knockout data binding
             * @param {options} - options would like to use for method
             */
            beforeRender: function(options){
                //call super class beforeRender method; comment out the following line to overwrite the super class method implementation
                this._super.call(this,options);
            },

            /*
             * method to initialize the 3rd party component and render the 3rd party component into the container div
             * @param {options} - options would like to use for method
             */
            render: function(options){
                //call super class render method; comment out the following line to overwrite super class method implementation
                this._super.call(this,options);
            },

            /*
             * method invoked after the widget is rendered on the DOM
             * this method can be used to setup additional event handlers
             * e.g. this.$view.on('click', handler); this setup a click handler delegate to the container div of the widget
             * this.$view is the cached jquery object of the widget container div
             * @param {options} - options would like to use for method
             */
            afterRender: function(options){
                //call super class afterRender method, comment out the following line to overwrite super class method implementation
                this._super.call(this,options);
            },

            /*
             * method invoked by the update method which should be used to convert web service data format into widget native format
             * e.g. transform web service data into highchart series, or into datatables.net format
             * @param {data} - raw data pass from update method, that need to transform into widget native data format
             * @return - tranformed data object
             */
            _transformData: function(data){
                //call super class _transformData method, comment out the following line to overwrite super class method implementation
                return this._super.call(this,data);
            },

            /*
             * method invoked by the data service to update the widget with new data
             * @param {data} - raw data passed from external data source
             */
            update: function(data){
                //call super class update method, comment out the following line to overwrite super class method implementation
                this._super.call(this,data);
            }
        };

        /*
         * These settings are the properties that were defined in the property editor in Workbench.
         * If you are hooking the widget up to a datasource, you need to define the datasource in the "global" property, and specify
         * which fields to map to using $ref, e.g.
         * {
         *    "global": {
         *        "datasource": {
         *            "name": "line"
         *         }
         *     },
         *     "properties": {
         *         "chartType": {
         *             "value": "Horizontal Bar"
         *         },
         *         "data": {
         *            "$ref": "line" // use the "line" key in the datasource
         *         }
         *     }
         * }
         */
        $scope.widgetSettings2 = {"global":{},"data":[],"properties":{"chartType":{"value":""},"title":{"value":"Title"},"xAxisTitle":{"value":"X Axis Title"},"data":{"value":[{"MON":"Monday","NUM_OF_ISSUES":10,"PART":"ProjectA"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectA"},{"MON":"Wednesday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Thursday","NUM_OF_ISSUES":9,"PART":"ProjectA"},{"MON":"Friday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Monday","NUM_OF_ISSUES":18,"PART":"ProjectB"},{"MON":"Tuesday","NUM_OF_ISSUES":27,"PART":"ProjectB"},{"MON":"Wednesday","NUM_OF_ISSUES":25,"PART":"ProjectB"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectB"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectB"},{"MON":"Monday","NUM_OF_ISSUES":1,"PART":"ProjectC"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectC"},{"MON":"Wednesday","NUM_OF_ISSUES":15,"PART":"ProjectC"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectC"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectC"}]},"xAxisKey":{"value":"MON"},"subtitle":{"value":"Subtitle"},"dataPadding":{"value":"None"},"yAxisTitle":{"value":"Y Axis Title"},"seriesKey":{"value":"PART"},"yAxisKey":{"value":"NUM_OF_ISSUES"}}};

        // Create widget2
        $scope.widget2 = vRuntime.widget.create(SeriesChart, "697714c6-6103-443d-b904-622fa33ab658_", $scope.widgetSettings2, $scope.widgetOverwrite2);

        // Render widget2 through life cycle methods
        vRuntime.widget.render($scope.widget2, $scope.widgetOptions2, $('#page-3-module-2-body'));

        // Connect widget2 to event bus
        vRuntime.binder.bind($scope.widget2);

        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view2 = $scope.widget2.$view;

        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component2 = $scope.widget2.getComponent();


        /**
         * WIDGET PROPERTIES
         * Override the below properties (widgetOptions,widgetOverwrite,widgetSettings) for custom implementation.
         */
        $scope.widgetOptions3 = {
            /*
             * any options object to be passed into beforeRender method
             */
            beforeRender : {},
            /*
             * any options object to be passed into render method
             * these options are widget-specific, but for example, for a Series or Scatter Chart you can
             * pass in Highcharts configuration options to add to the default JSON object, such as:
             * plotOptions: {
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
             */
            render: {},

            /*
             * any options object to be passed into afterRender method
             */
            afterRender: {}
        };

        /*
         * use the following object to alter the widget method implementation
         */
        $scope.widgetOverwrite3 = {

            /*
             * method invoked before the render method
             * this method sets the widget template into the container div of the widget and kicks off knockout data binding
             * @param {options} - options would like to use for method
             */
            beforeRender: function(options){
                //call super class beforeRender method; comment out the following line to overwrite the super class method implementation
                this._super.call(this,options);
            },

            /*
             * method to initialize the 3rd party component and render the 3rd party component into the container div
             * @param {options} - options would like to use for method
             */
            render: function(options){
                //call super class render method; comment out the following line to overwrite super class method implementation
                this._super.call(this,options);
            },

            /*
             * method invoked after the widget is rendered on the DOM
             * this method can be used to setup additional event handlers
             * e.g. this.$view.on('click', handler); this setup a click handler delegate to the container div of the widget
             * this.$view is the cached jquery object of the widget container div
             * @param {options} - options would like to use for method
             */
            afterRender: function(options){
                //call super class afterRender method, comment out the following line to overwrite super class method implementation
                this._super.call(this,options);
            },

            /*
             * method invoked by the update method which should be used to convert web service data format into widget native format
             * e.g. transform web service data into highchart series, or into datatables.net format
             * @param {data} - raw data pass from update method, that need to transform into widget native data format
             * @return - tranformed data object
             */
            _transformData: function(data){
                //call super class _transformData method, comment out the following line to overwrite super class method implementation
                return this._super.call(this,data);
            },

            /*
             * method invoked by the data service to update the widget with new data
             * @param {data} - raw data passed from external data source
             */
            update: function(data){
                //call super class update method, comment out the following line to overwrite super class method implementation
                this._super.call(this,data);
            }
        };

        /*
         * These settings are the properties that were defined in the property editor in Workbench.
         * If you are hooking the widget up to a datasource, you need to define the datasource in the "global" property, and specify
         * which fields to map to using $ref, e.g.
         * {
         *    "global": {
         *        "datasource": {
         *            "name": "line"
         *         }
         *     },
         *     "properties": {
         *         "chartType": {
         *             "value": "Horizontal Bar"
         *         },
         *         "data": {
         *            "$ref": "line" // use the "line" key in the datasource
         *         }
         *     }
         * }
         */
        $scope.widgetSettings3 = {"global":{},"data":[],"properties":{"methods":{},"min":{"value":0},"max":{"value":100},"labelMin":{"value":"0mm"},"events":{},"value":{"value":23},"labelMax":{"value":"16mm"},"threshold":{"value":50}}};

        // Create widget3
        $scope.widget3 = vRuntime.widget.create(Gauge, "e335a364-5b6b-4634-b979-908c839aa86a_", $scope.widgetSettings3, $scope.widgetOverwrite3);

        // Render widget3 through life cycle methods
        vRuntime.widget.render($scope.widget3, $scope.widgetOptions3, $('#page-3-module-3-body'));

        // Connect widget3 to event bus
        vRuntime.binder.bind($scope.widget3);

        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view3 = $scope.widget3.$view;

        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component3 = $scope.widget3.getComponent();




        /**
         * WIDGET PROPERTIES
         * Override the below properties (widgetOptions,widgetOverwrite,widgetSettings) for custom implementation.
         */
        $scope.widgetOptions4 = {
            /*
             * any options object to be passed into beforeRender method
             */
            beforeRender : {},
            /*
             * any options object to be passed into render method
             * these options are widget-specific, but for example, for a Series or Scatter Chart you can
             * pass in Highcharts configuration options to add to the default JSON object, such as:
             * plotOptions: {
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
             */
            render: {},

            /*
             * any options object to be passed into afterRender method
             */
            afterRender: {}
        };

        /*
         * use the following object to alter the widget method implementation
         */
        $scope.widgetOverwrite4 = {

            /*
             * method invoked before the render method
             * this method sets the widget template into the container div of the widget and kicks off knockout data binding
             * @param {options} - options would like to use for method
             */
            beforeRender: function(options){
                //call super class beforeRender method; comment out the following line to overwrite the super class method implementation
                this._super.call(this,options);
            },

            /*
             * method to initialize the 3rd party component and render the 3rd party component into the container div
             * @param {options} - options would like to use for method
             */
            render: function(options){
                //call super class render method; comment out the following line to overwrite super class method implementation
                this._super.call(this,options);
            },

            /*
             * method invoked after the widget is rendered on the DOM
             * this method can be used to setup additional event handlers
             * e.g. this.$view.on('click', handler); this setup a click handler delegate to the container div of the widget
             * this.$view is the cached jquery object of the widget container div
             * @param {options} - options would like to use for method
             */
            afterRender: function(options){
                //call super class afterRender method, comment out the following line to overwrite super class method implementation
                this._super.call(this,options);
            },

            /*
             * method invoked by the update method which should be used to convert web service data format into widget native format
             * e.g. transform web service data into highchart series, or into datatables.net format
             * @param {data} - raw data pass from update method, that need to transform into widget native data format
             * @return - tranformed data object
             */
            _transformData: function(data){
                //call super class _transformData method, comment out the following line to overwrite super class method implementation
                return this._super.call(this,data);
            },

            /*
             * method invoked by the data service to update the widget with new data
             * @param {data} - raw data passed from external data source
             */
            update: function(data){
                //call super class update method, comment out the following line to overwrite super class method implementation
                this._super.call(this,data);
            }
        };

        /*
         * These settings are the properties that were defined in the property editor in Workbench.
         * If you are hooking the widget up to a datasource, you need to define the datasource in the "global" property, and specify
         * which fields to map to using $ref, e.g.
         * {
         *    "global": {
         *        "datasource": {
         *            "name": "line"
         *         }
         *     },
         *     "properties": {
         *         "chartType": {
         *             "value": "Horizontal Bar"
         *         },
         *         "data": {
         *            "$ref": "line" // use the "line" key in the datasource
         *         }
         *     }
         * }
         */
        $scope.widgetSettings4 = {"global":{},"data":[],"properties":{"methods":{},"text":{"value":"Sample text..."},"voice":{"value":""},"events":{}}};

        // Create widget4
        $scope.widget4 = vRuntime.widget.create(Paragraph, "264e9131-0893-41ee-af8f-4e1e4d824539_", $scope.widgetSettings4, $scope.widgetOverwrite4);

        // Render widget4 through life cycle methods
        vRuntime.widget.render($scope.widget4, $scope.widgetOptions4, $('#page-3-module-4-body'));

        // Connect widget4 to event bus
        vRuntime.binder.bind($scope.widget4);

        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view4 = $scope.widget4.$view;

        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component4 = $scope.widget4.getComponent();


        // Fetch data after all widgets are loaded, and bind to datasource or event bus
        //myDS.trigger("FETCH");
    }]);
});