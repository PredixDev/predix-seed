
/**
 * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
 * Customize your widgets by:
 *  - Overriding or extending widget API methods
 *  - Changing widget settings or options
 */
'use strict';

define(['angular',
    'controllers-module',
    'directives/time-series-chart/time-series-chart',
    'vruntime'
], function(angular, controllers) {

    // Controller definition
    controllers.controller("Page1Ctrl", ["$scope", "$rootScope", "directiveBinder", function($scope, $rootScope, directiveBinder) {

        // Retrieve datasource instances
        var myDS = vRuntime.datasource.getInstance("timeseries");

        $scope.widget1 = $rootScope.$new(true);
        $scope.widget1.title = "Static Directive Chart";
        $scope.widget1.xAxisTitle = "Time";
        $scope.widget1.subtitle = "Subtitle";
        $scope.widget1.xAxisKey = "time";
        $scope.widget1.data = [{"series":"A","time":1398961986000,"data":55},{"series":"A","time":1398961987000,"data":57},{"series":"A","time":1398961988000,"data":61},{"series":"A","time":1398961989000,"data":65},{"series":"B","time":1398961986000,"data":45},{"series":"B","time":1398961987000,"data":40},{"series":"B","time":1398961988000,"data":44},{"series":"B","time":1398961989000,"data":46},{"series":"C","time":1398961986000,"data":51},{"series":"C","time":1398961987000,"data":40},{"series":"C","time":1398961988000,"data":39},{"series":"C","time":1398961989000,"data":42}];
        $scope.widget1.yAxisTitle = "Data";
        $scope.widget1.maxNumPoints = "5";
        $scope.widget1.yAxisKey = "data";
        $scope.widget1.seriesKey = "series";

        $scope.widget2 = $rootScope.$new(true);
        $scope.widget2.title = "Dynamic Directive Chart";
        $scope.widget2.xAxisTitle = "Time";
        $scope.widget2.subtitle = "Subtitle";
        $scope.widget2.xAxisKey = "MON";
        $scope.widget2.data = "";
        $scope.widget2.yAxisTitle = "Data";
        $scope.widget2.maxNumPoints = "5";
        $scope.widget2.yAxisKey = "NUM_OF_ISSUES";
        $scope.widget2.seriesKey = "PART";

//        $scope.widget2._id = "someuniqueid";
        $scope.widget2._datasourceConfig = {
            data: "line"
        };

        directiveBinder.bind($scope.widget2, myDS, {});

        // Fetch data after all widgets are loaded, and bind to datasource or event bus
        myDS.trigger("FETCH");

    }]);
});