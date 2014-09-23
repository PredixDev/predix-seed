require.config({
  shim: {
    'bootstrap/bootstrap-transition': ['jquery'],
    'bootstrap/bootstrap-affix': ['jquery'],
    'bootstrap/bootstrap-alert': ['jquery'],
    'bootstrap/bootstrap-button': ['jquery'],
    'bootstrap/bootstrap-carousel': ['jquery', 'bootstrap/bootstrap-transition'],
    'bootstrap/bootstrap-collapse': ['jquery', 'bootstrap/bootstrap-transition'],
    'bootstrap/bootstrap-dropdown': ['jquery'],
    'bootstrap/bootstrap-modal': ['jquery', 'bootstrap/bootstrap-transition'],
    'bootstrap/bootstrap-popover': ['jquery', 'bootstrap/bootstrap-tooltip'],
    'bootstrap/bootstrap-scrollspy': ['jquery'],
    'bootstrap/bootstrap-tab': ['jquery'],
    'bootstrap/bootstrap-tooltip': ['jquery'],
    'bootstrap/bootstrap-typeahead': ['jquery'],
    'ge-bootstrap/accordion': ['jquery']
  }
});

define([
    'jquery',
    'bootstrap/bootstrap-affix',
    'bootstrap/bootstrap-alert',
    'bootstrap/bootstrap-button',
    'bootstrap/bootstrap-modal',
    'bootstrap/bootstrap-scrollspy',
    'bootstrap/bootstrap-tab',
    'bootstrap/bootstrap-tooltip',
    'bootstrap/bootstrap-transition',
    'bootstrap/bootstrap-typeahead',
    'bootstrap/bootstrap-carousel',
    'bootstrap/bootstrap-collapse',
    'bootstrap/bootstrap-dropdown',
    'bootstrap/bootstrap-popover',
    'ge-bootstrap/accordion'
  ], function($) {
    'use strict';
    return $;
  }
);
