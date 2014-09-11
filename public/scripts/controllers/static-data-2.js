
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
	controllers.controller("StaticData2Ctrl", ["$scope", "$rootScope", "directiveBinder", function($scope, $rootScope, directiveBinder) {  
		 
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
        $scope.widgetSettings1 = {"global":{},"properties":{"chartType":{"value":"Area"},"title":{"value":"Title"},"subtitle":{"value":"Subtitle"},"xAxisTitle":{"value":"X Axis Title"},"yAxisTitle":{"value":"Y Axis Title"},"dataPadding":{"value":"None"},"xAxisKey":{"value":"MON"},"yAxisKey":{"value":"NUM_OF_ISSUES"},"seriesKey":{"value":"PART"},"data":{"value":[{"MON":"Monday","NUM_OF_ISSUES":10,"PART":"ProjectA"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectA"},{"MON":"Wednesday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Thursday","NUM_OF_ISSUES":9,"PART":"ProjectA"},{"MON":"Friday","NUM_OF_ISSUES":5,"PART":"ProjectA"},{"MON":"Monday","NUM_OF_ISSUES":18,"PART":"ProjectB"},{"MON":"Tuesday","NUM_OF_ISSUES":27,"PART":"ProjectB"},{"MON":"Wednesday","NUM_OF_ISSUES":25,"PART":"ProjectB"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectB"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectB"},{"MON":"Monday","NUM_OF_ISSUES":1,"PART":"ProjectC"},{"MON":"Tuesday","NUM_OF_ISSUES":7,"PART":"ProjectC"},{"MON":"Wednesday","NUM_OF_ISSUES":15,"PART":"ProjectC"},{"MON":"Thursday","NUM_OF_ISSUES":19,"PART":"ProjectC"},{"MON":"Friday","NUM_OF_ISSUES":15,"PART":"ProjectC"}]}}};

        // Create widget1
        $scope.widget1 = vRuntime.widget.create(SeriesChart, "bc27a219-4d08-4d0b-bf13-619ac1a59408_", $scope.widgetSettings1, $scope.widgetOverwrite1);
        
        // Render widget1 through life cycle methods
        vRuntime.widget.render($scope.widget1, $scope.widgetOptions1, $('#module-68280bf7-b5e8-460e-9887-503186a48486_'));

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
        $scope.widgetSettings2 = {"global":{},"data":[],"properties":{"methods":{},"min":{"value":0},"max":{"value":5000},"events":{},"value":{"value":3965.2},"threshold":{"value":1000}}};

        // Create widget2
        $scope.widget2 = vRuntime.widget.create(Bar, "dc760a0a-d2b2-4dbb-9d54-9a678adaa6cb_", $scope.widgetSettings2, $scope.widgetOverwrite2);
        
        // Render widget2 through life cycle methods
        vRuntime.widget.render($scope.widget2, $scope.widgetOptions2, $('#module-ed41236d-9518-43dc-86de-567260f0e8d5_'));

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
        vRuntime.widget.render($scope.widget3, $scope.widgetOptions3, $('#module-3286d2c6-e84c-4353-9d40-3734dc6be3fd_'));

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
        $scope.widgetSettings4 = {"global":{},"data":[],"properties":{"methods":{},"events":{},"alerts":{"value":[{"timestamp":"10/25/2013 11:13am","body":"Lorem ipsum dolor sit adipiscing consecteurest comodo amet prota.","title":"Sample Message 1","labelType":"label-important","action":"http://","label":"Urgent"},{"timestamp":"10/25/2013 11:13am","body":"Lorem ipsum dolor sit adipiscing consecteurest comodo amet prota.","title":"Sample Message 2","labelType":"label-warning","action":"http://","label":"Moderate"},{"timestamp":"10/25/2013 11:13am","body":"Lorem ipsum dolor sit adipiscing consecteurest comodo amet prota.","title":"Sample Message 3","labelType":"","action":"http://","label":""}]}}};

        // Create widget4
        $scope.widget4 = vRuntime.widget.create(MessageListWithStatus, "2ea51591-227f-433e-9850-0dc0107bde64_", $scope.widgetSettings4, $scope.widgetOverwrite4);
        
        // Render widget4 through life cycle methods
        vRuntime.widget.render($scope.widget4, $scope.widgetOptions4, $('#module-244cf1d3-57ee-4a6d-8f08-9ec1220b5c34_'));

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
        $scope.widgetSettings5 = {"global":{},"data":[],"properties":{"methods":{},"text":{"value":"Sample text..."},"voice":{"value":""},"events":{}}};

        // Create widget5
        $scope.widget5 = vRuntime.widget.create(Paragraph, "264e9131-0893-41ee-af8f-4e1e4d824539_", $scope.widgetSettings5, $scope.widgetOverwrite5);
        
        // Render widget5 through life cycle methods
        vRuntime.widget.render($scope.widget5, $scope.widgetOptions5, $('#module-380586d4-62aa-47c2-ad4b-b94775b5afe7_'));

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
        $scope.widgetSettings6 = {"global":{},"data":[],"properties":{"columnKeys":{"value":["country","total","bestYear"]},"tableName":{"value":"Snowboarding Olympic Medals"},"data":{"value":[{"total":"19","bestYear":"2006 (7)","country":"United States"},{"total":"9","bestYear":"2006 (4)","country":"Switzerland"},{"total":"8","bestYear":"2002/2010 (3)","country":"France"},{"total":"5","bestYear":"2010 (3)","country":"Canada"},{"total":"4","bestYear":"2010 (4)","country":"Austria"},{"total":"3","bestYear":"1998 (2)","country":"Germany"},{"total":"3","bestYear":"1998 (2)","country":"Norway"},{"total":"2","bestYear":"2006/2010 (1)","country":"Finland"},{"total":"2","bestYear":"1998/2002 (1)","country":"Italy"},{"total":"1","bestYear":"2010 (1)","country":"Australia"},{"total":"1","bestYear":"2010 (1)","country":"Netherlands"},{"total":"1","bestYear":"2010 (1)","country":"Russia"},{"total":"1","bestYear":"2006 (1)","country":"Slovakia"},{"total":"1","bestYear":"2002 (1)","country":"Sweden"}]},"showSearchField":{"value":"true"},"columnNames":{"value":["Country","Total","Best Year"]},"paginate":{"value":"true"}}};

        // Create widget6
        $scope.widget6 = vRuntime.widget.create(Datagrid, "b7ce36a6-3771-43a0-872d-3345adfbd45c_", $scope.widgetSettings6, $scope.widgetOverwrite6);
        
        // Render widget6 through life cycle methods
        vRuntime.widget.render($scope.widget6, $scope.widgetOptions6, $('#module-829e67db-211e-4f89-99b6-e9a783e98874_'));

        // Connect widget6 to event bus
        vRuntime.binder.bind($scope.widget6);
        
        // Cached jquery container div of the widget, events can be delegated to $view
        $scope.$view6 = $scope.widget6.$view;
        
        // 3rd party component of the widget (highchart, datatable.net, d3, etc.); 3rd party api can be accessed here
        $scope.component6 = $scope.widget6.getComponent();

		
        // Fetch data after all widgets are loaded, and bind to datasource or event bus
        //myDS.trigger("FETCH");
	}]);
});