define([
  'jquery',
  'd3-amd'
  ], function ($, d3) {
    'use strict';
    return function (element) {

      var data = {};
      var el = $(element);
      var dataURL;
      if(el.data('target') === undefined || el.data('target') === 'self' || el.data('target').length == 0) {
          dataURL = 'self';
      }
      else{
          dataURL = el.data('target');
      }

      var width = data.width = el.width(),
          height = data.height = el.height(),
          tickRadius = 3.5,
          labelHeight = 18,
          tweenDuration = el.data('duration') || 0;

      var r1 = Math.min(width/2, height - labelHeight), // pull in slightly for antialiasing slop
          r2 = r1 * 0.6,
          a1 = -Math.PI/2,
          a2 = Math.PI/2;

      // measure of the distance between the outter and inner radius of the gauge
      var arc_width = r1 - r2;

      var gauge = d3.select(element);
      var svg = gauge.append('svg')
          .attr('class', 'visualization-gauge')
          .attr('viewBox', [0,0,width,height])
          .attr('preserveAspectRatio', 'xMinYMid');
      var g = svg.append("svg:g")
          // add 1 pixel for antialiasing slop
          .attr('transform', 'translate(' + (r1) + ',' + (r1) + ')');

      var bg_arc = d3.svg.arc()    //background arc
          .outerRadius(r1)
          .innerRadius(r2)
          .startAngle(a1)
          .endAngle(a2);

      g.append("svg:path")
          .attr("class", "bg")
          .attr("d", bg_arc);

      g.append('svg:circle')  //tick dot
          .attr('r', tickRadius)
          .attr('cx', -(r1+r2)/2)
          .attr('class', 'tick')
          .attr('fill', 'white');

      var scale = ((r1+r2)/2)/100;    //needle
      g.append('svg:path')
          .attr('class', 'needle')
          .attr('d', 'M0.114-5.802c0,0,96.298,4.273,97.08,4.316c1.071,0.06,1.091,3.233-0.035,3.32C96.609,1.876,1.683,5.78,0.114,5.802C-2.71,1.946-2.698-1.75,0.114-5.802z')
          .attr('transform', function(d, i) { return 'rotate(-180)' + ' ' + 'scale(' + scale + ')'})
          .attr('fill', 'black');

      g.append('text')    //min label
          
          .attr('class', 'labelMin label voice-data')
          .attr('text-anchor', 'middle')
          .attr('transform', 'translate(' + (-(r1 + r2)/2) + ', 15)');

      g.append('text')    //max label
          
          .attr('class', 'labelMax label voice-data')
          .attr('text-anchor', 'middle')
          .attr('transform', 'translate(' + ((r1 + r2)/2) + ', 15)');

      function updateViz() {
          el.removeData(); // clear out $.cache so calls to $.fn.data will work
          svg.select('.needle')
              .transition()
              .duration(tweenDuration)
              .attr('transform', function(d, i) {
                  return 'rotate(' + (-180 + 180 * data.value/(data.max-data.min)) + ')' + ' ' + 'scale(' + scale + ')'
              });
          var label_min = svg.select('.labelMin').text(data.labelMin);
          var label_max = svg.select('.labelMax').text(data.labelMax);
          var tickCircle = svg.select("circle");
          (data.threshold !== null)? tickCircle.attr('display', 'visible').attr('transform', function(d, i) { return 'rotate(' + (180 * data.threshold/(data.max-data.min)) + ')' }): tickCircle.attr('display', 'none');

      // text length of the #labelMin element
          var label_min_width;
          if(label_min.node() != null && label_min.node().getBoundingClientRect() != null){
            label_min_width = label_min.node().getBoundingClientRect().width;
          }

          // text length of the #labelMax element
          var label_max_width;
          if(label_max.node() != null && label_max.node().getBoundingClientRect() != null){
            label_max_width = label_max.node().getBoundingClientRect().width;
          }

          // If the min label is being cropped...
          if (label_min_width > arc_width) {
            // Move the viewbox over so it redraws the svg starting at less than zero
            svg.attr('viewBox', [(arc_width - label_min_width) / 2, 0, width, height])
          } else {
            // Otherwise redraw the viewbox as normal. The max label should only ever
            // be cropped if our svg exceeds the width of its containing element so there's
            // no need to check for overflow in that case. Just make the containing element
            // bigger or the label smaller.
            svg.attr('viewBox', [0, 0, width, height])
          }
      }
      gauge.update = function(){
          switch(dataURL)
          {
              case 'self':
                  data.min = el.data('min') || 0;
                  data.max = el.data('max') || 100;
                  data.threshold = el.data('threshold') || null;
                  data.value = el.data('value');
                  data.labelMin = el.data('label-min');
                  data.labelMax = el.data('label-max');
                  updateViz();
                  break;
              default:
                  $.getJSON(dataURL, function(responseData){
                      data.min = responseData.min || 0;
                      data.max = responseData.max || 100;
                      data.threshold = responseData.threshold || null;
                      data.value = responseData.value;
                      data.labelMin = responseData['label-min'];
                      data.labelMax = responseData['label-max'];
                      updateViz();
                  });
                  break;
          }
      }
      gauge.update();
      return gauge;
    };
  }
);
