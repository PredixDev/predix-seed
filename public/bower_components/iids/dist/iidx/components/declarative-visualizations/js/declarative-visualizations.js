define([
    'declarative-visualizations/bar',
    'declarative-visualizations/donut',
    'declarative-visualizations/gauge',
    'declarative-visualizations/meter',
    'declarative-visualizations/pill',
    'declarative-visualizations/speedometer',
    'declarative-visualizations/spiderweb',
    'declarative-visualizations/calendar',
    'declarative-visualizations/histogram'
  ], function(bar, donut, gauge, meter, pill, speedometer, spiderweb, calendar, histogram) {
    'use strict';
    return {
      bar: bar,
      donut: donut,
      gauge: gauge,
      meter: meter,
      pill: pill,
      speedometer: speedometer,
      spiderweb: spiderweb,
      calendar: calendar,
      histogram: histogram
    };
  }
);
