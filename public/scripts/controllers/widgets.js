define(['angular', 'sample-module', '../../bower_components/px-datagrid/main', '../../bower_components/px-time-series/main'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('WidgetsCtrl', ['$scope', function($scope) {
        $scope.name = 'Widgets';

        /*
         data for time series widget
         */
        var timeSeriesData = [
            {
                'name': 'Winter 2007-2008',
                'data': [
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
                    ]
                ]
            },
            {
                'name': 'Winter 2008-2009',
                'data': [
                    [
                        25056000000,
                        0
                    ],
                    [
                        25747200000,
                        0.2
                    ],
                    [
                        28857600000,
                        0.47
                    ],
                    [
                        29721600000,
                        0.55
                    ],
                    [
                        30931200000,
                        1.38
                    ]
                ]
            },
            {
                'name': 'Winter 2009-2010',
                'data': [
                    [
                        24278400000,
                        0
                    ],
                    [
                        24710400000,
                        0.15
                    ],
                    [
                        28598400000,
                        0.35
                    ],
                    [
                        29808000000,
                        0.46
                    ],
                    [
                        31536000000,
                        0.59
                    ]
                ]
            }
        ];

        /*
         scope for time series widget
         */
        $scope.timeSeries = {
            title: 'Time Series Chart',
            series: timeSeriesData,
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
