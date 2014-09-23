define([
  'jquery',
  'd3-amd'
  ], function ($, d3) {
    'use strict';
    return function (element) {

      var data = {};
      var el = $(element);
      var dataURL = el.data('target');
      var elType = el.attr('class');
      var gradientId = 'gradient';
      
    //Generate gradient ID based on type of the speedometer
      if(elType) {
    	  var elTypeArr = elType.split(' ');
    	  elType = Array.isArray(elTypeArr) ? elTypeArr[0] : elType;    	   	  
          gradientId= (elType ==='no-label') ? gradientId : elType+'-gradient' ;          
      }
      var gradientFill = "url(#"+gradientId+")"; // attach fill to gradientID

      if (el.data('target') === undefined || el.data('target') === 'self' || el.data('target').length == 0) {
        dataURL = 'self';
      }

      data.min = el.data('min') || 0;
      data.max = el.data('max') || 100;

      var width = data.width = el.width(),
          height = data.height = width/2,
          tweenDuration = el.data('duration') || 0;

      // Radius definitions
      var outer_radius = Math.min(width/2, height),
          inner_radius = outer_radius * .6,
          startAngle   = -Math.PI/2,
          endAngle     = Math.PI/2;

      var arc_width = outer_radius - inner_radius, // measure of the distance between the otter and inner radius of the speedometer
          scale = (outer_radius+inner_radius)/158; // set scale based on radius

      // Helper function to make managing d3 coordinates more human readable
      var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("linear");

      var speedometer = d3.select(element);

      var svg = speedometer.append('svg')
          .attr('class', 'visualization-speedometer')
          .attr("width", width + 20)
          .attr("height", height)
          .attr('preserveAspectRatio', 'xMinYMid');

      // Set SVG group
      var g = svg.append("svg:g")
          .attr('transform', 'translate(' + (outer_radius) + ',' + (outer_radius) + ')');

      // Create gradient
      var defs = g.append('svg:defs').append('svg:linearGradient')
          .attr('x1', "0%")
          .attr('y1', "100%")
          .attr('x2', "0%")
          .attr('y2', "0%")
          .attr('id', gradientId).call(
            function (gradient) {
              gradient.append('svg:stop')
                      .attr('offset', '0%')
                      .attr('class', 'gradient-color-1');
              gradient.append('svg:stop')
                      .attr('offset', '100%')
                      .attr('class', 'gradient-color-2');
            });

      // background arc shape bounds
      var bg_arc = d3.svg.arc()
          .outerRadius(outer_radius)
          .innerRadius(inner_radius)
          .startAngle(startAngle)
          .endAngle(endAngle);

      // Create background arc path
      g.append("svg:path")
          .attr('class', "bg bg_arc")
          .attr("d", bg_arc);

      // Fill arc shape
      var fill_arc = d3.svg.arc()
          .outerRadius(outer_radius)
          .innerRadius(inner_radius)
          .startAngle(startAngle)
          .endAngle(endAngle);

      // Value controlled fill
      g.append("svg:path")
          .attr('class', 'fill')
          .attr("d", fill_arc)
          .attr("fill", gradientFill)
          .attr('transform', function(d, i, a) {
            return 'rotate(-180)'
          });;


      // var someText = g.append("text")
          // .attr("dy", arc_width + (arc_width/6))
          // .append("textPath")
            // .attr("xlink:href","#bg_arc")
          // .text("abcaeiduhaieudhai eudhai eudha iedha ieuhd iaeudh aeiuediah idhae iduahe iduha eiduha iduahe diuahe iduaeh idaeuieuahd iaeuh");

      // var x = d3.scale.linear().domain([data.min, data.max]);
      // console.log(x.ticks(23));

      // var dasTicks = g.append('')

      // Inner tick mark
      g.append('rect')
          .attr('class', 'innerTickMark tick')
          .attr('width', arc_width/10)
          .attr('height', arc_width/20)
          .attr('x', (-height)) // account for element's size
          .attr('fill', 'black')
          .attr('transform', function(d, i, a) {
            // return 'rotate(180)'
          });

      // Outer tick mark container
      var outerTickGroup = svg.append("svg:g")
          .attr('class', 'outerTickGroup')
          .attr('height', height)
          .attr('width', width)
          .attr('transform', 'translate(' + (outer_radius) + ',' + (outer_radius) + ')');

      // Outer tick triangle coordinates
      var tickLineData = [{"x": 9.5, "y": 0.8},
                          {"x": 9.5, "y": 9.5},
                          {"x": 1.1, "y": 5.1}];

      var tickSize = 11 * scale;

      // Create outer tick path
      outerTickGroup.append('svg:path')  // Outer tick Mark
          .attr('d', lineFunction(tickLineData))
          .attr('class', 'pointer')
          .attr('transform', 'translate(' + (outer_radius) + ','+ -(tickSize/2) +') scale('+ scale +') ') // Offset for width of triangle
          .attr('fill', 'black');

      outerTickGroup.attr('transform', 'rotate(-180)');

      // Quick mask above the fill and under the needle
      g.append('rect')
          .attr('id', 'mask')
          .attr('width', width + tickSize)
          .attr('height', height)
          .attr('x', -(width/2) - (tickSize/2))
          .attr('fill', 'white');

      g.append("svg:clip-path")
          .attr('clip-path', "url(#mask)");

      // Create needle path
      g.append('svg:path')
          .attr('class', 'needle')
          .attr('d', 'M0 1.0 L0 -3.8,98.6 1.2 L98.6 1.6,0 1.0 Q-3.4 -1.4 0 -3.8')
          .attr('transform', function(d, i) { return 'scale(' + scale + ') rotate(-180)'})
          .attr('fill', 'black');
      //explaining the 'd' attribute of the needle element above
      //M0 1.0 L0 -3.8,98.6 1.2 L98.6 1.6,0 1.0 Q-3.4 -1.4 0 -3.8
      //M0 1.0 L0 -3.8 - draws a bottom straight line
      //98.6 1.2 L98.6 1.6 - draws line to fill the triangle of the needle
      //0 1.0 Q-3.4 -1.4 0 -3.8 - draws the curved angle to the bottom of the needle.

      // Viewbox needs to take into account the tick pointer on the outside of the arc
      svg.attr('viewBox', [-tickSize, -tickSize, width + tickSize, height + (tickSize *2)]);


      function percentToDegrees(percent) {
        return ((percent/100) * Math.PI) - Math.PI/2;
      }

      function updateViz() {
          el.removeData(); // clear out $.cache so calls to $.fn.data will work

          var valueAngle = 180 * data.value/(data.max-data.min),
              thresholdAngle = 180 * data.threshold/(data.max-data.min);

          svg.select('.needle')
              .transition()
              .duration(tweenDuration)
              .attr('transform', function(d, i, a) {
                  return 'rotate(' + (-180 + valueAngle-1) + ')' + ' ' + 'scale(' + scale + ')'
              });

          svg.select('.fill')
              .transition()
              .duration(tweenDuration)
              .attr('transform', function(d, i, a) {
                  return 'rotate(' + (-180 + valueAngle) + ')'
              });

          // Inner tick mark
          svg.select(".innerTickMark")
              .transition()
              .duration(tweenDuration)
              .attr('transform', function(d, i, a) {
                return 'rotate(' + thresholdAngle + ')'
              });

          // Outer tick mark
          svg.select(".outerTickGroup")
              .transition()
              .duration(tweenDuration)
              .attr('transform', function(d, i, a) {
                return 'translate(' + (outer_radius) + ',' + (outer_radius) + ')' + 'rotate(-' + (180 - thresholdAngle) + ')'
              });
      }

      speedometer.update = function(){
        switch(dataURL) {
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
            $.getJSON(dataURL, function(responseData) {
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
      speedometer.update();
      return speedometer;
    };
  }
);
