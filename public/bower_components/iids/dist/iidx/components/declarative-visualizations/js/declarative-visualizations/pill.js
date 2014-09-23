define([
  'jquery',
  'd3-amd',
  'underscore'
  ], function ($, d3, _) {
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

      // TODO work when data-classes is not specified
      // TODO verify declarative configuration (all needed attributes present, same number of values and classes, etc)

      // For customizable subelements we take an underscore template, using a mustache-style syntax:
      //   {{ foo }} to evaluate and output
      //   {% bar %} to execute without output
      // TODO this should be done once globally and by policy
      _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g,
        evaluate: /\{\%(.+?)\%\}/g
      };


      var width = data.width = el.width(),
          height = data.height = el.height(),
          thickness = data.thickness = el.data('thickness') || 40,
          values,
          classes = data.classes = el.data('classes').split(','),
          textLabel = el.data('label'),
          tweenDuration = el.data('duration') || 0;

      if (el.data('values').split){
        //it is a string, not a single value...
        values = data.values = el.data('values').split(',');
      }
      else{
        values = data.values = [el.data('values')];
      }
      
      var isEmptyBar = false;
      if (d3.sum(values) == 0){
    	  values[0] = '1';
          isEmptyBar = true;
      }

      // draw primary text and label

      var root = d3.select(element);
      root.style('position', 'relative');

      var svg = root.append("svg")
          .attr('class', 'visualization-pill')
          // http://stackoverflow.com/questions/5926986/why-does-firefox-appear-to-truncate-embedded-svgs
          // .attr('width', width)
          // .attr('height', height)
          .style('width', '100%')
          .style('height', '100%')
          .attr('preserveAspectRatio', 'xMinYMin meet')
          .attr('viewBox', [0, 0, width, height].join(' '));
      var g = svg.append("svg:g");

      // TODO text as HTML subelements
      var numText = 0;
      if (isEmptyBar){
    	  numText = g.append("text")
          .attr("class","num")
          .attr("text-anchor", "start")
          .text(0);
      }
      else {
    	  numText = g.append("text")
          .attr("class","num")
          // .attr('dy', -17)
          .attr("text-anchor", "start")
          .text(d3.sum(values));
      }
      var labelText = g.append('text')
          .attr('class', 'label')
          // .attr('dy', 0)
          .attr('x', numText.node().getBBox().width + 5)
          .attr('text-anchor', 'start')
          .text(textLabel);
      // html layer above
      var div = root.append('div')
      div.style({position: 'absolute', top: 0, left: 0});

      // transform everything (including the text) down, since text is aligned baseline
      var textBox = numText.node().getBBox();
      g.attr('transform', 'translate(0,' + textBox.height + ')');

      // append shapes for each pill segment, with appropriate class names

      var xscale = d3.scale.linear().domain([0, d3.sum(values)]).range([1, width-2]);
      var x = Math.round(xscale(0));
      var y = 23;
      var h = thickness;

      $.each(values, function(i){
        if (this == 0){
          values[i] = classes[i] = 'delete_me';
        }
      });

      values  = _.without(values, 'delete_me');
      classes = _.without(classes, 'delete_me');

      for(var i=0; i<values.length; ++i) {
        var w = xscale(values[i]);
        g.append('path')
          .attr('d', function() {
            if( i == 0 && values.length == 1 ) {
              return roundRect(x, y, w - 3, h, 5, 5, 5, 5);
            }
            else if ( i == 0 ){
              return roundRect(x, y, w - 3, h, 5, 0, 0, 5);
            }
            else if( i == values.length - 1 ) {
              return roundRect(x, y, w - 3, h, 0, 5, 5, 0);
            }
            else {
              return roundRect(x, y, w - 3, h, 0, 0, 0, 0);
            }
          })
          .classed('pill', true)
          .classed(classes[i], true);

        // Labels are trickier than they should be.
        // The idea is we render fragments from the underscore template, add them to the SVG, and voila!
        // The SVG container itself is doing the responsive scaling thing, no need to listen for resize.
        // Unfortunately its not that easy. We are pretty constrained in how we can approach this.
        //
        // 1. SVG elements are hard to create from strings - there's no equivalent to .html()
        //    https://groups.google.com/d/topic/d3-js/jBUyEmVXPb0/discussion
        //
        // 2. SVG foreign object would work, except for a webkit bug:
        //    https://bugs.webkit.org/show_bug.cgi?id=71819
        //    http://stackoverflow.com/questions/14941971/failure-rendering-foreignobject-inside-svg-leveraging-d3
        //    With that bug its useless - in particular, we don't get cheap responsive from viewBox.
        //    foreignObject isn't supported by IE 9/10 anyway.
        //
        // 3. HTML in a div on top of the graphic. We manually maintain a CSS transform that matches the
        //    one SVG constructs automatically from viewBox. This is the least elegant solution, so naturally
        //    its the one that works across browsers. And the one we use.
        //    Another bug in webkit prevents us from scaling SVG up - so we limit the size to 100% by setting
        //    width/height on SVG (for consistent behavior in firefox) and clamping the CSS scale.
        //    https://bugs.webkit.org/show_bug.cgi?id=68995

        if (isEmptyBar){values[0] = 0}
        
        var vars = { x:x, y:y + textBox.height, width:w, height:h, value:values[i], className:classes[i] };
        var labelText = div.append('div')
            .classed('viz-label', true)
            .datum(vars)
            .html(labelHTML(vars));

        x += w;
      }

      function labelHTML(labelValueObj){
        var $labelhtml = $( "<div></div>")
          .addClass('viz-point-label')
          .css('left', labelValueObj.x)
          .css('width', labelValueObj.width - 2)
          .css('top', labelValueObj.y + labelValueObj.height);

        if(labelValueObj.className == 'danger') {
          $labelhtml.append('<i class="icon-ico_warning_sm danger"></i>');
        }
        $labelhtml.append(labelValueObj.value);
        return $labelhtml[0].outerHTML;
      }

      $(window).resize(function(e) {
        var viewBox = svg.attr('viewBox').split(' ');
        var scale = Math.min(1, el.width() / viewBox[2]);
        var sTransform = 'scale(' + scale + ')';
        div.style('transform', sTransform);
        div.style('-webkit-transform', sTransform);
        div.style('-ms-transform', sTransform);
      })

      function p(x,y){
        return x+" "+y+" ";
      }

      function roundRect(x, y, w, h, r1, r2, r3, r4){
        var strPath = "M"+p(x+r1,y); //A
        strPath+="L"+p(x+w-r2,y)+"Q"+p(x+w,y)+p(x+w,y+r2); //B
        strPath+="L"+p(x+w,y+h-r3)+"Q"+p(x+w,y+h)+p(x+w-r3,y+h); //C
        strPath+="L"+p(x+r4,y+h)+"Q"+p(x,y+h)+p(x,y+h-r4); //D
        strPath+="L"+p(x,y+r1)+"Q"+p(x,y)+p(x+r1,y); //A
        strPath+="Z";

        return strPath;
      }

      // XXX these are left in for reference - need test pages for implementation
      function updateViz() {
        return;

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

      root.update = function(){
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
      root.update();
      return root;
    };
  }
);
