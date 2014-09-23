define([
  'jquery',
  'map-markers-component/map-d3-overlay',
  'map-popovers',
  'ge-bootstrap',
  'map-core-component/pubsub'],

function Markers($, MapOverlay, popovers) {
  'use strict';

  var addMarkers = function(collection,map,markerOptions,name,indexOptions){

    if(!name){
      name = 'Markers';
    }

    //Merge options with defaults
    $.extend(true,popovers.popupOptions,markerOptions);

    var mapDSoverlay = new MapOverlay(collection, map, name, true, indexOptions).done(function(ctx){
      popovers.addPopovers(map, ctx.overlay(), ctx.feature(), collection);
      $.publish("markerLayerInitialised", [ctx]);
    });
    return mapDSoverlay;

  };

  return( {addMarkers: addMarkers } );
});
