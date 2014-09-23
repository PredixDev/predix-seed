'use strict';
define([
  'jquery',
  'OpenLayers',
  'd3-amd',
  'ge-bootstrap'],

function Zoom($, openlayers, d3) {

  var zoom_template = '<div class="zoom_control">' +
                        '<div class="indicator"></div>' +
                        '<div class="control">' +
                          '<div class="zoom_in btn btn-map"><i class="icon-plus"></i></div>' +
                          '<div class="divider"></div>' +
                          '<div class="zoom_out btn btn-map"><i class="icon-minus"></i></div>' +
                        '</div>' +
                      '</div>',
      indicatorTimerTimeout = 2000,
      indicatorTimerID,
      pressTimerID,
      autoShow; //Always Hide/Show or Auto hide show the indicator

  var eventSubscribe = function eventSubscribe() {
    $.subscribe('mapInitialised', function(mapName, olMap){
      init(mapName, olMap);
    });

    $.subscribe('zoomEnd', function(mapName, olMap){
      var numZoomLevels = olMap.numZoomLevels,
          currentZoom = olMap.zoom;

      //Enable or Disable buttons at zoom extents
      checkZoomLimits(mapName, numZoomLevels, currentZoom);

      //Update indicator
      updateIndicator(mapName, numZoomLevels, currentZoom);

      //Show indicator
      if(autoShow){
        var $mapContainer = $("div.map[data-map-name='"+mapName+"']");

        $(".zoom_control .indicator", $mapContainer).addClass('show');

        clearTimeout(indicatorTimerID);

        indicatorTimerID = window.setTimeout(function(mapName){
          var $mapContainer = $("div.map[data-map-name='"+mapName+"']");
          $(".zoom_control .indicator", $mapContainer).removeClass('show');
        },indicatorTimerTimeout,[mapName]);
      }

    });

    $.subscribe('changebaselayer', function(mapName, olMap){
      var numZoomLevels = olMap.numZoomLevels,
          currentZoom = olMap.zoom;

      //Enable or Disable buttons at zoom extents
      checkZoomLimits(mapName, numZoomLevels, currentZoom);

      //Update indicator
      updateIndicator(mapName, numZoomLevels, currentZoom);
    });

  };


  var init = function init(mapName, olMap) {

    var $mapContainer = $("div.map[data-map-name='"+mapName+"']"),
        $zoomIndicator,
        $zoomControl,
        $zoomInButton,
        $zoomOutButton;

    if(!$mapContainer || $mapContainer.data('map-zoom-control') === 'hide'){ return; }

    //Add the markup to the map
    ////////////////////////////////////
    createZoomControl($mapContainer, mapName, olMap);

    $zoomControl = $('.zoom_control .control', $mapContainer);
    $zoomIndicator = $('.zoom_control .indicator', $mapContainer);

    //Check for  configuration attributes
    ////////////////////////////////////
    switch($mapContainer.data('map-zoom-indicator')){
      case 'show':
        autoShow = false;
        $zoomIndicator.addClass('show');
        break;
      case 'hide':
        autoShow = false;
        $zoomIndicator.removeClass('show');
        break;
      case 'auto':
      default:
        autoShow = true;
    }

    //Add Event handlers
    ////////////////////////////////////

    //Show indicator on hover
    if(autoShow){
      $zoomControl.hover(function(){
        clearTimeout(indicatorTimerID);
        $zoomIndicator.addClass('show');
      }, function(){
        $zoomIndicator.removeClass('show');
      });

      $zoomIndicator.hover(function(){
        clearTimeout(indicatorTimerID);
        $zoomIndicator.addClass('show');
      }, function(){
        $zoomIndicator.removeClass('show');
      });
    }

    //Bind plus button to Zoom In
    $zoomInButton = $('.zoom_control .zoom_in', $mapContainer);

    $zoomInButton.mousedown(function(e){
      if(e.which==1){ //Left mouse button only
        $mapContainer.get(0).map.zoomIn(olMap.center);

        pressTimerID = window.setInterval(function(mapName){
          $mapContainer.get(0).map.zoomIn(olMap.center);
        }, 500,[mapName]);
      }
    });

    $zoomInButton.mouseup(function(){
      clearInterval(pressTimerID);
    });

    $zoomInButton.mouseout(function(){
      clearInterval(pressTimerID);
    });

    //Bind minus button to Zoom Out
    $zoomOutButton = $('.zoom_control .zoom_out', $mapContainer);

    $zoomOutButton.mousedown(function(e){
      if(e.which==1){ //Left mouse button only
        $mapContainer.get(0).map.zoomOut(olMap.center);

        pressTimerID = window.setInterval(function(mapName){
          $mapContainer.get(0).map.zoomOut(olMap.center);
        }, 500,[mapName]);
      }
    });

    $zoomOutButton.mouseup(function(){
      clearInterval(pressTimerID);
    });

    $zoomOutButton.mouseout(function(){
      clearInterval(pressTimerID);
    });

  };


  var createZoomControl = function createZoomControl($mapContainer, mapName, olMap){
    var numZoomLevels = olMap.numZoomLevels,
        currentZoom = olMap.zoom;
    //Inject zoom control markup
    ////////////////////////////////////
    $mapContainer.append(zoom_template);

    //Set initial state of the control
    ////////////////////////////////////
    checkZoomLimits(mapName, numZoomLevels,currentZoom);

    //Create indicator
    createIndicator(mapName, numZoomLevels, currentZoom);
  };


  var checkZoomLimits = function checkZoomLimits(mapName, numZoomLevels, currentZoom){
    var $mapContainer = $("div.map[data-map-name='"+mapName+"']"),
    $zoomInButton = $(".zoom_control .zoom_in", $mapContainer),
    $zoomOutButton = $(".zoom_control .zoom_out", $mapContainer),
    disabledClass = 'disabled';

    if(currentZoom == numZoomLevels-1){
      //Disable Zoom In button
      $zoomInButton.addClass(disabledClass);
      $zoomOutButton.removeClass(disabledClass);
    }else if(currentZoom === 0){
      //Diable Zoom Out button
      $zoomInButton.removeClass(disabledClass);
      $zoomOutButton.addClass(disabledClass);
    }else{
      $zoomInButton.removeClass(disabledClass);
      $zoomOutButton.removeClass(disabledClass);
    }
  };

  var createIndicator = function createIndicator(mapName, numZoomLevels, currentZoom){
    //ToDo: make this dynaimc
    var w = 14;
    var h = 51;

    //Create svg container
    var svg = d3.select("div.map[data-map-name='"+mapName+"'] .zoom_control .indicator").append("svg");

    svg.attr('width', w).attr('height', h);

    //Draw hash lines
    //////////////////////////////
    var hashes = [];
    var numHashes = 15;

    for(var i = 1; i <= numHashes; i++){
      hashes.push(i);
    }

    var lines = svg.selectAll('lines')
      .data(hashes)
      .enter()
      .append('line');

    var yScale = function(d, i){
      return d * 3 + 1;
    };

    var x1 = 6;
    var lw = 4;

    lines.attr('x1', x1)
      .attr('y1', yScale)
      .attr('x2', x1 + lw)
      .attr('y2', yScale)
      .attr('fill', 'none')
      .attr('stroke', '#474747')
      .attr('stroke-width', 1)
      .attr('shape-rendering','crispEdges');

    //Draw indicator
    var rh = 4;

    var ryScale = d3.scale.linear()
      .domain([numZoomLevels, 1])
      .rangeRound([2,h-2-rh]);

    var rect = svg.append('rect')
      .attr('x', x1)
      .attr('y', ryScale(currentZoom))
      .attr('width', lw)
      .attr('height', rh)
      .attr('fill', '#22a3d5')
      .attr('stroke-width', 0)
      .attr('shape-rendering','crispEdges');

  };

  var updateIndicator = function updateIndicator(mapName, numZoomLevels, currentZoom){
    var svg = d3.select("div.map[data-map-name='"+mapName+"'] .zoom_control .indicator svg");

    var h = 50;
    var rh = 4;
    var ryScale = d3.scale.linear()
      .domain([numZoomLevels, 1])
      .range([2,h-4-rh]);

    svg.selectAll('rect')
      .transition()
      .attr('y', ryScale(currentZoom))
      .duration(200);
  };

  eventSubscribe();

  return( { } );
});
