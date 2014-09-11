
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
        'widgets/scatter-chart/scatter-chart.api',
        'vruntime'
        ], function(angular, controllers, RadialChart, SeriesChart, ScatterChart) {  
	
	// Controller definition
	controllers.controller("ServiceData1Ctrl", ["$scope", "$rootScope", "directiveBinder", function($scope, $rootScope, directiveBinder) {  
		 
        // Retrieve datasource instances 
        var radialChartDs = vRuntime.datasource.getInstance("RadialChart");
        var scatterChartDs = vRuntime.datasource.getInstance("ScatterChart");
        var seriesChartDs = vRuntime.datasource.getInstance("SeriesChart");
                     
		
		
        
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
        $scope.widgetSettings1 = {"global":{"datasource":{"name":"RadialChart"}},"properties":{"chartType":{"value":"Pie"},"showLabels":{"value":"true"},"dataLabelPlacement":{"value":"outside"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"data":{"$ref":"donut"}}};

        // Create widget1
        $scope.widget1 = vRuntime.widget.create(RadialChart, "681c0fbb-9b18-4573-a3ab-a9665c346a21_", $scope.widgetSettings1, $scope.widgetOverwrite1);
        
        // Render widget1 through life cycle methods
        vRuntime.widget.render($scope.widget1, $scope.widgetOptions1, $('#module-a12e41e9-3b98-4d10-920d-c7b349602189_'));

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
        $scope.widgetSettings2 = {"global":{"datasource":{"name":"RadialChart"}},"properties":{"chartType":{"value":"Donut"},"showLabels":{"value":"true"},"dataLabelPlacement":{"value":"outside"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"data":{"$ref":"donut"}}};

        // Create widget2
        $scope.widget2 = vRuntime.widget.create(RadialChart, "16e50fde-e48b-4c10-8dd4-8fb720c3d9b0_", $scope.widgetSettings2, $scope.widgetOverwrite2);
        
        // Render widget2 through life cycle methods
        vRuntime.widget.render($scope.widget2, $scope.widgetOptions2, $('#module-35d350fb-8b5b-409b-93ea-1999651795c1_'));

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
        $scope.widgetSettings3 = {"global":{"datasource":{"name":"ScatterChart"}},"properties":{"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"$ref":"line"}}};

        // Create widget3
        $scope.widget3 = vRuntime.widget.create(ScatterChart, "005f4b1d-a96c-49be-b25e-a89497e34eda_", $scope.widgetSettings3, $scope.widgetOverwrite3);
        
        // Render widget3 through life cycle methods
        vRuntime.widget.render($scope.widget3, $scope.widgetOptions3, $('#module-92a74f19-11ea-4841-991f-bf51e2efc958_'));

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
        $scope.widgetSettings4 = {"global":{"datasource":{"name":"SeriesChart"}},"properties":{"chartType":{"value":"Line"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"$ref":"line"}}};

        // Create widget4
        $scope.widget4 = vRuntime.widget.create(SeriesChart, "e99fb733-57b9-4416-93fe-fe7d191a48dd_", $scope.widgetSettings4, $scope.widgetOverwrite4);
        
        // Render widget4 through life cycle methods
        vRuntime.widget.render($scope.widget4, $scope.widgetOptions4, $('#module-3411494b-f7bc-4a34-a48e-cc542f8812da_'));

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
        $scope.widgetSettings5 = {"global":{"datasource":{"name":"SeriesChart"}},"properties":{"chartType":{"value":"Spline"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"$ref":"line"}}};

        // Create widget5
        $scope.widget5 = vRuntime.widget.create(SeriesChart, "3503ef17-4295-4313-9d04-05b9331b8a75_", $scope.widgetSettings5, $scope.widgetOverwrite5);
        
        // Render widget5 through life cycle methods
        vRuntime.widget.render($scope.widget5, $scope.widgetOptions5, $('#module-6e59dae6-fe72-49b5-a267-d436003839d1_'));

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
        $scope.widgetSettings6 = {"global":{"datasource":{"name":"SeriesChart"}},"properties":{"chartType":{"value":"Horizontal Bar"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"$ref":"line"}}};

        // Create widget6
        $scope.widget6 = vRuntime.widget.create(SeriesChart, "55b70532-d939-4869-a69a-e9af5f1b22c2_", $scope.widgetSettings6, $scope.widgetOverwrite6);
        
        // Render widget6 through life cycle methods
        vRuntime.widget.render($scope.widget6, $scope.widgetOptions6, $('#module-a87a19b3-c313-46c9-be3d-e7b00e52b002_'));

        // Connect widget6 to event bus
        vRuntime.binder.bind($scope.widget6);
        
        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view6 = $scope.widget6.$view;
        
        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component6 = $scope.widget6.getComponent();

		
        
        /**
         * WIDGET PROPERTIES
         * Override the below properties (widgetOptions,widgetOverwrite,widgetSettings) for custom implementation.
         */
         $scope.widgetOptions7 = {
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
         $scope.widgetOverwrite7 = {
        
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
        $scope.widgetSettings7 = {"global":{"datasource":{"name":"SeriesChart"}},"properties":{"chartType":{"value":"Vertical Bar"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"$ref":"line"}}};

        // Create widget7
        $scope.widget7 = vRuntime.widget.create(SeriesChart, "3694abef-58ad-4aa8-8b84-fcaade512a4a_", $scope.widgetSettings7, $scope.widgetOverwrite7);
        
        // Render widget7 through life cycle methods
        vRuntime.widget.render($scope.widget7, $scope.widgetOptions7, $('#module-5f2db0a3-0231-4c6b-8bf6-92c377ceb245_'));

        // Connect widget7 to event bus
        vRuntime.binder.bind($scope.widget7);
        
        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view7 = $scope.widget7.$view;
        
        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component7 = $scope.widget7.getComponent();

		
        // Fetch data after all widgets are loaded, and bind to datasource or event bus
        radialChartDs.trigger("FETCH");
        scatterChartDs.trigger("FETCH");
        seriesChartDs.trigger("FETCH");
        
	}]);
});