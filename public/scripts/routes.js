/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define(['angular', 'angular-ui-router', 'px-oauth'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router', 'predix.oauth']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('root', {
                templateUrl: 'views/root.html',  // Provide a common root template for all states (i.e. nav-bar)
                abstract: true,
                parent: 'secure'                        // On initial load, ensures oauth token exists
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                parent: 'root'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                parent: 'root'
            })
            .state('widgets', {
                url: '/widgets',
                templateUrl: 'views/widgets.html',
                controller: 'WidgetsCtrl',
                parent: 'root'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                parent: 'root',
                resolve: {
                    contextTree: function(ContextBrowserService) {
                        return ContextBrowserService.loadContextTree();
                    },
                    widgets: function(WidgetLoaderService) {
                        return WidgetLoaderService.loadWidgets();
                    }
                }
            })
            .state('alarm', {
                url: '/alarm',
                templateUrl: 'views/alarm.html',
                controller: 'AlarmCtrl',
                resolve: {
                    context: function($q) {
                        var deferred = $q.defer();

                        var views = [{
                            "id": 51,
                            "name": "my first view",
                            "widgets": [{
                                "cardId": "px-datagrid",
                                "name": "Datagrid",
                                "type": "datagrid",
                                "size": "half",
                                "cardVersion": "1.0.0",
                                "options": {"selectedSize": "half", "title": "Datagrid"},
                                "datasource": {
                                    "id": "mock-datagrid",
                                    "name": "MockDatagridDS",
                                    "type": "datagrid",
                                    "options": {"dataSet": "2"}
                                },
                                "displayOrder": 1
                            }, {
                                "cardId": "px-timeseries",
                                "name": "Time Series",
                                "type": "time-series",
                                "size": "full",
                                "cardVersion": "1.0.0",
                                "options": {
                                    "selectedSize": "full",
                                    "title": "Time Series Data",
                                    "plotType": "line",
                                    "showYAxisUnits": true
                                },
                                "datasource": {
                                    "id": "mock-timeseries",
                                    "name": "MockTimeSeriesDs",
                                    "type": "time-series",
                                    "options": {
                                        "timeFrameAmount": 4,
                                        "timeFrameUnit": "Hours",
                                        "samplingMode": "Rolling average",
                                        "samplingRate": "1 minute"
                                    }
                                },
                                "displayOrder": 2
                            }],
                            "classification": "/classification/tire-classification-uri"
                        },
                            {
                                "id": 56,
                                "name": "mysecondview",
                                "widgets": [
                                    {
                                        "cardId": "px-timeseries",
                                        "name": "Time Series",
                                        "type": "time-series",
                                        "size": "full",
                                        "cardVersion": "1.0.0",
                                        "options": {
                                            "selectedSize": "full",
                                            "title": "Time Series Data",
                                            "plotType": "line",
                                            "showYAxisUnits": true
                                        },
                                        "datasource": {
                                            "id": "mock-timeseries",
                                            "name": "MockTimeSeriesDs",
                                            "type": "time-series",
                                            "options": {
                                                "timeFrameAmount": 4,
                                                "timeFrameUnit": "Hours",
                                                "samplingMode": "Rolling average",
                                                "samplingRate": "1 minute"
                                            }
                                        },
                                        "displayOrder": 2
                                    }
                                ],
                                "classification": "/classification/tire-classification-uri"
                            }];
                        var datasources = [
                            {
                                "id": "mock-datagrid",
                                "name": "MockDatagridDS",
                                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/mockdatagrid",
                                "type": "datagrid",
                                "get": {
                                    "request": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "dataSet": {
                                                    "type": "string",
                                                    "title": "Data Set",
                                                    "enum": [
                                                        "1",
                                                        "2"
                                                    ]
                                                }
                                            },
                                            "required": [
                                                "dataSet"
                                            ]
                                        },
                                        "defaultOptions": {
                                            "dataSet": "1"
                                        }
                                    },
                                    "response": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "tableData": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "object"
                                                    }
                                                },
                                                "columns": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "object",
                                                        "properties": {
                                                            "field": {
                                                                "type": "string"
                                                            },
                                                            "type": {
                                                                "type": "string"
                                                            },
                                                            "inputType": {
                                                                "type": "string"
                                                            },
                                                            "inputSize": {
                                                                "type": "number"
                                                            },
                                                            "label": {
                                                                "type": "string"
                                                            }
                                                        },
                                                        "required": [
                                                            "field",
                                                            "type",
                                                            "inputType",
                                                            "inputSize",
                                                            "label"
                                                        ]
                                                    }
                                                }
                                            },
                                            "required": [
                                                "tableData",
                                                "columns"
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "id": "mock-helloworld",
                                "name": "HelloWorldDS",
                                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/mockhelloworld",
                                "type": "hello-world",
                                "get": {
                                    "request": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "startTime": {
                                                    "type": "number",
                                                    "title": "Start Time",
                                                    "minimum": 0,
                                                    "maximum": 2000
                                                },
                                                "endTime": {
                                                    "type": "number",
                                                    "title": "End Time",
                                                    "minimum": 0,
                                                    "maximum": 3000
                                                }
                                            },
                                            "required": [
                                                "startTime",
                                                "endTime"
                                            ]
                                        },
                                        "defaultOptions": {
                                            "startTime": 1000,
                                            "endTime": 2000
                                        }
                                    },
                                    "response": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "title": {
                                                    "type": "string",
                                                    "items": {
                                                        "type": "object"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                "id": "bad-ds",
                                "name": "BadDS",
                                "url": "thiswontwork",
                                "type": "hello-world",
                                "get": {
                                    "request": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "startTime": {
                                                    "type": "number",
                                                    "title": "Start Time",
                                                    "minimum": 0,
                                                    "maximum": 2000
                                                },
                                                "endTime": {
                                                    "type": "number",
                                                    "title": "End Time",
                                                    "minimum": 0,
                                                    "maximum": 3000
                                                }
                                            },
                                            "required": [
                                                "startTime",
                                                "endTime"
                                            ]
                                        },
                                        "defaultOptions": {
                                            "startTime": -1
                                        }
                                    },
                                    "response": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "tableData": {
                                                    "type": "array"
                                                },
                                                "columns": {
                                                    "type": "array"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                "id": "mock-timeseries",
                                "name": "MockTimeSeriesDs",
                                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/mocktimeseries",
                                "type": "time-series",
                                "get": {
                                    "request": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "timeFrameAmount": {
                                                    "type": "number",
                                                    "title": "Timeframe amount",
                                                    "minimum": 0
                                                },
                                                "timeFrameUnit": {
                                                    "type": "string",
                                                    "title": "Timeframe unit",
                                                    "enum": ["Hours", "Days", "Weeks", "Months", "Years"]
                                                },
                                                "samplingMode": {
                                                    "type": "string",
                                                    "title": "Sampling mode",
                                                    "enum": ["Rolling average", "Raw"]
                                                },
                                                "samplingRate": {
                                                    "type": "string",
                                                    "title": "Sampling rate",
                                                    "enum": [
                                                        "1 second",
                                                        "1 minute",
                                                        "1 hour",
                                                        "4 hours",
                                                        "24 hours"
                                                    ]
                                                }
                                            },
                                            "required": [
                                                "timeFrameAmount",
                                                "timeFrameUnit",
                                                "samplingMode",
                                                "samplingRate"
                                            ]
                                        },
                                        "defaultOptions": {
                                            "timeFrameAmount": 4,
                                            "timeFrameUnit": "Hours",
                                            "samplingMode": "Rolling average",
                                            "samplingRate": "1 minute"
                                        }
                                    },
                                    "response": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "series": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "object",
                                                        "properties": {
                                                            "name": {
                                                                "type": "string"
                                                            },
                                                            "data": {
                                                                "type": "array",
                                                                "items": {
                                                                    "type": "array",
                                                                    "items": [
                                                                        {
                                                                            "type": "number"
                                                                        },
                                                                        {
                                                                            "type": "number"
                                                                        }
                                                                    ],
                                                                    "minItems": 2
                                                                }
                                                            }
                                                        },
                                                        "required": [
                                                            "name",
                                                            "data"
                                                        ]
                                                    }
                                                }
                                            },
                                            "required": [
                                                "series"
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "id": "echo-timeseries",
                                "name": "EchoTimeSeriesDs",
                                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/echo",
                                "type": "time-series",
                                "get": {
                                    "request": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "timeFrameAmount": {
                                                    "type": "number",
                                                    "title": "Timeframe amount",
                                                    "minimum": 0
                                                },
                                                "timeFrameUnit": {
                                                    "type": "string",
                                                    "title": "Timeframe unit",
                                                    "enum": ["Hours", "Days", "Weeks", "Months", "Years"]
                                                },
                                                "samplingMode": {
                                                    "type": "string",
                                                    "title": "Sampling mode",
                                                    "enum": ["Rolling average", "Raw"]
                                                },
                                                "samplingRate": {
                                                    "type": "string",
                                                    "title": "Sampling rate",
                                                    "enum": [
                                                        "1 second",
                                                        "1 minute",
                                                        "1 hour",
                                                        "4 hours",
                                                        "24 hours"
                                                    ]
                                                }
                                            },
                                            "required": [
                                                "timeFrameAmount",
                                                "timeFrameUnit",
                                                "samplingMode",
                                                "samplingRate"
                                            ]
                                        },
                                        "defaultOptions": {
                                            "timeFrameAmount": 4,
                                            "timeFrameUnit": "Hours",
                                            "samplingMode": "Rolling average",
                                            "samplingRate": "1 minute"
                                        }
                                    },
                                    "response": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "uri": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": [
                                                "series"
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "id": "badts-ds",
                                "name": "BadTimeSeriesDS",
                                "url": "thiswontwork",
                                "type": "time-series",
                                "get": {
                                    "request": {},
                                    "response": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "series": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "object",
                                                        "properties": {
                                                            "name": {
                                                                "type": "string"
                                                            },
                                                            "data": {
                                                                "type": "array",
                                                                "items": {
                                                                    "type": "array",
                                                                    "items": [
                                                                        {
                                                                            "type": "number"
                                                                        },
                                                                        {
                                                                            "type": "number"
                                                                        }
                                                                    ],
                                                                    "minItems": 2
                                                                }
                                                            }
                                                        },
                                                        "required": [
                                                            "name",
                                                            "data"
                                                        ]
                                                    }
                                                }
                                            },
                                            "required": [
                                                "series"
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "id": "mock-other-type",
                                "name": "Other type",
                                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/mockdatagrid",
                                "type": "othery-type",
                                "get": {
                                    "request": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {},
                                            "required": []
                                        },
                                        "defaultOptions": {}
                                    },
                                    "response": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {},
                                            "required": []
                                        }
                                    }
                                }
                            },
                            {
                                "id": "bad-datagrid",
                                "name": "BadDatagridDs",
                                "url": "bad/mockdatagrid",
                                "type": "datagrid",
                                "get": {
                                    "request": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "dataSet": {
                                                    "type": "string",
                                                    "title": "Data Set",
                                                    "enum": [
                                                        "1",
                                                        "2"
                                                    ]
                                                }
                                            },
                                            "required": [
                                                "dataSet"
                                            ]
                                        },
                                        "defaultOptions": {
                                            "dataSet": "1"
                                        }
                                    },
                                    "response": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "tableData": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "object"
                                                    }
                                                },
                                                "columns": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "object",
                                                        "properties": {
                                                            "field": {
                                                                "type": "string"
                                                            },
                                                            "type": {
                                                                "type": "string"
                                                            },
                                                            "inputType": {
                                                                "type": "string"
                                                            },
                                                            "inputSize": {
                                                                "type": "number"
                                                            },
                                                            "label": {
                                                                "type": "string"
                                                            }
                                                        },
                                                        "required": [
                                                            "field",
                                                            "type",
                                                            "inputType",
                                                            "inputSize",
                                                            "label"
                                                        ]
                                                    }
                                                }
                                            },
                                            "required": [
                                                "tableData",
                                                "columns"
                                            ]
                                        }
                                    }
                                }
                            }
                        ];

                        var myContext = {
                            id: 'someid',
                            name: 'somename',
                            classification: 'someclassif',
                            datasources: datasources,
                            views: views
                        };

                        deferred.resolve(myContext);
                        return deferred.promise;
                    },
                    widgets: ["WidgetLoaderService", function(WidgetLoaderService) {
                        return WidgetLoaderService.loadWidgets();
                    }]
                },
                parent: 'root'
            });

        $urlRouterProvider
            .otherwise('home');
    }]);
});
