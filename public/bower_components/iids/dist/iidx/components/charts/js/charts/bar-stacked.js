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
        type: 'bar'
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      }
    };
    return new Highcharts.Chart($.extend(true, {}, cfg, options));
  };
});
