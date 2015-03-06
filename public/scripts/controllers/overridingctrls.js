define(['angular', 'sample-module'], function(angular, controllers) {
    'use strict';

    controllers.controller('MattsCtrl', function ($scope, $controller) {

        //$scope.beforeRequest = function(datasourceOptions) {
        //    console.log(datasourceOptions);
        //    datasourceOptions.tags = $scope.tags;
        //    return datasourceOptions;
        //};

        $scope.$on('px-dashboard-event', function(event, name, tags){
            if(name !== 'abc'){
                return;
            }

            $scope.datasource.options.tags = tags;
            $scope.fetch($scope.datasource);
        });

        // Initialize the super class and extend it.
        angular.extend(this, $controller('WidgetRendererController', {$scope: $scope}));

        console.log(this);
        console.log($scope);

    });
});
