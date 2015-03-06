define(['angular', 'sample-module'], function(angular, controllers) {
    'use strict';

    controllers.controller('MattsCtrl', function ($scope, $controller) {

        $scope.beforeRequest = function(datasourceOptions) {
            console.log(datasourceOptions);
            datasourceOptions.tags = ['tag1', 'tag2', 'tagz'];
            return datasourceOptions;
        };

        // Initialize the super class and extend it.
        angular.extend(this, $controller('WidgetRendererController', {$scope: $scope}));

        console.log(this);
        console.log($scope);

    });
});
