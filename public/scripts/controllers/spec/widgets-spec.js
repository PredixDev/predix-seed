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

        describe('should have the timeseries scope', function() {

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
        });
    });

});
