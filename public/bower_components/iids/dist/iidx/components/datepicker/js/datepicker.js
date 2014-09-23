require.config({
  shim: {
    'bootstrap-datepicker': ['jquery']
  }
});

define([
  'jquery',
  'bootstrap-datepicker'
], function($) {
  'use strict';

  var isTouchDevice = 'ontouchstart' in document.documentElement;

  if (isTouchDevice) {
    $('.datepicker').attr('type', 'date');
  } else {
    $('.datepicker').datepicker({
      autoclose: false,
      todayBtn: true,
      todayHighlight: true
    });

    $('.datepicker').next('.btn').click(function(e) {
      $(this).prev('.datepicker').focus();
    });
  }

  return $;
});
