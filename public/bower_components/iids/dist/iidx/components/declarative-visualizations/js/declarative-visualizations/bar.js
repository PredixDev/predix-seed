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
          x,
          tweenDuration = el.data('duration') || 0;

      var bar = d3.select(element);
      var svg = bar.append("svg")
          .attr('class', 'visualization-bar')
          .attr('preserveAspectRatio', 'xMinYMid');
      var g = svg.append("svg:g");
      var text = g.append("text")
          .attr("class","num")
          .attr('dy', -17)
          .attr("text-anchor", "start")
          .text("0");

      var textBox = text.node().getBBox();
      var barHeight = Math.max(textBox.height/2, height - textBox.height);
      g.attr('transform', 'translate(0,' + textBox.height + ')');

      width = Math.max(width, textBox.width);
      height = Math.max(height, textBox.height + barHeight);
      svg.attr('viewBox', [0, 0, width, height]);

      g.append("rect")    //background
          .attr("class","bg")
          .attr("width", width)
          .attr("height", barHeight);
      g.append("rect")    //foreground
          .attr("class", "fg")
          .attr("height", barHeight);
      var wash = svg.append('defs')   //define gradient
          .append('linearGradient')
          .attr('id', 'wash')
          .attr('gradientTransform', 'rotate(90)');
      wash.append('stop')
          .attr('offset', 0)
          .attr('stop-color', 'white');
      wash.append('stop')
          .attr('offset', 1)
          .attr('stop-color', 'black');
      g.append("rect")    //gradient for foreground
          .attr("class", "gradient")
          .attr("width", x)
          .attr("height", barHeight)
          .attr('fill', 'url(#wash)')
          .attr('fill-opacity', 0.1);
      g.append("circle")  //tick circle
          .attr("class", "tick")
          .attr('r', tickRadius)
          .attr('cy', barHeight/2);

      function updateViz() {
          el.removeData(); // clear out $.cache so calls to $.fn.data will work
          x = d3.scale.linear().domain([data.min, data.max]).range([0, width]);
          svg.select(".fg")
              .transition()
              .duration(tweenDuration)
              .attr("width", x(data.value));
          svg.select(".gradient")
              .transition()
              .duration(tweenDuration)
              .attr("width", x(data.value));
          text = svg.select("text")
              .text(data.value);
          var tickCircle = svg.select("circle");
          (data.threshold !== null)? tickCircle.attr('display', 'visible').attr('cx', x(data.threshold)): tickCircle.attr('display', 'none');
      }
      bar.update = function(){
          switch(dataURL)
          {
              case 'self':
                  data.min = el.data('min') || 0;
                  data.max = el.data('max') || 100;
                  data.threshold = el.data('threshold') || null;
                  data.value = el.data('value');
                  updateViz();
                  break;
              default:
                  $.getJSON(dataURL, function(responseData){
                      data.min = responseData.min || 0;
                      data.max = responseData.max || 100;
                      data.threshold = responseData.threshold || null;
                      data.value = responseData.value;
                      updateViz();
                  });
                  break;
          }
      }
      bar.update();
      return bar;
    };
  }
);
