define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('SampleCtrl', ['$scope', function($scope) {

         document.getElementById("myDataTable").addEventListener("px-row-click", function(e) {
             var rowClicked = e.detail.row;
             console.log("Row clicked", rowClicked, rowClicked._selected);
         });

         document.getElementById("myDataTable").addEventListener("px-select-all-click", function(e) {
             var allSelectedRows = e.detail;
             console.log("Select/unselect all", allSelectedRows);
         });

         $scope.doSomethingWithSelectedRows = function() {
             $scope.allSelectedRows = document.getElementById("myDataTable").selectedRows;
         };

         window.mySampleDataTableCustomFunctions = {
                sortByEmailDomain: function(a, b) {
                    var aDomain = a.value.substring(a.value.indexOf("@") + 1, a.value.indexOf("."));
                    var bDomain = b.value.substring(b.value.indexOf("@") + 1, b.value.indexOf("."));
                    return this.descending
                        ? (aDomain < bDomain ? 1 : -1)
                        : (aDomain > bDomain ? 1 : -1);
                },
                filterMarkupVal: function(searchString, cellValue) {
                    var lhs = cellValue.slice(cellValue.indexOf('>') + 1);
                    var content = lhs.substr(0, lhs.indexOf('<'));

                    return (content.toString().toLowerCase().indexOf(searchString.toString().toLowerCase()) > -1);
                },
                filterWholeWord: function(searchString, cellValue) {
                    if(searchString === undefined || searchString === null || searchString === "") {
                        return true;
                    }
                    return (searchString.toString().toLowerCase() === cellValue.toString().toLowerCase());
                }
            };

        $scope.myData = [
            {
                "first": "Valentine",
                "last": "Meyer",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/iboldurev/73.jpg",
                "boolean": true,
                "guid": "8c3bd9ad-e8d6-4ea4-85e6-d145295f3f91",
                "integer": 99,
                "date": "Sat Feb 17 1973 03:45:57 GMT-0800 (PST)",
                "address": "4 Whitty Lane",
                "city": "Nicholson",
                "state": "South Carolina",
                "zip": 41343,
                "country": "Germany",
                "email": "valentinemeyer@scentric.com",
                "phone": "(956) 428-2996",
                "color": "<button class='btn' style='color:rgb(201,142,97);'>Blue Bottle cardigan</button>"
            },
            {
                "first": "Silva",
                "last": "Alexander",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/smalonso/73.jpg",
                "boolean": true,
                "guid": "37224065-ac71-4716-be9a-108ecddfee47",
                "integer": 16,
                "date": "Wed Aug 02 1995 07:03:12 GMT-0700 (PDT)",
                "address": "2 Berkeley Place",
                "city": "Manila",
                "state": "Michigan",
                "zip": 22009,
                "country": "Thailand",
                "email": "silvaalexander@gmail.com",
                "phone": "(823) 415-2224",
                "color": "<button class='btn' style='color:rgb(113,105,251);'>Freegan tilde</button>"
            },
            {
                "first": "Hopkins",
                "last": "Wong",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/taherrapee/73.jpg",
                "boolean": false,
                "guid": "1ea0922e-179d-4057-abeb-d8fe63e55da8",
                "integer": 94,
                "date": "Wed Sep 21 2011 04:03:55 GMT-0700 (PDT)",
                "address": "4 Tompkins Avenue",
                "city": "Movico",
                "state": "Maine",
                "zip": 89440,
                "country": "Seychelles",
                "email": "hopkinswong@hotmail.com",
                "phone": "(814) 488-2063",
                "color": "<button class='btn' style='color:rgb(133,126,66);'>bespoke gastropub</button>"
            },
            {
                "first": "Harriet",
                "last": "Sherman",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ismailmayat/73.jpg",
                "boolean": true,
                "guid": "46a4a1bc-97af-46e0-aedd-c3cc42e6b8f5",
                "integer": 27,
                "date": "Wed Jul 07 2010 05:48:57 GMT-0700 (PDT)",
                "address": "3 Stratford Road",
                "city": "Makena",
                "state": "Kansas",
                "zip": 21389,
                "country": "Chad",
                "email": "harrietsherman@scentric.com",
                "phone": "(887) 497-3612",
                "color": "<button class='btn' style='color:rgb(195,89,110);'>dreamcatcher fingerstache</button>"
            },
            {
                "first": "Stacie",
                "last": "Bartlett",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/carlyson/73.jpg",
                "boolean": false,
                "guid": "17aac57d-4644-44d8-8a6b-b2eedd3d42dc",
                "integer": 49,
                "date": "Sun Mar 14 1999 23:13:33 GMT-0800 (PST)",
                "address": "4 Luquer Street",
                "city": "Newcastle",
                "state": "Iowa",
                "zip": 72190,
                "country": "Uruguay",
                "email": "staciebartlett@scentric.com",
                "phone": "(957) 412-3261",
                "color": "<button class='btn' style='color:rgb(164,84,221);'>Etsy beard</button>"
            },
            {
                "first": "Lindsay",
                "last": "Meyer",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/iboldurev/73.jpg",
                "boolean": true,
                "guid": "8c3bd9ad-e8d6-4ea4-85e6-d145295f3f91",
                "integer": 99,
                "date": "Sat Feb 17 1973 03:45:57 GMT-0800 (PST)",
                "address": "4 Whitty Lane",
                "city": "Nicholson",
                "state": "South Carolina",
                "zip": 41343,
                "country": "Germany",
                "email": "lindsay@gmail.com",
                "phone": "(956) 428-2996",
                "color": "<button class='btn' style='color:rgb(201,142,97);'>Austin meggings</button>"
            },
            {
                "first": "Shelley",
                "last": "Alexander",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/smalonso/73.jpg",
                "boolean": true,
                "guid": "37224065-ac71-4716-be9a-108ecddfee47",
                "integer": 16,
                "date": "Wed Aug 02 1995 07:03:12 GMT-0700 (PDT)",
                "address": "2 Berkeley Place",
                "city": "Manila",
                "state": "Michigan",
                "zip": 22009,
                "country": "Thailand",
                "email": "shelley@hotmail.com",
                "phone": "(823) 415-2224",
                "color": "<button class='btn' style='color:rgb(113,105,251);'>Kitsch banjo</button>"
            },
            {
                "first": "Rita",
                "last": "Wong",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/taherrapee/73.jpg",
                "boolean": false,
                "guid": "1ea0922e-179d-4057-abeb-d8fe63e55da8",
                "integer": 94,
                "date": "Wed Sep 21 2011 04:03:55 GMT-0700 (PDT)",
                "address": "4 Tompkins Avenue",
                "city": "Movico",
                "state": "Maine",
                "zip": 89440,
                "country": "Seychelles",
                "email": "rita@yahoo.com",
                "phone": "(814) 488-2063",
                "color": "<button class='btn' style='color:rgb(133,126,66);'>Brooklyn authentic</button>"
            },
            {
                "first": "Joe",
                "last": "Sherman",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ismailmayat/73.jpg",
                "boolean": true,
                "guid": "46a4a1bc-97af-46e0-aedd-c3cc42e6b8f5",
                "integer": 27,
                "date": "Wed Jul 07 2010 05:48:57 GMT-0700 (PDT)",
                "address": "3 Stratford Road",
                "city": "Makena",
                "state": "Kansas",
                "zip": 21389,
                "country": "Chad",
                "email": "joejoe@yahoo.com",
                "phone": "(887) 497-3612",
                "color": "<button class='btn' style='color:rgb(195,89,110);'>Pickled cray scenester</button>"
            },
            {
                "first": "Jane",
                "last": "Bartlett",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/carlyson/73.jpg",
                "boolean": false,
                "guid": "17aac57d-4644-44d8-8a6b-b2eedd3d42dc",
                "integer": 49,
                "date": "Sun Mar 14 1999 23:13:33 GMT-0800 (PST)",
                "address": "4 Luquer Street",
                "city": "Newcastle",
                "state": "Iowa",
                "zip": 72190,
                "country": "Uruguay",
                "email": "jane@scentric.com",
                "phone": "(957) 412-3261",
                "color": "<button class='btn' style='color:rgb(164,84,221);'>8-bit migas</button>"
            }

        ];

    }]);
});
