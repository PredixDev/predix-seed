/**
 * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
 * Customize your widgets by:
 *  - Overriding or extending widget API methods
 *  - Changing widget settings or options
 */
/* jshint unused: false */
define(['angular',
    'sample-module',
    'vruntime'
], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('CardContainerController', ['$scope',  function ($scope) {
        $scope.fromng = {
            name: 'fromng!!'
        };
        $scope.anotherthing = {
            name: 'another thing!!'
        };

        var myCard = document.querySelectorAll('demo-card');
        var eventHandler    = function(e){
            var attr = e.detail.attr;
            e.detail.card[attr] = {
                name: 'changing',
                url: e.detail.startDate
            };
        };
        for(i in myCard){
            if(myCard[i].addEventListener){
                myCard[i].addEventListener('px-change-attr',eventHandler);
            }
        }

    }]);
});
