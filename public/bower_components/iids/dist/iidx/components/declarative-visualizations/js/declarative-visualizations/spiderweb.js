define([
  'jquery',
  'd3-amd'
  ], function ($, d3) {
    'use strict';
    return function (element) {

      var data = [],
          dataLoop = [],          //for closed line, a bug for d3.v2
          maxValue;
      var el = $(element);
      var dataURL;
      if(el.data('target') === undefined || el.data('target') === 'self' || el.data('target').length == 0) {
          dataURL = 'self';
      }
      else{
          dataURL = el.data('target');
      }
      var width = el.width() || 60,
          height = el.height() || 60,
          r = Math.min(width/2, height/2),
          tweenDuration = el.data('duration') || 0;

      var spiderweb = d3.select(element);

      var degreeAngle = d3.scale.linear()     //radians to degree
          .domain([0, 2*Math.PI])
          .range([0, 360]);

      var svg = spiderweb.append('svg')
              .attr("width", width)
              .attr("height", height)
              .attr("class", "spiderweb")
              .append("svg:g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");   //center svg

      var lineTicks = svg.append("svg:g").attr("class", "line-ticks");     //from center to outter points, group of lines
      var outline = svg.append("svg:path").attr("class", "outline");   //connecting outter points, one connected line path
      var web = svg.append("svg:path").attr("class", "web");       //blue data area, one filled path

      // var wash = svg.append('defs')           //lightly gradient on top of the web
      //     .append('radialGradient')
      //     .attr('id', 'wash')
      //     .attr('r', '50%')
      //     .attr('cx', '0%').attr('cy', '0%')
      //     .attr('gradientUnits', 'userSpaceOnUse');
      // wash.append('stop')
      //     .attr('offset', 0)
      //     .attr('stop-color', 'white');
      // wash.append('stop')
      //     .attr('offset', 1)
      //     .attr('stop-color', 'black');

      // var webGradient = svg.append('svg:path').attr('class', 'web_gradient')
      //         .attr('fill', 'url(#wash)')
      //         .attr('fill-opacity', 0.1);

      var starting = true;    //for starting animation(expa25ing from the center)

      function updateViz() {
          el.removeData(); // clear out $.cache so calls to $.fn.data will work
          dataLoop = data.concat([data[0]]);  //fix bug of spider v2
          var angle = d3.scale.linear().domain([0, data.length]).range([0, 2 * Math.PI]);
          var radius = d3.scale.linear()
              .domain([0, maxValue])
              .range([0, r]);

          var angleData = [], emptyData = [];
          for( var d = 0; d < data.length; d++ ){
              var item = {};
              var tickAngle = angle(d) - Math.PI/2;
              item.x = Math.cos(tickAngle)*r;
              item.y = Math.sin(tickAngle)*r;
              angleData.push(item);
              emptyData.push(0);      //for starting animation
          }

          var line = d3.svg.line.radial()
              // .interpolate("linear-closed")
              .radius( r )
              .angle(function(d, i) { return angle(i); });

          var area = d3.svg.area.radial()
              // .interpolate("linear-closed")
              .angle(function(d, i) { return angle(i); })
              .innerRadius(function(d) { return 0; })
              .outerRadius(function(d) { return radius(d); });

          var lineTick = lineTicks.selectAll(".line-tick").data(angleData);
          if( starting ) {
              lineTick.enter().append("svg:line")
                  .attr("class", "line-tick")
                  .attr("x2", function(d){ return d.x })
                  .attr("y2", function(d){ return d.y });         //disable line animation on starting
              starting = false;
              web.attr("d", area(emptyData));
              // webGradient.attr("d", area(emptyData));
          }
          else{
              lineTick.enter().append("svg:line")
                  .attr("class", "line-tick");        //enable line animation on adding new data
          }

          lineTick.transition()
              .duration(tweenDuration)
              .attr("x2", function(d){ return d.x })
              .attr("y2", function(d){ return d.y });     //lint tick transition

          lineTick.exit().remove();

          outline.transition()
              .duration(tweenDuration)
              .attr("d", line(dataLoop));
          web.transition()
              .duration(tweenDuration)
              .attr("d", area(dataLoop));
          // webGradient.transition()
          //     .duration(tweenDuration)
          //     .attr("d", area(dataLoop));
      }
      spiderweb.update = function(){
          switch(dataURL)
          {
              case 'self':
                  data = el.data('source');
                  maxValue = el.data('max') || d3.max(data) * 1.25;
                  updateViz();
                  break;
              default:
                  $.getJSON(dataURL, function(responseData){
                      data = responseData.value;
                      maxValue = responseData.max;
                      updateViz();
                  });
                  break;
          }
      }
      spiderweb.update();
      return spiderweb;
    };
  }
);
