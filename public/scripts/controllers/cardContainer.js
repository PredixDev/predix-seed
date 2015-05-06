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
], function(angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('CardContainerController', ['$scope', function($scope) {
        $scope.context1 = {
            name: 'This is context 1'
        };
        $scope.context2 = {
            name: 'This is context 2'
        };

        var myCard = document.querySelectorAll('demo-card');
        var eventHandler = function(e) {
            var attr = e.detail.attr;
            e.detail.card[attr] = {
                name: 'changing',
                url: e.detail.startDate
            };
        };
        for (i in myCard) {
            if (myCard[i].addEventListener) {
                myCard[i].addEventListener('px-change-attr', eventHandler);
            }
        }

        /*
         data for time series widget
         */
        var timeSeriesData = [
            {
                'sample_size': 1071,
                'results': [
                    {
                        'name': 'Winter 1970-1971',
                        'values': [
                            [
                                25833600000,
                                0
                            ],
                            [
                                27043200000,
                                0.6
                            ],
                            [
                                27734400000,
                                0.7
                            ],
                            [
                                28944000000,
                                0.8
                            ],
                            [
                                29548800000,
                                0.6
                            ],
                            [
                                30153600000,
                                0.6
                            ],
                            [
                                31190400000,
                                0.67
                            ],
                            [
                                31536000000,
                                0.81
                            ],
                            [
                                32140800000,
                                0.78
                            ],
                            [
                                32486400000,
                                0.98
                            ],
                            [
                                33782400000,
                                1.84
                            ],
                            [
                                34992000000,
                                1.8
                            ],
                            [
                                35683200000,
                                1.8
                            ],
                            [
                                36201600000,
                                1.92
                            ],
                            [
                                36892800000,
                                2.49
                            ],
                            [
                                37497600000,
                                2.79
                            ],
                            [
                                37843200000,
                                2.73
                            ],
                            [
                                38707200000,
                                2.61
                            ],
                            [
                                39398400000,
                                2.76
                            ],
                            [
                                39744000000,
                                2.82
                            ],
                            [
                                40348800000,
                                2.8
                            ],
                            [
                                42076800000,
                                2.1
                            ],
                            [
                                44064000000,
                                1.1
                            ],
                            [
                                45273600000,
                                0.25
                            ],
                            [
                                45532800000,
                                0
                            ]
                        ]
                    }
                ]
            }
        ];


        /*
         scope for time series widget
         */
        $scope.data = {
            queries: timeSeriesData,
            name: 'This is a name',
            thing: 'something else'
        };

    }]);
});
