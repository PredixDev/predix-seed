define([
    'declarative-visualizations/bar',
    'declarative-visualizations/donut',
    'declarative-visualizations/gauge',
    'declarative-visualizations/meter',
    'declarative-visualizations/pill',
    'declarative-visualizations/hdx-speedometer',
    'declarative-visualizations/spiderweb'
  ], function(bar, donut, gauge, meter, pill, speedometer, spiderweb) {
    'use strict';
    return {
      bar: bar,
      donut: donut,
      gauge: gauge,
      meter: meter,
      pill: pill,
      speedometer: speedometer,
      spiderweb: spiderweb
    };
  }
);
