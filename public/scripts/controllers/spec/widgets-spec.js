/* jshint unused:false */
define(['angular-mocks', 'app'], function(mocks, app) {
    'use strict';
    describe('Testing WidgetsCtrl:', function() {
        beforeEach(module('predixApp'));

        var $scope, ctrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('WidgetsCtrl', {
                $scope: $scope
            });
        }));

        it('should have correct name on $scope', function() {
            expect($scope.name).toBe('Widgets');
        });

        describe('should have the datagrid scope', function() {

            it('has the title', function() {
                expect($scope.datagrid.title).toBe('Datagrid');
            });

            it('has the tableData', function() {
                expect($scope.datagrid.tableData.length).toBe(6);
                expect($scope.datagrid.tableData[0]).toEqual({
                    sensorId: 1,
                    value: 1432,
                    timestamp: 'Mon Sep 22 2014 12:35:40 GMT-0700 (PDT)',
                    quality: 'Good'
                });
            });

            it('has the columns', function() {
                expect($scope.datagrid.columns.length).toBe(4);
                expect($scope.datagrid.columns[0]).toEqual({
                    field: 'sensorId',
                    type: 'string',
                    inputType: 'text',
                    inputSize: 5,
                    label: 'ID'
                });
            });

        });

        describe('should have the timeseries scope', function() {

            it('has the title', function() {
                expect($scope.timeSeries.title).toBe('Time Series Chart');
            });

            it('has the queries', function() {
                expect($scope.timeSeries.queries[0].results.length).toBe(1);
                expect($scope.timeSeries.queries[0].results[0]).toEqual({
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
                });
            });

            it('has the showYAxisUnits', function() {
                expect($scope.timeSeries.showYAxisUnits).toBe(true);
            });

            it('has the plotType', function() {
                expect($scope.timeSeries.plotType).toBe('line');
            });
        });
    });

});
