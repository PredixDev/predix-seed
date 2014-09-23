define([
  'brandkit',
  'highcharts-more'
], function (brandkit) {
  'use strict';
  return function(el, options) {
    var cfg = {
      colors: [ brandkit.monochromePalette.grayLighter, brandkit.accentPalette.cyan, brandkit.accentPalette.cyan],
      chart: {
        renderTo: el,
        polar: true,
        type: 'line'
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        offset: 0,
        tickmarkPlacement: 'on',
        gridLineWidth: 1,
        gridLineColor: brandkit.monochromePalette.grayLighter,
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
          marker: {
            radius: 3,
            symbol: 'circle',
          }
        },
        area: {
          lineWidth: 0,
          fillOpacity: 0.5,
          enableMouseTracking: false,
        },
      },
    };
    options.series[0].type = 'area';
    options.series[1].dashStyle = 'ShortDot';
    options.series[0].visible = true;
    options.series[1].visible = true;
    options.series[2].visible = true;
    return new Highcharts.Chart($.extend(true, {}, cfg, options));
  };
});