/* jshint undef: true, unused: false */
require(['config'], function(config) {
    'use strict';
    require(['angular', 'app'], function(angular, app) {

        //start angular application here
        //See https://code.google.com/p/dart/issues/detail?id=18065 for an explanation of why
        //using just 'document' here doesn't work with the webcomonents.js polyfill in polyfilled browsers
        angular.bootstrap(document.querySelector('body'), [app.name]);
    });
});
