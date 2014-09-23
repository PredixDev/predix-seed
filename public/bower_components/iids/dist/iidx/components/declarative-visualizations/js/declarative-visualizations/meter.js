define([
    'jquery',
    'd3-amd'
], function ($, d3) {
        'use strict';
        return function (element) {

            var data = {},
                el = $(element),
                dataURL = el.data('target'), 
                elType = el.attr('class'),
            	gradientId = 'gradient';
            
          //Generate gradient ID based on type of the speedometer
            if(elType) {
          	  var elTypeArr = elType.split(' ');
          	  elType = Array.isArray(elTypeArr) ? elTypeArr[0] : elType;    	   	  
                gradientId= (elType ==='no-label') ? gradientId : elType+'-gradient' ;          
            }
            var gradientFill = "url(#"+gradientId+")"; // attach fill to gradientID

            if (el.data('target') === undefined || el.data('target') === 'self') {
                dataURL = 'self';
            }

            var tweenDuration = el.data('duration') || 0,
                width = el.width(),
                height = el.height(),
                orientation = (height > width) ? 'vertical' : 'horizontal',
                min = el.data('min') || 0,
                max = el.data('max') || 100,
                value = el.data('value') || 0,
                threshold = el.data('threshold') || null,
                unit = el.data('unit') || null,
                x;

            // Calculated values
            var margin = (orientation === 'vertical') ? {top: 0, right: 20, bottom: 40, left: 5} : {top: 15, right: 0, bottom: 0, left: 0},
                height = height - margin.top - margin.bottom,
                width = width - margin.left - margin.right,
                long_side = Math.max(height, width),
                short_side = Math.min(height, width);


            // Helper function to make managing d3 coordinates more human readable
            var lineFunction = d3.svg.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .interpolate("linear");

            // SVG construction begins
            var meter = d3.select(element);

            var svg = meter.append("svg")
                .attr('class', 'visualization-meter')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            var container = svg.append("svg:g")
                .attr('id', 'container');

            // Text group
            var text_group = container.append("svg:g")
                .attr('class', 'text-group');

            var textwidth = 0;
            if (orientation === 'vertical') {
                // Position text group underneath meter
                text_group.append("text")
                    .attr("class", "value")
                    .attr('dy', height + (margin.bottom/2))
                    .attr('dx', (width/2) + margin.left)
                    .attr("text-anchor", "middle")
                    .text(value);

                text_group.append("text")
                    .attr("class", "unit")
                    .attr('dy', height + (margin.bottom * .9))
                    .attr('dx', (width/2) + margin.left)
                    .attr("text-anchor", "middle")
                    .text(unit);
            } else {
                // Create text element
                var text = text_group.append("text")
                    .attr("text-anchor", "left");

                // Nest text inside  of the <text> element to give us the ability
                // to target the value and unit labels individually
                text.append('tspan')
                    .attr("class", "value")
                    .text(value);

                text.append('tspan')
                    .attr("class", "unit")
                    .text(unit);

                // adjust width based on text width
                textwidth = text[0][0].getBBox().width + 5;

                // Position text group to the right
                svg.select('.text-group')
                    .attr('transform', 'translate('+ (width - textwidth + 5) +', '+((height/2) + margin.top + 6)+')'); // 6 = text height
            }

            // Scale helpers
            var scaleValue = d3.scale.linear().domain([min, max]).range([0, long_side-textwidth]),
                currentValue = scaleValue(value),
                currentWidth = (orientation === 'vertical') ? width : scaleValue(width-textwidth),
                currentHeight = (orientation === 'vertical') ? scaleValue(height) : height;

            var g = container.append("svg:g")
                .attr('class', 'fill-group')
                .attr('transform', 'translate('+ margin.left +',' + margin.top + ')');

            // Create gradient
            var defs = g.append('svg:defs')
                .append('svg:linearGradient')
                .attr('x1', "0%")
          		.attr('y1', "100%")
          		.attr('x2', "0%")
          		.attr('y2', "0%")
                .attr('id', gradientId).call(function (gradient) {
                    gradient.append('svg:stop')
                        .attr('offset', '0%')
                        .attr('class', 'gradient-color-1');

                    gradient.append('svg:stop')
                        .attr('offset', '100%')
                        .attr('class', 'gradient-color-2');
                });

            // Set proper gradient orientation
            if (orientation === 'vertical') {
                svg.select(gradientId)
                    .attr('x1', "100%")
                    .attr('y1', "0%")
                    .attr('x2', "0%")
                    .attr('y2', "0%")
            } else {
                svg.select(gradientId)
                    .attr('x1', "0%")
                    .attr('y1', "100%")
                    .attr('x2', "0%")
                    .attr('y2', "0%")
            }

            g.append("rect")    // background
                .attr("class","bg")
                .attr("width", width - textwidth)
                .attr("height", height);

            g.append("rect")    // gradient for foreground
                .attr("class", "fg")
                .attr("width", currentWidth)
                .attr("height", currentHeight)
                .attr("fill", gradientFill);

            if (threshold) {
                g.append('svg:path')
                    .attr('d', lineFunction([{"x": 9.5, "y": 0.8}, {"x": 9.5, "y": 9.5}, {"x": 1.1, "y": 5.1}]))
                    .attr('class', 'pointer');

                if (orientation === 'vertical') {
                    var threshold_width = (width/4),
                        threshold_position = height - scaleValue(threshold);

                    svg.select('.pointer').attr('transform', 'translate('+ width +','+ (threshold_position - 4) +' )');

                    g.append('rect')
                        .attr('width', threshold_width)
                        .attr('height', 2)
                        .attr('class', 'threshold')
                        .attr('x', width - threshold_width)
                        .attr('y', height - scaleValue(threshold));

                } else {
                    var threshold_height = (height/4),
                        threshold_position = scaleValue(threshold);

                    svg.select('.pointer').attr('transform', 'translate('+ (threshold_position - 4)+', 0), rotate(-90)');

                    g.append('rect')
                        .attr('width', 2)
                        .attr('height', threshold_height)
                        .attr('class', 'threshold')
                        .attr('x', threshold_position)
                        .attr('y', 0);
                }
            }

            /////////////////////////////////////////////////
            // AXIS STUFF
            /////////////////////////////////////////////////

            // var yAxis = d3.svg.axis()
            //     .scale(scaleValue)
            //     .tickSize(4)
            //     .ticks(20)
            //     .tickPadding(2)
            //     .orient("left");

            // var yAxisGroup = container.append("svg:g")
            //     .attr('id', 'axis-group')
            //     .attr('class', 'axis y-axis')
            //     .attr('transform', 'translate(15, 0)')
            //     .call(yAxis);


            // Markers
            var markers = el.data('markers');

            if (markers) {
                for (var d = 0; d < markers.length; d++) {
                    var label = markers[d][0],
                        markerValue = markers[d][1];

                    if (orientation === 'vertical') {
                        var location = height - scaleValue(markerValue);

                        // Tick mark
                        g.append('rect')
                            .attr('width', 4)
                            .attr('height', 2)
                            .attr('y', location)
                            .attr('x', width - textwidth);

                        // Label
                        g.append('text')
                            .attr('class', 'label')
                            .attr('text-anchor', 'start')
                            .attr('y', location)
                            .attr('dy', '.4em')
                            .attr('x', width - textwidth + 6)
                            .text(label);
                    } else {
                        var location = scaleValue(markerValue);

                        // Tick mark
                        g.append('rect')
                            .attr('width', 2)
                            .attr('height', 4)
                            .attr('y', -4)
                            .attr('x', location);

                        // Label
                        g.append('text')
                            .attr('class', 'label')
                            .attr('text-anchor', 'start')
                            .attr('y', -6)
                            .attr('dx', '-.2em')
                            .attr('x', location)
                            .text(label);
                    }
                }
            }

            function updateViz() {
                el.removeData(); // clear out $.cache so calls to $.fn.data will work

                // Update value
                svg.select(".value").text(data.value);

                var threshold = svg.select(".threshold"),
                    currentValue = scaleValue(data.value);

                if (orientation === 'vertical') {

                    svg.select(".fg")
                        .transition()
                        .duration(tweenDuration)
                        .attr('height', currentValue)
                        .attr('y', height - currentValue);

                } else {

                    svg.select(".fg")
                        .transition()
                        .duration(tweenDuration)
                        .attr('width', currentValue);
                }

            }

            meter.update = function(){
                switch(dataURL) {
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

            meter.update();
            return meter;
        };
    }
);
