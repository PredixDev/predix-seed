define(['angular', 'sample-module', 'bower_components/px-datagrid/src/main', 'bower_components/px-time-series/src/main'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('WidgetsCtrl', ['$scope', function($scope) {
        $scope.name = 'Widgets';

        /*
         data for time series widget
         */
        var timeSeriesData =  [
                {
                    'sample_size': 1071,
                    'results': [
                        {
                            'name': 'Winter 2007-2008',
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
        $scope.timeSeries = {
            title: 'Time Series Chart',
            queries: timeSeriesData,
            showYAxisUnits: true,
            plotType: 'line'
        };

        /*
         data for data grid widget
         */
        var dataGridData = [
            {
                'sensorId': 1,
                'value': 1432,
                'timestamp': 'Mon Sep 22 2014 12:35:40 GMT-0700 (PDT)',
                'quality': 'Good'
            },
            {
                'sensorId': 2,
                'value': 1857,
                'timestamp': 'Mon Sep 22 2014 12:34:40 GMT-0700 (PDT)',
                'quality': 'Good'
            },
            {
                'sensorId': 3,
                'value': 720,
                'timestamp': 'Mon Sep 22 2014 12:33:40 GMT-0700 (PDT)',
                'quality': 'Poor'
            },
            {
                'sensorId': 4,
                'value': 2600,
                'timestamp': 'Mon Sep 22 2014 12:32:40 GMT-0700 (PDT)',
                'quality': 'Excellent'
            },
            {
                'sensorId': 5,
                'value': 530,
                'timestamp': 'Mon Sep 22 2014 12:31:40 GMT-0700 (PDT)',
                'quality': 'Poor'
            },
            {
                'sensorId': 3,
                'value': 2134,
                'timestamp': 'Mon Sep 22 2014 12:30:40 GMT-0700 (PDT)',
                'quality': 'Excellent'
            }
        ];

        var dataGridColumns = [
            {
                'field': 'sensorId',
                'type': 'string',
                'inputType': 'text',
                'inputSize': 5,
                'label': 'ID'
            },
            {
                'field': 'timestamp',
                'type': 'date',
                'inputType': 'text',
                'inputSize': 20,
                'label': 'Timestamp'
            },
            {
                'field': 'quality',
                'type': 'enum',
                'inputType': 'select',
                'label': 'Quality',
                'options': [
                    {
                        'label': 'One',
                        'option': 1
                    },
                    {
                        'label': 'Two',
                        'option': 2
                    },
                    {
                        'label': 'Three',
                        'option': 3
                    }
                ]
            },
            {
                'field': 'value',
                'type': 'number',
                'inputType': 'text',
                'inputSize': 10,
                'label': 'Value'
            }
        ];

        /*
         scope for data grid widget
         */
        $scope.datagrid = {
            title: 'Datagrid',
            tableData: dataGridData,
            columns: dataGridColumns
        };
    }]);
});
