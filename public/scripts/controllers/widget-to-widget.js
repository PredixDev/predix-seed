
/**
  * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
  * Customize your widgets by:
  *  - Overriding or extending widget API methods
  *  - Changing widget settings or options
  */
'use strict';

define(['angular',
        'controllers-module',
        'vruntime'
        ], function(angular, controllers) {  
	
	// Controller definition
	controllers.controller("WidgetToWidgetCtrl", ["$scope", "$rootScope", "directiveBinder", function($scope, $rootScope, directiveBinder) {  
		 
        // Retrieve datasource instances 
        //var myDS = vRuntime.datasource.getInstance("MyDatasource");             
		
		
        // Fetch data after all widgets are loaded, and bind to datasource or event bus
        //myDS.trigger("FETCH");
	}]);
});