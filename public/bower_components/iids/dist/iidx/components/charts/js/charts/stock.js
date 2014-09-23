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
        type: 'line'
      }
    };
    // HighStock ignores some options set by theme - so use them as the base we pass in
    // this will be fixed in a future version
    // https://github.com/highslide-software/highcharts.com/commit/884c19926ef662c0546eb70b36246b3757b506a9
    var base = Highcharts.getOptions();
    return new Highcharts.StockChart($.extend(true, {}, base, cfg, options));
  };
});
