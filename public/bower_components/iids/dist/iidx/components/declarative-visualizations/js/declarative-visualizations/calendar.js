define([
  'jquery',
  'brandkit',
  'd3-amd',
  'declarative-visualizations/tooltip'
  ], function ($, brandkit, d3, d3tip) {
    'use strict';
    return function (element, opt) {
      
       var el = $(element);
       el.addClass('calendar');

      // DEFAUTLS
      var DEFAULTS = {
        dateField: "",
        valueField: "",
        yearRange: null,
        tooltip: true,
        brushing: false,
        layout: "vertical", // vertical | horizontal | horizontal-vertical
        colorTheme: "orange",
        colorSteps: null,
        tweenDuration: 500,
        margin: {top: 10, right: 10, bottom: 10, left: 15},
        legend: true
      };

      // merge options
      var tempOpt = {};
      for (var i in DEFAULTS){
         if (el.data((""+i).toLowerCase()))
            tempOpt[i] = el.data((""+i).toLowerCase());
         if (el.data(""+i))
            tempOpt[i] = el.data(""+i); 
      }     
      
      var settings = $.extend(
          false,
          {},
          DEFAULTS,
          typeof tempOpt === 'object' && tempOpt
      );
      
      settings = $.extend(
          false,
          {},
          settings,
          typeof opt === 'object' && opt
      );
      
      var inputData = null;

      // build pallete from brandkit
      var colorThemes = ["orange", "purple", "red", "blue", "green", "yellow"];
      var colorPalette = d3.map();
      colorThemes.forEach(function(d) {
        if (d in brandkit.accentPalette) {
          var color = d3.rgb(brandkit.accentPalette[d])
          var colors = [];
          if ((d+"Light") in brandkit.accentPalette) {
            colors.push(d3.rgb(brandkit.accentPalette[d+"Light"]));
          }
          else {
            // use d3 to generate a brighter color
            colors.push(color.brighter());
          }

          colors.push(color);

          if ((d+"Dark") in brandkit.accentPalette) {
            colors.push(d3.rgb(brandkit.accentPalette[d+"Dark"]));
          }
          else {
            // use d3 to generate a darker color
            colors.push(color.darker());
          }
          colorPalette.set(d, colors);
        }
      });

      // Data
      var data = null;
      var dataInRange = null;  // original data in date range

      // Dimensions
      var outerWidth, outerHeight;  // the box dimensions including margins
      var width, height;  // dimensions exluding margins
      // the size of each cell
      var daySize;
      // margins for axes
      var axisLeft, axisTop;
      // top margin for legend
      var legendTop;


      /* Calendar Specific Settings */
      // Date Formats
      var day = d3.time.format("%w"),
        week = d3.time.format("%U"),
        year = d3.time.format("%y"),
        formatDate = d3.time.format("%m-%d-%Y");

      // TODO calculate default color scales if not specified
      var colorScale;

      // Date Ranges
      var yearRange, monthRange;

      // Canvas
      var calendar = d3.select(element);
      var svg = calendar.append("svg");
      var g = svg.append("svg:g");
      //g.append("g").attr("class", "year-axis");
      //g.append("g").attr("class", "month-axis");

      // tooltip
      var tip = null;

      // brushing control
      var brush = null;
      var quadtree = null;

      // legend
      var legend = null;

      // event dispatcher
      var dispatch = d3.dispatch('hover', 'click', 'brush', 'brushend');

      function updateViz(seriesData) {
        // process viz data
        processData(seriesData);
        if (data === null) {
          return;
        }

        inputData = seriesData;
        
        // update the canvas size, settings etc.
        configViz();

        // draw the viz
        drawViz();
      }

      /*******************
        Data processing
       *******************/
      function processData(seriesData) {
        if (seriesData === undefined || seriesData === null) {
          return;
        }

        if (seriesData.length > 0) {
          if (!(settings.dateField in seriesData[0])) {
            console.error("Cannot find the date field " + settings.dateField + " in the data!");
            return;
          }
          if (!(settings.valueField in seriesData[0])) {
            console.error("Cannot find the value field " + settings.valueField + " in the data!");
            return;
          }
        }

        var startDate, stopDate;
        if (settings.yearRange !== undefined && settings.yearRange !== null && settings.yearRange.length !== 0) {
          startDate = new Date(settings.yearRange[0], 0, 1);
          stopDate = new Date(settings.yearRange[1], 0, 1);
          
          dataInRange = seriesData.filter(function(d) {
            var date = new Date(d[settings.dateField]);
            return date >= startDate && date < stopDate;
          });
          dataInRange.sort(compareByDate);
        }
        else {
          dataInRange = seriesData.slice(0);
          dataInRange.sort(compareByDate);
          if (dataInRange.length > 0) {
            startDate = new Date(new Date(dataInRange[0][settings.dateField]).getFullYear(), 0, 1);
            stopDate = new Date(new Date(dataInRange[dataInRange.length - 1][settings.dateField]).getFullYear() + 1, 0, 1);
          }
          else {
            startDate = stopDate = new Date(new Date().getFullYear(), 0, 1);
          }
        }

        yearRange = d3.time.years(startDate, stopDate);
        monthRange = d3.time.months(startDate, stopDate);

        var dataMap = d3.map();
        dataInRange.forEach(function(d) {
          var date = new Date(d[settings.dateField]);
          var key = formatDate(date);
          var value;
          if (dataMap.has(key)) {
            // already exist, add value
            var value = dataMap.get(key);
            value[settings.valueField] += d[settings.valueField];
            value["items"].push(d);
          }
          else {
            var value = {};
            value[settings.dateField] = date;
            value[settings.valueField] = d[settings.valueField];
            value["items"] = [d];
            // set the formatted date
            dataMap.set(key, value);
          }
        });
        data = dataMap.values();
      };

      /*******************
        Configuration
       *******************/
      function configViz() {
        // margins for axes
        axisLeft = 25;
        axisTop = 25;
        // margin for legend
        if (settings.legend) {
          legendTop = 35;
        }
        else {
          legendTop = 0;
        }

        // d3 Margin Convention
        // http://bl.ocks.org/mbostock/3019563
        outerWidth = el.width() || 300;
        outerHeight = el.height() || 300;
        if (outerWidth < 300) outerWidth = 300;
        if (outerHeight < 300) outerHeight = 300;
        var left = parseInt(settings.margin.left) + axisLeft;
        var right = parseInt(settings.margin.right);
        var top = parseInt(settings.margin.top) + axisTop + legendTop;
        var bottom = parseInt(settings.margin.bottom);
        width = outerWidth - left - right;
        height = outerHeight - top - bottom;
        svg.attr("width", outerWidth).attr("height", outerHeight);
        g.attr("transform", "translate(" + left + "," + top + ")");

        // update the cell size for each day
        if (settings.layout.toLowerCase() === 'horizontal' ) {
          // horizontal layout
          daySize = Math.min(
            width / (12 * 8 - 1),
            height / (yearRange.length * 7 - 1)
          );
        }
        else if (settings.layout.toLowerCase() === 'horizontal-vertical' ) {
          // horizontal month, vertical day
          daySize = Math.min(
            width / 53,
            height / (yearRange.length * 8 - 1)
          );
        }
        else {
          // vertical layout
          daySize = Math.min(
            width / (yearRange.length * 8 - 1),
            height / 53
          );
        }

        // update the color scale for each cell
        var colors = colorPalette.get(settings.colorTheme.toLowerCase());
        if (colors === undefined || colors === null && colors.length < 2  ) {
          console.error('The color theme is not supported!');
          return;
        }

        var colorRange = [];
        var steps;
        if (settings.colorSteps === undefined || settings.colorSteps === null) {
          steps = colors.length;
        }
        else if ($.isArray(settings.colorSteps) && settings.colorSteps.length > 0) {
          steps = settings.colorSteps.length;
        }
        else {
          steps = parseInt(settings.colorSteps);
        }

        if (steps < 2 ) {
          console.error('At least two color steps are needed!');
          return;
        }
        else if (steps === 2) {
          colorRange = [colors[0], colors[colors.length - 1]];
        }
        else if (steps === colors.length) {
          colorRange = colors;
        }
        else {
          // interpolate the colors using linear scale
          var s = d3.scale.linear()
            .domain(d3.range(colors.length))
            .range(colors);
          colorRange = d3.range(steps).map(function(d) {
            return s(1.0 * d * (colors.length - 1) / (steps - 1));
          });
        }

        if ($.isArray(settings.colorSteps) && settings.colorSteps.length > 0 ) {
          colorScale = d3.scale.threshold()
            .range(["#fff"].concat(colorRange))
            .domain(settings.colorSteps);
        }
        else {
          // quantitle scale based on dataset
            colorScale = d3.scale.quantile()
                .range(colorRange)
                .domain(getDataValues());
//          colorScale = d3.scale.quantize()
//            .range(colorRange)
//            .domain(getDataValues().sort(d3.ascending));
        }
      };

      /*******************
        Drawing functions
       *******************/
      function drawViz() {
        // draw axes
        drawAxes();

        // draw month outlines
        drawMonths();

        // draw day cells
        drawDays();

        // enable/disable tooltip
        drawTip();

        // enable/disable brushing
        drawBrush();

        // draw legend
        drawLegend();
      }

      function drawAxes() {
        var axisData = [];
        if (yearRange.length > 0) {
          var yearScale = d3.scale.ordinal()
            .domain(yearRange);
          var yearAxis = d3.svg.axis()
            .scale(yearScale)
            .tickSize(0)
            .tickFormat(d3.time.format("%Y"));

          if (settings.layout.toLowerCase() === 'horizontal' ) {
            yearScale.rangePoints([3 * daySize, (7 * (yearRange.length - 1) + 3) * daySize]);
            yearAxis.orient("left");
          }
          else if (settings.layout.toLowerCase() === 'horizontal-vertical' ) {
            yearScale.rangePoints([3.5 * daySize, (8 * (yearRange.length - 1) + 3.5) * daySize]);
            yearAxis.orient("left");
          }
          else {
            yearScale.rangePoints([3.5 * daySize, (8 * (yearRange.length - 1) + 3.5) * daySize]);
            yearAxis.orient("top");
          }

          axisData.push({
            id: 'year-axis',
            axis: yearAxis
          });
        }

        if (monthRange.length > 0) {
          // draw month axis
          var startYear = monthRange[0].getFullYear();
          var months = d3.time.months(new Date(startYear, 0, 1), new Date(startYear + 1, 0, 1));
          var monthScale = d3.scale.ordinal()
            .domain(months);
          var monthAxis = d3.svg.axis()
            .scale(monthScale)
            .tickSize(0)
            .tickFormat(d3.time.format("%b"))
            .orient("left");

          if (settings.layout.toLowerCase() === 'horizontal' ) {
            monthScale.rangePoints([3.5 * daySize, (8 * 11 + 3.5) * daySize]);
            monthAxis.orient("top");
          }
          else if (settings.layout.toLowerCase() === 'horizontal-vertical' ) {
            monthScale.rangePoints([2.5 * daySize, (53 - 2.5) * daySize]);
            monthAxis.orient("top");
          }
          else {
            monthScale.rangePoints([2.5 * daySize, (53 - 2.5) * daySize]);
            monthAxis.orient("left");
          }

          axisData.push({
            id: 'month-axis',
            axis: monthAxis
          });
        }

        var month_padding = [-5, 0], year_padding = [0, -5];
        if (settings.layout != 'vertical'){
           month_padding = [0, -5];
           year_padding = [-5, 0];
        }
        
        // draw axes
        var axes = g.selectAll(".axis").data(axisData, function(d) { return d.id; });
        axes.enter().append("g")
          .attr("class", "axis")
          .attr("transform", function(d){return (d.id == 'month-axis') ? "translate("+ month_padding[0] + "," + month_padding[1] + ")" : "translate("+ year_padding[0] + "," + year_padding[1] + ")";})
          .attr("id", function(d){ return d.id; });

        axes.transition()
          .duration(settings.tweenDuration)
          .each(function(d) { 
                               d.axis(d3.select(this));
                               d3.select(this).attr("transform", function(d){return (d.id == 'month-axis') ? "translate("+ month_padding[0] + "," + month_padding[1] + ")" : "translate("+ year_padding[0] + "," + year_padding[1] + ")";})
                            });

        axes.exit().transition()
          .duration(settings.tweenDuration)
          .remove();
      }

      function drawMonths() {
        // draw months
        var months = g.selectAll(".month").data(monthRange);
        
        var stroke = "1px";
           if (navigator.userAgent.indexOf('Chrome') != -1)
              stroke = "2px";

        months.enter().append("path")
          .attr("id", function(d){return d.getFullYear() +"-"+d.getMonth();})
          .attr("class", "month");

        months.transition()
          .duration(settings.tweenDuration)
          .attr("d", monthPath)
          .style("stroke-width", stroke);

        months.exit()
          .transition()
          .duration(settings.tweenDuration)
          .remove();
      };
      
      function monthPath(t) {
        var ty = t.getFullYear(),
          tm = t.getMonth();
        var sy = yearRange[0].getFullYear();

        var y0 = ty - sy;
        var t0 = new Date(ty, tm, 1);
        var t1 = new Date(ty, tm + 1, 0),
          d0 = +day(t0), w0 = +week(t0),
          d1 = +day(t1), w1 = +week(t1);

        var mx, my;
        if (settings.layout.toLowerCase() === 'horizontal' ) {
          mx = d0 * daySize + tm * 8 * daySize;
          my = y0 * 7 * daySize;
          return "M" + mx + "," + my +
            "v" + (1 * daySize) + "h" + (-d0 * daySize) +
            "v" + ((w1 - w0) * daySize) + "h" + ((d1 + 1) * daySize) +
            "v" + (-1 * daySize) + "h" + ((7 - (d1 + 1)) * daySize) +
            "v" + (-1 * (w1 - w0) * daySize) + "h" + ((d0 - 7) * daySize)
            + "v" + (1 * daySize) + "h" + (-d0 * daySize)
            ;
        }
        else if (settings.layout.toLowerCase() === 'horizontal-vertical' ) {
          mx = w0 * daySize;
          my = d0 * daySize + y0 * 8 * daySize;
          return "M" + mx + "," + my +
            "h" + (1 * daySize) + "v" + (-d0 * daySize) +
            "h" + ((w1 - w0) * daySize) + "v" + ((d1 + 1) * daySize) +
            "h" + (-1 * daySize) + "v" + ((7 - (d1 + 1)) * daySize) +
            "h" + (-1 * (w1 - w0) * daySize) + "Z";
        }
        else {
          mx = d0 * daySize + y0 * 8 * daySize;
          my = w0 * daySize;
          var close = (my == 0) ? 'Z' : '';
//          close= '';
          
          return "M" + mx + "," + my +
            "v" + (1 * daySize) + "h" + (-d0 * daySize) +
            "v" + ((w1 - w0) * daySize) + "h" + ((d1 + 1) * daySize) +
            "v" + (-1 * daySize) + "h" + ((7 - (d1 + 1)) * daySize)
            + "v" + (-1 * (w1 - w0) * daySize) + close
            ;
        }
      }

      function drawDays() {
        // draw days
        var days = g.selectAll(".day").data(data, dayId);

        // new days
        days.enter().insert("svg:rect", ":first-child")
          .attr("class", "day")
          .attr("id", dayId)
          .on("mouseover", onDayMouseOver)
          .on("mouseout", onDayMouseOut)
          .on("click", onDayMouseClick)
          .style("fill-opacity", 1e-6);

        // Update existing days
        days.transition()
          .duration(settings.tweenDuration)
          .style("fill", dayColor)
          .style("fill-opacity", 1.0)
          .attr("x", dayX)
          .attr("y", dayY)
          .attr("width", daySize-0.5)
          .attr("height", daySize-0.5);

        // delete old ones
        days.exit()
          .transition()
          .duration(settings.tweenDuration)
          .style("fill-opacity", 1e-6)
          .remove();
      }

      function dayId(d){
        return "date-" + formatDate(d[settings.dateField]) ;
      }

      function dayX(d){
        var date = d[settings.dateField];
        if (settings.layout.toLowerCase() === 'horizontal' ) {
          return day(date) * daySize + date.getMonth() * 8 * daySize;
        }
        else if (settings.layout.toLowerCase() === 'horizontal-vertical' ) {
          return week(date) * daySize;
        }
        else {
          return day(date) * daySize + (date.getFullYear() - yearRange[0].getFullYear()) * daySize * 8;
        }
      }

      function dayY(d){
        var date = d[settings.dateField];
        if (settings.layout.toLowerCase() === 'horizontal' ) {
          var ty = date.getFullYear();
          var tm = date.getMonth();
          var t0 = new Date(ty, tm, 1);
          return ((ty - yearRange[0].getFullYear()) * 7 + (week(date) - week(t0))) * daySize;
        }
        else if (settings.layout.toLowerCase() === 'horizontal-vertical' ) {
          return day(date) * daySize + (date.getFullYear() - yearRange[0].getFullYear()) * daySize * 8;
        }
        else {
          return week(date) * daySize;
        }
      }

      function dayColor(d){
        return colorScale(parseInt(d[settings.valueField]));
      }

      function drawTip() {
        if (settings.tooltip === true) {
          // remove old one if exists
          g.selectAll(".d3-tip").remove();
          // enable the tooltip
          tip = d3tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                var html = "<strong>Date:</strong> <span>" + formatDate(d[settings.dateField]) + "</span>";
                html += "<br/><strong>" + settings.valueField + ":</strong> <span>" + d[settings.valueField] + "</span>"
                return html;
              });
            g.call(tip);
        }
        else {
          g.selectAll(".d3-tip").remove();
          tip = null;
        }
      }

      function drawBrush() {
        // update the brushing if needed
        if (settings.brushing === true) {
          // remove old one if exists
          g.selectAll('.brush').remove();

          // build the quadtree
          quadtree = d3.geom.quadtree()
            .extent([[-1, -1], [width + 1, height + 1]])
            .x(dayX)
            .y(dayY)
            (data);

          // enable the brushing
          var brushx = d3.scale.identity().domain([0, width]),
            brushy = d3.scale.identity().domain([0, height]);
          brush = d3.svg.brush()
            .x(brushx)
            .y(brushy)
            .on('brushstart', onDayBrushStart)
            .on('brush', onDayBrush)
            .on('brushend', onDayBrushEnd);
          g.append('g')
            .attr("class", "brush")
            .call(brush);
        }
        else {
          g.selectAll('.brush').remove();
          brush = null;
        }
      }

      function drawLegend() {
        if (settings.legend) {
          if (dataInRange === null || dataInRange.length === 0) {
            // only draw legend when the data is not empty
            return;
          }

          var stepHeight = 10;
          if (legend === null) {
            legend = svg.append("g")
              .attr("class", "legend")
              .attr("transform", "translate(" + axisLeft + "," + 3 + ")");

            legend.select(".caption").remove();
            legend.append("text")
              .attr("class", "caption")
              .attr("y", stepHeight)
              .attr("x", 0)
              .text(settings.valueField + " value: ");
          }
          var captionWidth = legend.select(".caption").node().getBoundingClientRect().width;

          var ticks;
          if ($.isArray(settings.colorSteps) && settings.colorSteps.length > 0  ) {
            ticks = settings.colorSteps;
          }
          else {
            ticks = [d3.min(colorScale.domain())].concat(colorScale.quantiles());
//              ticks = colorScale.domain();
          }


          var padding = 10; // padding between caption and steps
          var maxStepWidth = 75;
          var stepWidth = Math.min(maxStepWidth, (width - captionWidth - padding) / ticks.length);

          var legendScale = d3.scale.ordinal()
            .domain(ticks)
            .rangeBands([captionWidth + padding, captionWidth + padding + stepWidth * ticks.length], 0, 0);
          var legendAxis = d3.svg.axis()
            .scale(legendScale)
            .orient("bottom")
            .tickValues(ticks.slice(1))
            .tickSize(5)
            .tickFormat(function(d) { return formatValue(d); });


          var steps = legend.selectAll("rect").data(ticks);
          steps.enter().append("rect")
            .attr("class", "step")
            .style("fill-opacity", 1e-6)
            .style("stroke-opacity", 1e-6);

          steps.attr("x", function(d) { return legendScale(d); })
            .attr("y", 0)
            .attr("width", stepWidth+"px")
            .attr("height", stepHeight)
            .style("fill", function(d) { return colorScale(d); })
            .style("fill-opacity", 1.0)
            .style("stroke-opacity", 1.0);

          steps.exit()
            .style("fill-opacity", 1e-6)
            .remove();

          legend.select(".axis").remove();
          legend.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (-0.5 * stepWidth) + "," + stepHeight + ")")
            .call(legendAxis);
        }
        else {
          svg.selectAll('.legend').remove();
          legend = null;
        }
      };

      /*******************
        Event Handlers
       *******************/
      function onDayBrushStart(d) {

      }

      function onDayBrush(d) {
        var extent = brush.extent();
        var days = g.selectAll(".day");

        days.each(function(d) { d.selected = false; });
        var dataInExtent = searchInExtent(quadtree, extent[0][0], extent[0][1], extent[1][0], extent[1][1]);
        dataInExtent.sort(compareByDate);

        days.each(function(d) {
          if (!d.selected) {
            d3.select(this).style("fill-opacity", 0.3);
          }
          else {
            d3.select(this).style("fill-opacity", 1.0);
          }
        });
        //days.classed("selected", function(d) { return d.selected; });
        dispatch.brush(dataInExtent);
      }

      function onDayBrushEnd(d) {
        if (brush.empty()) {
          // clear the brush
          g.selectAll(".day").style("fill-opacity", 1.0);
          dispatch.brushend(dataInRange);
        }
        else {
          var extent = brush.extent();
          var dataInExtent = searchInExtent(quadtree, extent[0][0], extent[0][1], extent[1][0], extent[1][1]);
          dataInExtent.sort(compareByDate);
          dispatch.brushend(dataInExtent);
        }
      }

      function onDayMouseClick(d) {
        // unselectall first
        svg.selectAll(".day")
          .classed("selected", false);

        // select the one clicked
        d3.select(this).classed("selected", true);

        // event callback
        var value = d3.select(this).data()[0];
        var date = value[settings.dateField];
        var items = value["items"];
        dispatch.click(date, items);
      }

      function onDayMouseOver(d) {
        // unselectall first
        svg.selectAll(".day")
          .classed("highlighted", false);

        // select the one clicked
        d3.select(this).classed("highlighted", true);

        // tip
        if (tip !== null) {
          tip.show(d, d3.event.target);
        }

        // event callback
        var value = d3.select(this).data()[0];
        var date = value[settings.dateField];
        var items = value["items"];
        dispatch.hover(date, items);
      }

      function onDayMouseOut(d) {
        d3.select(this).classed("highlighted", false);

        // tip
        if (tip !== null) {
          tip.hide(d);
        }
      }

      /*******************
        Utilities
       *******************/
       // compare date
      function compareByDate(a, b) {
        var date1 = new Date(a[settings.dateField]);
        var date2 = new Date(b[settings.dateField]);
        if (date1 < date2) {
            return -1;
          }
          else if (date1 > date2) {
            return 1;
          }
          else {
            return 0;
          }
      };

      // Find the nodes within the specified rectangle.
      function searchInExtent(quadtree, x0, y0, x3, y3) {
        var dataInExtent = [];
        quadtree.visit(function(node, x1, y1, x2, y2) {
          var p = node.point;
          if (p) {
            p.selected = (node.x >= x0) && (node.x + daySize < x3) && (node.y >= y0) && (node.y + daySize < y3);
            if (p.selected) {
              dataInExtent = dataInExtent.concat(p.items);
            }
          }
          return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
        });
        return dataInExtent;
      }

      // Extract and sort the values
      function getDataValues() {
        if (data !== null) {
          return data.map(function(d) {
            return parseFloat(d[settings.valueField]);
          });
        }
        return null;
      }

      // format value for legend
      function formatValue(num, opts){
        var defaultOpts = {
          short: true,
          lowerCase: false,
          addCommas: true,
          round: 2
        };

        if (typeof num != "number")
        {
          return "";
        }

        function round(num, dec)
        {
          num = num * Math.pow(10, dec);

          num = Math.round(num);

          num /= Math.pow(10, dec);

          return num;
        }

        if (typeof opts == 'undefined')
        {
          opts = {};
        }

        for (var i in defaultOpts)
        {
          opts[i] = (typeof opts[i] != 'undefined')? opts[i] : defaultOpts[i];
        }

        if (opts.short)
        {
          var decimal_places = Math.floor(Math.log(num) / Math.log(10));

          var dec = [{
            'suffix': 'T',
            'divisor': 12
          },{
            'suffix': 'B',
            'divisor': 9
          },{
            'suffix': 'M',
            'divisor': 6
          },{
            'suffix': 'K',
            'divisor': 3
          },{
            'suffix': '',
            'divisor': 0
          }];

          for (var i in dec)
          {
            if (decimal_places > dec[i].divisor)
            {
              num = round((num / Math.pow(10, dec[i].divisor)), 2 - (decimal_places - dec[i].divisor));

              if (num >= 1000 && i > 0)
              {
                decimal_places -= 3;
                num = round(num / 1000, 2 - (decimal_places - dec[i - 1].divisor));
                num += dec[i - 1].suffix;
              }
              else
              {
                num += dec[i].suffix;
              }

              break;
            }
          }

          num = '' + num;

          if (opts.lowerCase)
          {
            num = num.toLowerCase();
          }
        }
        else if (opts.addCommas)
        {
          var decnum = ('' + (round(num, opts.round) - Math.floor(num))).substr(2);

          var tempnum = '' + Math.floor(num);
          num = '';
          for (i = tempnum.length - 1, j = 0; i >= 0; i--, j++)
          {
            if (j > 0 && j % 3 == 0)
            {
              num = ',' + num;
            }
            num = tempnum[i] + num;
          }

          if (decnum > 0)
          {
            num = num + '.' + decnum;
          }
        }

        return num;
      }
      
      /*******************
      Responsive Design
     *******************/
      $( window ).resize(function() {
         if (outerWidth != el.width() || outerHeight != el.height())
            calendar.update(inputData);
         
       });
      
      

      /*******************
        Public methods
       *******************/
      calendar.on = function(type, listener) {
        dispatch.on(type, listener);
        return calendar;
      }

      calendar.update = function(seriesData, opt){
         var tempOpt = {};
         for (var i in DEFAULTS){
            if (el.data((""+i).toLowerCase()))
               tempOpt[i] = el.data((""+i).toLowerCase());
            if (el.data(""+i))
               tempOpt[i] = el.data(""+i);
         }     
         
         settings = $.extend(
             false,
             {},
             settings,
             typeof tempOpt === 'object' && tempOpt
         );

         
         settings = $.extend(
           false,
           settings,
           typeof opt === 'object' && opt
         );
        
        
        updateViz(seriesData);
        return calendar;
      }

      // render the empty calendar
      calendar.update([]);

      return calendar;
    };
  }
);
// Test comment
