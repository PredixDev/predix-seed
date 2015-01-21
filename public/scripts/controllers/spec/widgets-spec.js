/* jshint unused:false */
define(['angular-mocks', 'app'], function(mocks, app) {
    'use strict';
    describe('Testing WidgetsCtrl:', function() {
        beforeEach(module('myapp'));

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

            it('has the series', function() {
                expect($scope.timeSeries.series.length).toBe(3);
                expect($scope.timeSeries.series[0]).toEqual({
                    name: 'Winter 2007-2008',
                    data: [[25833600000, 0], [27043200000, 0.6], [27734400000, 0.7], [28944000000, 0.8], [29548800000, 0.6]]
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
