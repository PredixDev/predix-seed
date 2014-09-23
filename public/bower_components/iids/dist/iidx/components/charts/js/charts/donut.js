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
        type: 'pie'
      },
      plotOptions: {
        pie: {
          innerSize: '60%'
        }
      }
    };
    return new Highcharts.Chart($.extend(true, {}, cfg, options));
  };
});
