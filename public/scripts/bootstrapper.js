/* jshint undef: true, unused: false */
require(['config'], function(config) {
    'use strict';
    require(['angular', 'app', 'vruntime'], function(angular, app, vRuntime) {

        //Enable logging to the console. (levels are INFO -0, SUCCESS -1, WARN -2, ERROR -3 , NONE -4)
        //Set global logging level to ERROR
        vRuntime.logger.global.setGlobalLevel(vRuntime.logger.global.ERROR);

        //vRuntime.logger.log(config);

        //start angular application here
        //See https://code.google.com/p/dart/issues/detail?id=18065 for an explanation of why
        //using just 'document' here doesn't work with the webcomonents.js polyfill in polyfilled browsers
        angular.bootstrap(document.querySelector('body'), [app.name]);
    });
});
