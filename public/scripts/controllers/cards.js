define(['angular', 'sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('CardsCtrl', ['$scope', '$timeout', function($scope, $timeout) {

        window.deck = {
            getData: function() {
                return new Promise(function(resolve) {
                    $timeout(function(){
                        // on success
                        resolve(70);
                    }, 30);

                    // on failure
                    //reject('error');
                });
            }
        };

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

        $scope.context = {
            name: 'This is context',
            data: {
                queries: timeSeriesData
            }
        };

        $timeout(function(){
            $scope.context.name = 'This is a new context';
        }, 3000);

    }]);
});
