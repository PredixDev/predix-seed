require.config({
  shim: {
    'jQuery-contextMenu': ['jquery']
  }
});

define([
  'jquery',
  'jQuery-contextMenu'
], function($) {
  'use strict';
  return $;
});
