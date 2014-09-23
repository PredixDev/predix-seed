define([
  'charts/area',
  'charts/area-stacked',
  'charts/bar',
  'charts/bar-stacked',
  'charts/column',
  'charts/column-stacked',
  'charts/column-stacked-percent',
  'charts/donut',
  'charts/line',
  'charts/pie',
  'charts/scatter',
  'charts/spiderweb',
  'charts/spiderweb-comparison',
  'charts/spiderweb-tiny',
  'charts/stock',
  'charts/spline'
], function (area, areaStacked, bar, barStacked, column, columnStacked, columnStackedPercent, donut, line, pie, scatter, spiderweb, spiderwebComparison, spiderwebTiny, stock, spline) {
  'use strict';
  return {
    area: area,
    areaStacked: areaStacked,
    bar: bar,
    barStacked: barStacked,
    column: column,
    columnStacked: columnStacked,
    columnStackedPercent: columnStackedPercent,
    donut: donut,
    line: line,
    pie: pie,
    scatter: scatter,
    spiderweb: spiderweb,
    spiderwebComparison: spiderwebComparison,
    spiderwebTiny: spiderwebTiny,
    stock: stock,
    spline: spline
  };
});
