'use strict';
define([
  'jquery',
  'OpenLayers',
  'd3-amd',
  'hogan',
  'map-markers-component/map-marker-types',
  'ge-bootstrap',
  'map-core-component/pubsub'],

function Popovers($, OpenLayers, d3, hogan, markerTypes) {

  var options = {
    popovers: false,
    popoverTemplate: "<div class='popover top fade in' data-popover-id='{{popoverId}}''><div class='arrow'></div><header class='panel-header'><div class='popover-title panel-title voice voice-brand'><h3>{{title}}</h3></div></header><div class='popover-content panel-content'><p>{{content}}</p></div><footer class='panel-footer'><div class='primary'></div><div class='secondary'></div></footer></div"
  };

  var addPopovers = function addPopovers(map, overlay, feature, collection){

    var path = d3.geo.path().projection(project);

    function project(x) {
      var point = map.getViewPortPxFromLonLat(new OpenLayers.LonLat(x[0], x[1])
          .transform("EPSG:4326", "EPSG:900913"));
      return [point.x, point.y];
    };

    //Compile popover template
    var popoverTemplate = hogan.compile(options.popoverTemplate);
    var bounds = path.bounds(collection);
    var $mapContainer = $(map.div.parentElement);

    feature.on("touchend", handleInput);
    feature.on("click", handleInput);

    function handleInput(d){
      //Temp toggle functionality
      var currentId = "#"+d.id;
      var currentMarker = d3.select(currentId);

      if((currentMarker.attr("class").search("selected")==-1) && (currentMarker.attr("class").search("cluster")==-1)){

        currentMarker.classed("selected", true);

        //Add marker ID to properties object as the popoverID for targeting
        d.properties.popoverId = d.id;
        $.publish("markerSelected", [d]);

        if(options.popovers){

          $($mapContainer).append(popoverTemplate.render(d.properties));

          //Update popover css
          var $popover = $("div[data-popover-id='" + d.id + "']",$mapContainer);
          $popover.css("display","block");
          $("header",$popover).addClass(d.metadata.state);
          $popover.attr("data-layer-name",overlay.name);
        }

        if(d3.event){
          d3.event.stopPropagation();
        }

        //Close any other popovers and deselect markers
        $(".popover:not(div[data-popover-id='" + d.id + "'])",$mapContainer).remove();
        feature.each(function(f){
          var thisId = "#" + f.id;
          var thisMarker = d3.select(thisId);

          if(currentId !== thisId){
            thisMarker.classed("selected",false);
          }
        });

        //Close on click away
        var handler = function(){
          currentMarker.classed('selected',false);
          $.publish("markerDeselected", [d]);
          if(options.popovers){
            $popover.remove();
          }
          map.events.unregister('click', map, handler);
          map.events.unregister('touchend', map, handler);
        };

        map.events.register('click', map, handler);
        map.events.register('touchend', map, handler);

        //Allow clicking in popover itself
        if(options.popovers){
          $popover.click(function(event){
            event.stopPropagation();
          });
          popoverposition(true);
        }
      }
      else{
        currentMarker.classed("selected", false);
        $("div[data-popover-id='" + d.id + "']",$mapContainer).remove();
      }
    };

    map.events.register("move",map,popoverposition);
    map.events.register("changelayer",map,layerchange);

    function popoverposition(opening){
      bounds = path.bounds(collection);

      var topLeft = bounds[0],
          bottomRight = bounds[1];

      //Compensate for size of marker
      //ToDo: dynamically set based on marker size including filter
      topLeft[0] = topLeft[0] - 42;
      topLeft[1] = topLeft[1] - 42;
      bottomRight[0] = bottomRight[0] + 42;
      bottomRight[1] = bottomRight[1] + 42;

      feature.each(function(d){
        var popover = $("div[data-popover-id='" + d.id + "']",$mapContainer);
        if(popover.length>0){
          var featureOffset = getFeaturePointTranslationXY(d);
          var left = Math.floor(featureOffset.x-popover.width()/2);
          var top = Math.floor(featureOffset.y-popover.height()-markerTypes.getPopoverOffset(d));
          var leftString = left + "px";
          var topString = top + "px";
          popover.css("left",leftString);
          popover.css("top", topString);

          if(opening===true){
            var panX = 0;
            var panY = 0;
            var right = Math.floor(left+popover.width());
            var mapWidth = $mapContainer.width();
            if(top<0){
              panY = top - 70;
            }
            if(left<0){
              panX = left - 20;
            }else if(right>mapWidth){
              panX = right - mapWidth +20;
            }

            map.pan(panX,panY,{animate: true});

          }
        }
      });


    };

    //Remove popovers if associated layer is hidden
    function layerchange(data){
        if(!data.layer.visibility){
            var $popover = $("div.popover[data-layer-name='" + data.layer.name + "']",$mapContainer);
            $popover.remove();
        }
    };


    var getFeaturePointTranslationXY = function(d){
      var pathString = path(d);
      var floatString = pathString.slice(1,pathString.indexOf("m"));
      var position = floatString.split(",");
      return {x:position[0],y:position[1]};
    };
  };
  //remove popovers for a given map object.
  function removePopovers(map){
    var $mapContainer = $(map.div.parentElement);
    $('.popover',$mapContainer).remove();
  };

  return( {popupOptions: options,
           removePopovers: removePopovers,
           addPopovers: addPopovers } );
});
