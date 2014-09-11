
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
	controllers.controller("StaticData1Ctrl", ["$scope", "$rootScope", "directiveBinder", function($scope, $rootScope, directiveBinder) {  
		 
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
        vRuntime.widget.render($scope.widget1, $scope.widgetOptions1, $('#module-6488eff5-47cc-4158-82c7-77f602788ca1_'));

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
        $scope.widgetSettings2 = {"global":{},"properties":{"chartType":{"value":"Donut"},"showLabels":{"value":"true"},"dataLabelPlacement":{"value":"outside"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"data":{"value":[["Bananas",15],["Oranges",2],["Apples",18]]}}};

        // Create widget2
        $scope.widget2 = vRuntime.widget.create(RadialChart, "a2202df4-e5b6-419d-b89d-837335da3380_", $scope.widgetSettings2, $scope.widgetOverwrite2);
        
        // Render widget2 through life cycle methods
        vRuntime.widget.render($scope.widget2, $scope.widgetOptions2, $('#module-d018f36f-4ab6-4fd8-a840-69f1d5ee284f_'));

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
        $scope.widgetSettings3 = {"global":{},"data":[],"properties":{"title":{"value":"Title"},"xAxisTitle":{"value":"X Axis Title"},"data":{"value":[{"weight":51.6,"height":161.2,"gender":"female"},{"weight":59,"height":167.5,"gender":"female"},{"weight":49.2,"height":159.5,"gender":"female"},{"weight":63,"height":157,"gender":"female"},{"weight":53.6,"height":155.8,"gender":"female"},{"weight":59,"height":170,"gender":"female"},{"weight":47.6,"height":159.1,"gender":"female"},{"weight":69.8,"height":166,"gender":"female"},{"weight":66.8,"height":176.2,"gender":"female"},{"weight":75.2,"height":160.2,"gender":"female"},{"weight":78.8,"height":176,"gender":"male"},{"weight":77.8,"height":180.5,"gender":"male"},{"weight":90,"height":192,"gender":"male"},{"weight":83.6,"height":177.8,"gender":"male"},{"weight":76.7,"height":180,"gender":"male"},{"weight":86.4,"height":184,"gender":"male"},{"weight":74.8,"height":181.5,"gender":"male"},{"weight":71.8,"height":175.3,"gender":"male"},{"weight":80.7,"height":193.5,"gender":"male"},{"weight":65.6,"height":174,"gender":"male"}]},"xAxisKey":{"value":"height"},"subtitle":{"value":"Subtitle"},"dataPadding":{"value":"None"},"yAxisTitle":{"value":"Y Axis Title"},"seriesKey":{"value":"gender"},"yAxisKey":{"value":"weight"}}};

        // Create widget3
        $scope.widget3 = vRuntime.widget.create(ScatterChart, "0c1ac874-083e-4127-b7c0-685c60c699d5_", $scope.widgetSettings3, $scope.widgetOverwrite3);
        
        // Render widget3 through life cycle methods
        vRuntime.widget.render($scope.widget3, $scope.widgetOptions3, $('#module-55f481ae-af6a-499d-a053-eb902b9b7104_'));

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
        $scope.widgetSettings4 = {"global":{},"data":[],"properties":{"chartType":{"value":""},"title":{"value":"Title"},"xAxisTitle":{"value":"X Axis Title"},"data":{"value":[{"MON":"Monday","NUM_OF_ISSUES":10,"PART":"ProjectA"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectA"},{"MON":"Wednesday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Thursday","NUM_OF_ISSUES":9,"PART":"ProjectA"},{"MON":"Friday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Monday","NUM_OF_ISSUES":18,"PART":"ProjectB"},{"MON":"Tuesday","NUM_OF_ISSUES":27,"PART":"ProjectB"},{"MON":"Wednesday","NUM_OF_ISSUES":25,"PART":"ProjectB"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectB"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectB"},{"MON":"Monday","NUM_OF_ISSUES":1,"PART":"ProjectC"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectC"},{"MON":"Wednesday","NUM_OF_ISSUES":15,"PART":"ProjectC"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectC"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectC"}]},"xAxisKey":{"value":"MON"},"subtitle":{"value":"Subtitle"},"dataPadding":{"value":"None"},"yAxisTitle":{"value":"Y Axis Title"},"seriesKey":{"value":"PART"},"yAxisKey":{"value":"NUM_OF_ISSUES"}}};

        // Create widget4
        $scope.widget4 = vRuntime.widget.create(SeriesChart, "697714c6-6103-443d-b904-622fa33ab658_", $scope.widgetSettings4, $scope.widgetOverwrite4);
        
        // Render widget4 through life cycle methods
        vRuntime.widget.render($scope.widget4, $scope.widgetOptions4, $('#module-dec0135e-a0f4-46a5-a102-0a76e16b348a_'));

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
        $scope.widgetSettings5 = {"global":{},"properties":{"chartType":{"value":"Spline"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"value":[{"MON":"Monday","NUM_OF_ISSUES":10,"PART":"ProjectA"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectA"},{"MON":"Wednesday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Thursday","NUM_OF_ISSUES":9,"PART":"ProjectA"},{"MON":"Friday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Monday","NUM_OF_ISSUES":18,"PART":"ProjectB"},{"MON":"Tuesday","NUM_OF_ISSUES":27,"PART":"ProjectB"},{"MON":"Wednesday","NUM_OF_ISSUES":25,"PART":"ProjectB"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectB"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectB"},{"MON":"Monday","NUM_OF_ISSUES":1,"PART":"ProjectC"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectC"},{"MON":"Wednesday","NUM_OF_ISSUES":15,"PART":"ProjectC"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectC"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectC"}]}}};

        // Create widget5
        $scope.widget5 = vRuntime.widget.create(SeriesChart, "7cfceaae-897e-4e7b-859a-5ae2d475140d_", $scope.widgetSettings5, $scope.widgetOverwrite5);
        
        // Render widget5 through life cycle methods
        vRuntime.widget.render($scope.widget5, $scope.widgetOptions5, $('#module-17569b68-a2c2-460a-b2ba-b11c51bc2876_'));

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
        $scope.widgetSettings6 = {"global":{},"properties":{"chartType":{"value":"Horizontal Bar"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"value":[{"MON":"Monday","NUM_OF_ISSUES":10,"PART":"ProjectA"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectA"},{"MON":"Wednesday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Thursday","NUM_OF_ISSUES":9,"PART":"ProjectA"},{"MON":"Friday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Monday","NUM_OF_ISSUES":18,"PART":"ProjectB"},{"MON":"Tuesday","NUM_OF_ISSUES":27,"PART":"ProjectB"},{"MON":"Wednesday","NUM_OF_ISSUES":25,"PART":"ProjectB"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectB"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectB"},{"MON":"Monday","NUM_OF_ISSUES":1,"PART":"ProjectC"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectC"},{"MON":"Wednesday","NUM_OF_ISSUES":15,"PART":"ProjectC"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectC"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectC"}]}}};

        // Create widget6
        $scope.widget6 = vRuntime.widget.create(SeriesChart, "5fe95e00-597d-4688-a901-74d1e305ad7b_", $scope.widgetSettings6, $scope.widgetOverwrite6);
        
        // Render widget6 through life cycle methods
        vRuntime.widget.render($scope.widget6, $scope.widgetOptions6, $('#module-3913657a-072a-4682-9d1b-29d4b2049f8e_'));

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
        $scope.widgetSettings7 = {"global":{},"properties":{"chartType":{"value":"Vertical Bar"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"value":[{"MON":"Monday","NUM_OF_ISSUES":10,"PART":"ProjectA"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectA"},{"MON":"Wednesday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Thursday","NUM_OF_ISSUES":9,"PART":"ProjectA"},{"MON":"Friday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Monday","NUM_OF_ISSUES":18,"PART":"ProjectB"},{"MON":"Tuesday","NUM_OF_ISSUES":27,"PART":"ProjectB"},{"MON":"Wednesday","NUM_OF_ISSUES":25,"PART":"ProjectB"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectB"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectB"},{"MON":"Monday","NUM_OF_ISSUES":1,"PART":"ProjectC"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectC"},{"MON":"Wednesday","NUM_OF_ISSUES":15,"PART":"ProjectC"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectC"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectC"}]}}};

        // Create widget7
        $scope.widget7 = vRuntime.widget.create(SeriesChart, "581b4bc9-5a17-465f-8881-372ef7b3df5d_", $scope.widgetSettings7, $scope.widgetOverwrite7);
        
        // Render widget7 through life cycle methods
        vRuntime.widget.render($scope.widget7, $scope.widgetOptions7, $('#module-9cd2a1da-8ec4-4361-8fe1-b667a5487121_'));

        // Connect widget7 to event bus
        vRuntime.binder.bind($scope.widget7);
        
        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view7 = $scope.widget7.$view;
        
        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component7 = $scope.widget7.getComponent();

		
        // Fetch data after all widgets are loaded, and bind to datasource or event bus
        //myDS.trigger("FETCH");
	}]);
});