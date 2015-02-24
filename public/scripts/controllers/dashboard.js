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
    controllers.controller('DashboardCtrl', ['$scope', '$rootScope', 'contextTree', '$q', function ($scope, $rootScope, contextTree, $q) {

        console.log("CONTEXTTREE:", contextTree);

        $scope.contextTree = contextTree;

        $scope.selectedContext =  function(contextDetails) {

            console.log(contextDetails);
            $scope.context = contextDetails;
            var defer = $q.defer();

            if(!contextDetails || !contextDetails.identifier || !contextDetails.name || !contextDetails.classification) {
                window.logger.error('context is not properly formatted with identifier, name, classification');
                defer.reject();
                return defer.promise;
            }

            $scope.context = contextDetails;
        };



        //$scope.context = null;

//
//        var firstViews = [{
//            "id": 51,
//            "name": "FirstView",
//            "widgets": [{
//                "cardId": "px-datagrid",
//                "name": "Datagrid",
//                "type": "datagrid",
//                "size": "full",
//                "cardVersion": "1.0.0",
//                "options": {"selectedSize": "full", "title": "Datagrid"},
//                "datasource": {
//                    "id": "mock-datagrid",
//                    "name": "MockDatagridDS",
//                    "type": "datagrid",
//                    "options": {"dataSet": "1"}
//                },
//                "displayOrder": 1
//            }],
//            "classification": "/classification/tire-classification-uri"
//        }];
//
//        $scope.firstContext = [[
//            {
//                "id": "mock-datagrid",
//                "name": "MockDatagridDS",
//                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/mockdatagrid",
//                "type": "datagrid",
//                "get": {
//                    "request": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "dataSet": {
//                                    "type": "string",
//                                    "title": "Data Set",
//                                    "enum": [
//                                        "1",
//                                        "2"
//                                    ]
//                                }
//                            },
//                            "required": [
//                                "dataSet"
//                            ]
//                        },
//                        "defaultOptions": {
//                            "dataSet": "1"
//                        }
//                    },
//                    "response": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "tableData": {
//                                    "type": "array",
//                                    "items": {
//                                        "type": "object"
//                                    }
//                                },
//                                "columns": {
//                                    "type": "array",
//                                    "items": {
//                                        "type": "object",
//                                        "properties": {
//                                            "field": {
//                                                "type": "string"
//                                            },
//                                            "type": {
//                                                "type": "string"
//                                            },
//                                            "inputType": {
//                                                "type": "string"
//                                            },
//                                            "inputSize": {
//                                                "type": "number"
//                                            },
//                                            "label": {
//                                                "type": "string"
//                                            }
//                                        },
//                                        "required": [
//                                            "field",
//                                            "type",
//                                            "inputType",
//                                            "inputSize",
//                                            "label"
//                                        ]
//                                    }
//                                }
//                            },
//                            "required": [
//                                "tableData",
//                                "columns"
//                            ]
//                        }
//                    }
//                }
//            },
//            {
//                "id": "mock-helloworld",
//                "name": "HelloWorldDS",
//                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/mockhelloworld",
//                "type": "hello-world",
//                "get": {
//                    "request": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "startTime": {
//                                    "type": "number",
//                                    "title": "Start Time",
//                                    "minimum": 0,
//                                    "maximum": 2000
//                                },
//                                "endTime": {
//                                    "type": "number",
//                                    "title": "End Time",
//                                    "minimum": 0,
//                                    "maximum": 3000
//                                }
//                            },
//                            "required": [
//                                "startTime",
//                                "endTime"
//                            ]
//                        },
//                        "defaultOptions": {
//                            "startTime": 1000,
//                            "endTime": 2000
//                        }
//                    },
//                    "response": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "title": {
//                                    "type": "string",
//                                    "items": {
//                                        "type": "object"
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }
//            },
//            {
//                "id": "bad-ds",
//                "name": "BadDS",
//                "url": "thiswontwork",
//                "type": "hello-world",
//                "get": {
//                    "request": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "startTime": {
//                                    "type": "number",
//                                    "title": "Start Time",
//                                    "minimum": 0,
//                                    "maximum": 2000
//                                },
//                                "endTime": {
//                                    "type": "number",
//                                    "title": "End Time",
//                                    "minimum": 0,
//                                    "maximum": 3000
//                                }
//                            },
//                            "required": [
//                                "startTime",
//                                "endTime"
//                            ]
//                        },
//                        "defaultOptions": {
//                            "startTime": -1
//                        }
//                    },
//                    "response": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "tableData": {
//                                    "type": "array"
//                                },
//                                "columns": {
//                                    "type": "array"
//                                }
//                            }
//                        }
//                    }
//                }
//            },
//            {
//                "id": "mock-timeseries",
//                "name": "MockTimeSeriesDs",
//                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/mocktimeseries",
//                "type": "time-series",
//                "get": {
//                    "request": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "timeFrameAmount": {
//                                    "type": "number",
//                                    "title": "Timeframe amount",
//                                    "minimum": 0
//                                },
//                                "timeFrameUnit": {
//                                    "type": "string",
//                                    "title": "Timeframe unit",
//                                    "enum": ["Hours", "Days", "Weeks", "Months", "Years"]
//                                },
//                                "samplingMode": {
//                                    "type": "string",
//                                    "title": "Sampling mode",
//                                    "enum": ["Rolling average", "Raw"]
//                                },
//                                "samplingRate": {
//                                    "type": "string",
//                                    "title": "Sampling rate",
//                                    "enum": [
//                                        "1 second",
//                                        "1 minute",
//                                        "1 hour",
//                                        "4 hours",
//                                        "24 hours"
//                                    ]
//                                }
//                            },
//                            "required": [
//                                "timeFrameAmount",
//                                "timeFrameUnit",
//                                "samplingMode",
//                                "samplingRate"
//                            ]
//                        },
//                        "defaultOptions": {
//                            "timeFrameAmount": 4,
//                            "timeFrameUnit": "Hours",
//                            "samplingMode": "Rolling average",
//                            "samplingRate": "1 minute"
//                        }
//                    },
//                    "response": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "series": {
//                                    "type": "array",
//                                    "items": {
//                                        "type": "object",
//                                        "properties": {
//                                            "name": {
//                                                "type": "string"
//                                            },
//                                            "data": {
//                                                "type": "array",
//                                                "items": {
//                                                    "type": "array",
//                                                    "items": [
//                                                        {
//                                                            "type": "number"
//                                                        },
//                                                        {
//                                                            "type": "number"
//                                                        }
//                                                    ],
//                                                    "minItems": 2
//                                                }
//                                            }
//                                        },
//                                        "required": [
//                                            "name",
//                                            "data"
//                                        ]
//                                    }
//                                }
//                            },
//                            "required": [
//                                "series"
//                            ]
//                        }
//                    }
//                }
//            },
//            {
//                "id": "echo-timeseries",
//                "name": "EchoTimeSeriesDs",
//                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/echo",
//                "type": "time-series",
//                "get": {
//                    "request": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "timeFrameAmount": {
//                                    "type": "number",
//                                    "title": "Timeframe amount",
//                                    "minimum": 0
//                                },
//                                "timeFrameUnit": {
//                                    "type": "string",
//                                    "title": "Timeframe unit",
//                                    "enum": ["Hours", "Days", "Weeks", "Months", "Years"]
//                                },
//                                "samplingMode": {
//                                    "type": "string",
//                                    "title": "Sampling mode",
//                                    "enum": ["Rolling average", "Raw"]
//                                },
//                                "samplingRate": {
//                                    "type": "string",
//                                    "title": "Sampling rate",
//                                    "enum": [
//                                        "1 second",
//                                        "1 minute",
//                                        "1 hour",
//                                        "4 hours",
//                                        "24 hours"
//                                    ]
//                                }
//                            },
//                            "required": [
//                                "timeFrameAmount",
//                                "timeFrameUnit",
//                                "samplingMode",
//                                "samplingRate"
//                            ]
//                        },
//                        "defaultOptions": {
//                            "timeFrameAmount": 4,
//                            "timeFrameUnit": "Hours",
//                            "samplingMode": "Rolling average",
//                            "samplingRate": "1 minute"
//                        }
//                    },
//                    "response": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "uri": {
//                                    "type": "string"
//                                }
//                            },
//                            "required": [
//                                "series"
//                            ]
//                        }
//                    }
//                }
//            },
//            {
//                "id": "badts-ds",
//                "name": "BadTimeSeriesDS",
//                "url": "thiswontwork",
//                "type": "time-series",
//                "get": {
//                    "request": {},
//                    "response": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "series": {
//                                    "type": "array",
//                                    "items": {
//                                        "type": "object",
//                                        "properties": {
//                                            "name": {
//                                                "type": "string"
//                                            },
//                                            "data": {
//                                                "type": "array",
//                                                "items": {
//                                                    "type": "array",
//                                                    "items": [
//                                                        {
//                                                            "type": "number"
//                                                        },
//                                                        {
//                                                            "type": "number"
//                                                        }
//                                                    ],
//                                                    "minItems": 2
//                                                }
//                                            }
//                                        },
//                                        "required": [
//                                            "name",
//                                            "data"
//                                        ]
//                                    }
//                                }
//                            },
//                            "required": [
//                                "series"
//                            ]
//                        }
//                    }
//                }
//            },
//            {
//                "id": "mock-other-type",
//                "name": "Other type",
//                "url": "http://dashboard-mock-server.ges-apps.ice.ge.com/qa/mockdatagrid",
//                "type": "othery-type",
//                "get": {
//                    "request": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {},
//                            "required": []
//                        },
//                        "defaultOptions": {}
//                    },
//                    "response": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {},
//                            "required": []
//                        }
//                    }
//                }
//            },
//            {
//                "id": "bad-datagrid",
//                "name": "BadDatagridDs",
//                "url": "bad/mockdatagrid",
//                "type": "datagrid",
//                "get": {
//                    "request": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "dataSet": {
//                                    "type": "string",
//                                    "title": "Data Set",
//                                    "enum": [
//                                        "1",
//                                        "2"
//                                    ]
//                                }
//                            },
//                            "required": [
//                                "dataSet"
//                            ]
//                        },
//                        "defaultOptions": {
//                            "dataSet": "1"
//                        }
//                    },
//                    "response": {
//                        "schema": {
//                            "type": "object",
//                            "properties": {
//                                "tableData": {
//                                    "type": "array",
//                                    "items": {
//                                        "type": "object"
//                                    }
//                                },
//                                "columns": {
//                                    "type": "array",
//                                    "items": {
//                                        "type": "object",
//                                        "properties": {
//                                            "field": {
//                                                "type": "string"
//                                            },
//                                            "type": {
//                                                "type": "string"
//                                            },
//                                            "inputType": {
//                                                "type": "string"
//                                            },
//                                            "inputSize": {
//                                                "type": "number"
//                                            },
//                                            "label": {
//                                                "type": "string"
//                                            }
//                                        },
//                                        "required": [
//                                            "field",
//                                            "type",
//                                            "inputType",
//                                            "inputSize",
//                                            "label"
//                                        ]
//                                    }
//                                }
//                            },
//                            "required": [
//                                "tableData",
//                                "columns"
//                            ]
//                        }
//                    }
//                }
//            }
//        ], firstViews];


    }]);
});
