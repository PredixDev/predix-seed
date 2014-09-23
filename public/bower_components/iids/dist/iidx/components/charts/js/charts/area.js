// Test to change theme, need to extract both these into components included by charts
define([
  'charts-theme',
  'highstock'
], function (theme) {
  'use strict';
  Highcharts.setOptions(theme);
  return function (el, options) {
    var cfg = {
      chart: {
        renderTo: el,
        type: 'area'
      }
    };
    return new Highcharts.Chart($.extend(true, {}, cfg, options));
  };
});
