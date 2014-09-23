define([
  'jquery',
  'map-markers-component/map-d3-overlay',
  'map-popovers',
  'ge-bootstrap'],

function VectorDataLayer($, MapOverlay, popovers) {
  'use strict';

  var addGeoJSON = function(collection, map, markerOptions, name){

    if(!name){
      name = 'GeoJSON';
    }

    //Merge options with defaults
    $.extend(true, popovers.popupOptions, markerOptions);

    var mapDSoverlay = new MapOverlay(collection, map, name, false);

  };

  return( {addGeoJSON: addGeoJSON } );
});
