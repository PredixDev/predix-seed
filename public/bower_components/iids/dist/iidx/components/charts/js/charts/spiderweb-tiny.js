define([
  'brandkit',
  'highcharts-more'
], function (brandkit) {
  'use strict';
  return function (el, options) {
    var cfg = {
      colors: [ brandkit.monochromePalette.grayLighter, brandkit.accentPalette.cyan, brandkit.accentPalette.cyan],
      chart: {
        renderTo: el,
        polar: true,
        type: 'area'
      },
      pane: {
        size: '15%',
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        offset: 0,
        tickmarkPlacement: 'on',
        gridLineWidth: 1,
        gridLineColor: brandkit.monochromePalette.grayLighter,
        labels: {
          enabled: false,
        },
      },
      yAxis: {
        offset: 0,
        tickInterval: options.yAxis.max,
        gridLineWidth: 1,
        gridLineColor: brandkit.monochromePalette.grayLighter,
        gridLineInterpolation: 'polygon',
        labels: {
          enabled: false,
        },
      },
      plotOptions: {
        series: {
          lineWidth: 0,
          fillOpacity: 1,
          enableMouseTracking: false,
        },
      },
    };
    options.series[0].visible = false;
    options.series[1].visible = false;
    options.series[2].visible = true;
    return new Highcharts.Chart($.extend(true, {}, cfg, options));
  };
});