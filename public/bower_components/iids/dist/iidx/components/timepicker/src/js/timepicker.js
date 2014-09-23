'use strict';

define(['jquery', 'oo-utils', 'bootstrap-timepicker'], function ($, ooUtils) {
    
    ooUtils.makePlugin("ge-timepicker", {
        init: function (options, elm) {
            $(elm).timepicker(options);
            return this;
        }
    });

});