define([
  'jquery',
  'brandkit',
  'd3-amd',
  'declarative-visualizations/tooltip'
  ], function ($, brandkit, d3, d3tip) {
    'use strict';
    return function (element, opt) {
       
       var el = $(element);
       el.addClass('histogram');

       // DEFAUTLS
       var DEFAULTS = {
         valueField: "",
         bins: 5,    
         frequency: false,
         tooltip: true,
         brushing: false,
         colorTheme: "blue",
         tweenDuration: 500,
         margin: {top: 22, right: 30, bottom: 22, left: 30},
         x: null,
         y: null,
         xAxisOrient: "bottom", // bottom | top
         yAxisOrient: "left", // left | right
         showXAxis: true, 
         showYAxis: true,
         showBarsValue: true,
         barsColor: "steelblue"
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

       // build pallete from brandkit
       var colorThemes = ["orange", "purple", "red", "blue", "green", "yellow"];

       // Data
       var data = null, inputData = null;
       var binData = null;

       // Dimensions
       var outerWidth, outerHeight;  // the box dimensions including margins
       var width, height, left, right, top, bottom;  // dimensions excluding margins
       // margins for axes
       var paddingX, paddingY;
       // Axes
       var xAxis = null;
       var yAxis = null;
       
       var x, y, xAxisTickValues = [];
       
       // Bars
       var paddingBar = 0;
       

       // A formatter for counts.
       var formatCount = d3.format(",.0f");
       if (settings.frequency == false)
          formatCount = d3.format(",.02f");
       
       // TODO calculate default color scales if not specified
       var color = brandkit.accentPalette["blueLight"],
           colorHighlight = brandkit.accentPalette["blue"],
           colorSelect = brandkit.accentPalette["blueDark"];



       // Canvas
       var histogram = d3.select(element);
       var svg, g;

       // tooltip
       var tip = null;

       // brushing control
       var brush = null;

       // event dispatcher
       var dispatch = d3.dispatch('hover', 'click', 'brush', 'brushend');

       function updateViz(seriesData) {

          if (seriesData === undefined || seriesData === null || seriesData.length == 0) {
            return;
          }
          
          // update the canvas size, settings etc.
          configViz();
          
          // process data
          processData(seriesData);
          
         // draw the viz
         drawViz();
       }
       
       
       /*******************
       Configuration
      *******************/
        function configViz() {
          // margins for axes
          paddingX = 0;
          paddingY = 0; 
          if (settings.xAxisOrient == 'top')
             paddingX = 1;
          
          outerWidth = document.getElementById(el.attr("id")).offsetWidth || 600;
          outerHeight = document.getElementById(el.attr("id")).offsetHeight || 600;
          left = parseInt(settings.margin.left) + paddingX;
          right = parseInt(settings.margin.right);
          top = parseInt(settings.margin.top) + paddingY;
          bottom = parseInt(settings.margin.bottom);
          width = outerWidth - left - right;
          height = outerHeight - top - bottom;
          
          if (!svg){
             svg = histogram.append("svg");
             g = svg.append("g");
          }
          
          svg.attr("width", outerWidth).attr("height", outerHeight);
          g.attr("transform", "translate(" + left + "," + top + ")");
   
   
          // update the color scale for each cell
//          color = brandkit.accentPalette[settings.colorTheme.toLowerCase()];
          color = brandkit.accentPalette[settings.colorTheme.toLowerCase()+"Light"],
          colorHighlight = brandkit.accentPalette[settings.colorTheme.toLowerCase()],
          colorSelect = brandkit.accentPalette[settings.colorTheme.toLowerCase()+"Dark"];
          if (color === undefined || color === null) {
            console.error('The color theme is not supported!');
            return;
          }
          
        };
        
        /*******************
        Data processing
       *******************/
         function processData(seriesData) {
           inputData = seriesData;
           data = extractArray(seriesData);
           
           if (settings.x)
              x = settings.x;
           else
              x = d3.scale.linear()
                 .domain([d3.min(data), d3.max(data)])
//              .domain([0, d3.max(data)])
                 .range([0, width]);
           
           var threshold = x.ticks(settings.bins);

            // Quantile scale
//            var range = [];
//            for (var i=0; i<settings.bins; i++)
//                range.push(i);
//
//            var quantileScale = d3.scale.quantile()
//                            .range(range)
//                            .domain(data);
//
           threshold = [d3.min(data)];
//           threshold = threshold.concat(quantileScale.quantiles());
           threshold.push(d3.max(data));
           
           binData = d3.layout.histogram()
//                    .bins(threshold)
                    .bins(settings.bins)
                    .frequency(settings.frequency)
                    (data);

           // Calculate how many ticks can be shown without overlapping
           var tick_factor = Math.ceil(((binData.length + 2) * 36) / width);
           var tick_count = tick_factor; // show first tick

           xAxisTickValues = [];

           for (var i in binData){
              if ((tick_count % tick_factor) == 0)
                xAxisTickValues.push(binData[i].x);
              tick_count++;
           }
           xAxisTickValues.push(binData[i].x + binData[i].dx);

           if (settings.y)
              y = settings.y;
           else
              y = d3.scale.linear()
                 .domain([0, d3.max(binData, function(d) { return d.y; })])
                 .range([height, 0]);
         }
        
        
     
     /*******************
     Drawing functions
    *******************/
      function drawViz() {
        // draw axes
        drawAxes();
   
        // draw bars
        drawBars();
   
        // enable/disable tooltip
        drawTip();
   
        // enable/disable brushing
        drawBrush();
   
      }
      
      function drawAxes() {
         
         // remove any existing axis 
         
         svg.selectAll('.axis').remove();
         
         if(settings.showXAxis){
            // draw xAxis
            xAxis = d3.svg.axis()
                     .scale(x)
//                     .ticks(settings.bins)
                     .tickValues(xAxisTickValues)
                     .tickFormat(function(d) { return formatValue(d); })
                     .orient(settings.xAxisOrient);

            
            var xAxisLoc = height + top + paddingX;
            if (settings.xAxisOrient == "top")
               xAxisLoc = top - paddingX;
            
            // draw 
            svg.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate("+ left + "," + xAxisLoc + ")")
               .call(xAxis);
         }
         
         if(settings.showYAxis){
            // draw yAxis
            yAxis = d3.svg.axis()
                     .scale(y)
                     .orient(settings.yAxisOrient)
                     .ticks(5);
            
            var yAxisLoc = left - paddingY;
            if (settings.yAxisOrient == "right")
               yAxisLoc = left + width + paddingY;
            
            // draw 
            svg.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate("+ yAxisLoc + "," + top + ")")
               .call(yAxis);
         }

       }
      
      function drawBars(){

         svg.selectAll(".bar rect")
            .classed("selected", false);
         
         g.selectAll(".bar")
            .data(binData)
            .exit().remove();
      
         var bar = g.selectAll(".bar")
                     .data(binData)
                     .transition() // start a transition to bring the new value into view
                     .ease("linear")
                     .duration(settings.tweenDuration)
                     .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
         if (bar){
            bar.select("rect")
               .attr("width", function(d){return x(d.dx + binData[0].x) - paddingBar; })
               .attr("height", function(d) { return height - y(d.y); })
               .style("fill", color);
            
               bar.select("text")
                  .attr("x", function(d){return x(d.dx + binData[0].x) / 2; })
                  .text(function(d) { return formatCount(d.y); })
                  .style("visibility", (settings.showBarsValue == true) ? "visible" : "hidden");
         }
         
         bar = g.selectAll(".bar")
            .data(binData)
          .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
            .on("click", onBarMouseClick)
            .on("mouseover", onBarMouseOver)
            .on("mouseout", onBarMouseOut);
         
        bar.append("rect")
            .attr("x", paddingBar)
            .attr("width", function(d){return x(d.dx + binData[0].x) - paddingBar; })
            .attr("height", function(d) { return height - y(d.y); })
            .style("fill", color);
        
        
        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", function(d){return x(d.dx + binData[0].x) / 2; })
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.y); })
            .style("visibility", (settings.showBarsValue == true) ? "visible" : "hidden");
         
      }
      
      function drawTip(){
         if (settings.tooltip === true) {
            // remove old one if exists
            g.selectAll(".d3-tip").remove();
            var prescript = (settings.frequency) ? "Count" : "Probability"
            // enable the tooltip
            tip = d3tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  var html = "<strong>"+prescript+":</strong> <span>" + formatCount(d.y) + "</span>";
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
            
            brush = d3.svg.brush()
                     .x(x)
                     .on("brushend", onBrushEnd)
                     .on("brush", onBrush);

            g.append('g')
                .attr("class", "x brush")
                .call(brush)
                .selectAll("rect")
                    .attr("y", 0)
                    .attr("height", height);
          }
          else {
            g.selectAll('.brush').remove();
            brush = null;
          }
     }
     
     function onBarMouseClick(d){
        var isSelected = d3.select(this).select("rect").classed("selected");
     // unselectall first
//        svg.selectAll(".bar rect")
//          .classed("selected", false);
        // select the one clicked
        if (isSelected == false) {
            d3.select(this).select("rect").classed("selected", true);
            d3.select(this).select("rect").style("fill", colorSelect);
        }
         else{
            d3.select(this).select("rect").classed("selected", false);
            d3.select(this).select("rect").style("fill", color);
        }

         var node = d3.select(this);
         node.each(function(){ // Adding a method to move object to front
             this.parentNode.appendChild(this);
         });

        // event callback
        var selectedBars = svg.selectAll(".bar rect.selected");
        var filterdata = filterData(selectedBars);
        dispatch.click(filterdata, selectedBars);

     }
     
     function onBarMouseOver(d) {
        // unselectall first
        svg.selectAll(".bar rect")
          .classed("highlighted", false);
        // select the one clicked
        d3.select(this).select("rect").classed("highlighted", true);
        d3.select(this).select("rect").style("fill", colorHighlight);
        // tip
        if (tip !== null) {
          tip.show(d, d3.event.target);
        }

        var node = d3.select(this);
         node.each(function(){ // Adding a method to move object to front
             this.parentNode.appendChild(this);
         });
        // event callback
        var bin = d3.select(this).data()[0];
        dispatch.hover(bin, d3.select(this));
      }

    function onBarMouseOut(d) {
        d3.select(this).select("rect").classed("highlighted", false);
        if (d3.select(this).select("rect").classed("selected") == true) // Checking if the bar is selected
            d3.select(this).select("rect").style("fill", colorSelect);
        else { // if the bar is not selected
            d3.select(this).select("rect").style("fill", color);
            var node = d3.select(this);
            node.each(function(){ // Adding a method to move object to back
                var firstChild = this.parentNode.firstChild;
                if (firstChild) {
                    this.parentNode.insertBefore(this, firstChild);
                }
            });
        }
        // tip
        if (tip !== null) {
          tip.hide(d);
        }

    }
    
    function onBrush(d){
       dispatch.brush(d);
       console.log(d)
    }
    
    function onBrushEnd(d){
       dispatch.brushend(d);
    }

    /*******************
     Utilities
     *******************/

    // extracted data array

    function extractArray(){
        var histogramData = inputData.map(function(d){
            return parseFloat(d[settings.valueField]);
        });

        return histogramData;
    }

    // filter selected data

    function filterData(selectedBars){
        var filterdata = [];
        selectedBars.each(function(bar){
            var min =  bar.x,
                max = min + bar.dx;
            filterdata = filterdata.concat(inputData.filter(function(d){
                return (parseFloat(d[settings.valueField])>=min && parseFloat(d[settings.valueField])<=max);
            }));
        });
        if (selectedBars[0].length == 0)
        filterdata = inputData;
        return filterdata;
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
            histogram.update(inputData);

    });
       
     /*******************
     Public methods
    *******************/
     histogram.on = function(type, listener) {
        dispatch.on(type, listener);
        return histogram;
      }
   
     histogram.update = function(seriesData, opt){
        // merge options
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
        
        formatCount = d3.format(",.0f");
        if (settings.frequency == false)
           formatCount = d3.format(",.02f");
        
        updateViz(seriesData);
        return histogram;
      }
   
      // render the empty calendar
     histogram.update([]);
     
     
       return histogram;
    };
  }
);