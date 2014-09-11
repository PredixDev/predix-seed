
/**
  * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
  * Customize your widgets by:
  *  - Overriding or extending widget API methods
  *  - Changing widget settings or options
  */
'use strict';

define(['angular',
        'controllers-module',
        'widgets/datagrid/datagrid.api',
        'widgets/paragraph/paragraph.api',
        'widgets/message-list-with-status/message-list-with-status.api',
        'widgets/bar/bar.api',
        'widgets/series-chart/series-chart.api',
        'widgets/gauge/gauge.api',
        'vruntime'
        ], function(angular, controllers, Datagrid, Paragraph, MessageListWithStatus, Bar, SeriesChart, Gauge) {  
	
	// Controller definition
	controllers.controller("ServiceData2Ctrl", ["$scope", "$rootScope", "directiveBinder", function($scope, $rootScope, directiveBinder) {  
		 
        // Retrieve datasource instances 
        var seriesChartDs = vRuntime.datasource.getInstance("SeriesChart");
        var barDs = vRuntime.datasource.getInstance("Bar");
        var gaugeDs = vRuntime.datasource.getInstance("Gauge");
        var messagelistDs = vRuntime.datasource.getInstance("messagelist");
        var paragraphDs = vRuntime.datasource.getInstance("Paragraph");
        var dataGridDs = vRuntime.datasource.getInstance("DataGrid");
                     
		
		
        
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
        $scope.widgetSettings1 = {"global":{"datasource":{"name":"SeriesChart"}},"properties":{"chartType":{"value":"Area"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"$ref":"line"}}};

        // Create widget1
        $scope.widget1 = vRuntime.widget.create(SeriesChart, "0d7bce09-011a-4f24-99a7-cffca20d7148_", $scope.widgetSettings1, $scope.widgetOverwrite1);
        
        // Render widget1 through life cycle methods
        vRuntime.widget.render($scope.widget1, $scope.widgetOptions1, $('#module-459860e2-ae41-47cb-b10a-d90d2ec7c199_'));

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
        $scope.widgetSettings2 = {"global":{"datasource":{"name":"Bar"}},"properties":{"value":{"$ref":"value"},"min":{"$ref":"min"},"max":{"$ref":"max"},"threshold":{"$ref":"threshold"}}};

        // Create widget2
        $scope.widget2 = vRuntime.widget.create(Bar, "453f74c1-c4a0-47d4-a4f9-c542ae08f4c3_", $scope.widgetSettings2, $scope.widgetOverwrite2);
        
        // Render widget2 through life cycle methods
        vRuntime.widget.render($scope.widget2, $scope.widgetOptions2, $('#module-0faef847-1f31-4c86-b02f-b8667b138a83_'));

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
        $scope.widgetSettings3 = {"global":{"datasource":{"name":"Gauge"}},"properties":{"value":{"$ref":"value"},"min":{"$ref":"min"},"max":{"$ref":"max"},"threshold":{"$ref":"threshold"},"labelMin":{"$ref":"labelMin"},"labelMax":{"$ref":"labelMax"}}};

        // Create widget3
        $scope.widget3 = vRuntime.widget.create(Gauge, "e8a4f061-760c-47e2-96ee-d4ea20710934_", $scope.widgetSettings3, $scope.widgetOverwrite3);
        
        // Render widget3 through life cycle methods
        vRuntime.widget.render($scope.widget3, $scope.widgetOptions3, $('#module-cca6debb-8d70-40c0-a13f-747bb660154f_'));

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
        $scope.widgetSettings4 = {"global":{"datasource":{"name":"messagelist"}},"properties":{"alerts":{"$ref":"Alert"}}};

        // Create widget4
        $scope.widget4 = vRuntime.widget.create(MessageListWithStatus, "fc080378-b23e-4876-8eac-02c36226f3cb_", $scope.widgetSettings4, $scope.widgetOverwrite4);
        
        // Render widget4 through life cycle methods
        vRuntime.widget.render($scope.widget4, $scope.widgetOptions4, $('#module-62649858-2576-4e86-a950-69d669f7ebe8_'));

        // Connect widget4 to event bus
        vRuntime.binder.bind($scope.widget4);
        
        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view4 = $scope.widget4.$view;
        
        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component4 = $scope.widget4.getComponent();

		
        
        /**
         * WIDGET PROPERTIES
         * Override the below properties (widgetOptions,widgetOverwrite,widgetSettings) for custom implementation.
         */
         $scope.widgetOptions5 = {
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
         $scope.widgetOverwrite5 = {
        
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
        $scope.widgetSettings5 = {"global":{"datasource":{"name":"Paragraph"}},"properties":{"text":{"$ref":"Warn"},"voice":{"value":"voice-brand"}}};

        // Create widget5
        $scope.widget5 = vRuntime.widget.create(Paragraph, "4f2c8768-b0b8-4391-8770-451d1a423dfa_", $scope.widgetSettings5, $scope.widgetOverwrite5);
        
        // Render widget5 through life cycle methods
        vRuntime.widget.render($scope.widget5, $scope.widgetOptions5, $('#module-fdc9d1f8-0c5e-4bf7-b92a-a4aa12a9da73_'));

        // Connect widget5 to event bus
        vRuntime.binder.bind($scope.widget5);
        
        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view5 = $scope.widget5.$view;
        
        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component5 = $scope.widget5.getComponent();

		
        
        /**
         * WIDGET PROPERTIES
         * Override the below properties (widgetOptions,widgetOverwrite,widgetSettings) for custom implementation.
         */
         $scope.widgetOptions6 = {
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
         $scope.widgetOverwrite6 = {
        
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
        $scope.widgetSettings6 = {"global":{"datasource":{"name":"DataGrid"}},"properties":{"tableName":{"value":"Snowboarding Olympic Medals"},"showSearchField":{"value":"true"},"paginate":{"value":"true"},"columnNames":{"$ref":"columnNames"},"columnKeys":{"$ref":"columnKeys"},"data":{"$ref":"rowData"}}};

        // Create widget6
        $scope.widget6 = vRuntime.widget.create(Datagrid, "ed6d7dad-2068-40e3-a235-6b8570563207_", $scope.widgetSettings6, $scope.widgetOverwrite6);
        
        // Render widget6 through life cycle methods
        vRuntime.widget.render($scope.widget6, $scope.widgetOptions6, $('#module-4f56de51-fe10-4ead-93fa-7fdeedcfbbb7_'));

        // Connect widget6 to event bus
        vRuntime.binder.bind($scope.widget6);
        
        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view6 = $scope.widget6.$view;
        
        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component6 = $scope.widget6.getComponent();

		
        // Fetch data after all widgets are loaded, and bind to datasource or event bus
        seriesChartDs.trigger("FETCH");
        barDs.trigger("FETCH");
        gaugeDs.trigger("FETCH");
        messagelistDs.trigger("FETCH");
        paragraphDs.trigger("FETCH");
        dataGridDs.trigger("FETCH");
        
	}]);
});