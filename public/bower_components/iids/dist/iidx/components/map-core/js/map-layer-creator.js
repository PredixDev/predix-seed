'use strict';
define([
    'jquery',
    'OpenLayers'
  ],

function MapDSLayerCreator($, OpenLayers){

  var wmtsZoomLevels = function wmtsZoomLevels(numZoomLevels) {

    // create map zoom-levels for WMTS
    var matrixIds = new Array(26);
    for (var i=0; i<numZoomLevels; ++i) {
      matrixIds[i] = '' + i;
    }
    return matrixIds;
  };

  var layerCollection = function layerCollection( mapdsConfig ) {

    var layers = [];

    var findLayerOrCreatePlaceholder = function findLayerOrCreatePlaceholder(layerName){
      var layerToReturn;
      $.each(layers, function(){
        if (this.name === layerName){
          layerToReturn = this;
          return false;
        }
      });
      if (typeof layerToReturn == "undefined"){
        return false;
        //layerToReturn = new OpenLayers.Layer.Vector(layerName);
      }
      return layerToReturn;
    };

    var sortLayers = function sortLayers(){
      var layerOrder = mapdsConfig.LayerOrder,
          sortedLayers = [];

      if (layerOrder === undefined) {
        sortedLayers = layers;
      }
      else {
        $.each(layerOrder, function(){
          //expand objects...
          if(typeof this === 'string'){
            var toPush = findLayerOrCreatePlaceholder(this);
            if (toPush) sortedLayers.push(findLayerOrCreatePlaceholder(this));
          }
          else{
            $.each(this.Layers, function(){
              var toPush = findLayerOrCreatePlaceholder(this);
              if (toPush) sortedLayers.push(findLayerOrCreatePlaceholder(this));
            });
          }
        });

        sortedLayers = sortedLayers.reverse();

        $.each(layers, function(){
          var layerItem = this;
          var layerFound = false;
          $.each(sortedLayers, function(){
            if(layerItem === this){
              //it's included, break here.
              layerFound = true;
              return false;
            }
          });
          if (!layerFound){
            sortedLayers.push(layerItem);
          }
        });
      }

      return sortedLayers;
    };

    var mapTileRenderType = function mapTileRenderType(){
      var mapTileRender = null;
      if (! navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
        mapTileRender = 'resize';
      }
      else{
      }
      return mapTileRender;
    };

    if(mapdsConfig.Layers) {
      var layerConfig = mapdsConfig.Layers;

      /* Takes the layer config and in turn creates and adds OpenLayer Layer
         instances for each of WMTS, WMS, Google, OSM and Bing layer types.
         Returns this collection of layers.*/

      if(layerConfig.WMTS) {
        $.each(layerConfig.WMTS, function(index, val) {

          //iterate through array or object
          layers.push(new OpenLayers.Layer.WMTS({
              name: val.ExternalLayerName,
              url:  val.URL,
              layer: val.InternalLayerName,
              matrixSet: val.MatrixSet,
              matrixIds: wmtsZoomLevels(val.ZoomLevels),
              zoomOffset: val.ZoomOffset,
              tileSize: new OpenLayers.Size(val.TileSize,val.TileSize),
              format: 'image/png',
              service: 'WMTS',
              style: '',
              opacity: val.Opacity,
              isBaseLayer: val.IsBaseLayer,
              layerGroup: val.LayerGroup
            })
          );
        });
      }

      if(layerConfig.WMS) {
        $.each(layerConfig.WMS, function(index, val) {

          //iterate through array or object
          layers.push(new OpenLayers.Layer.WMS(
            val.ExternalLayerName,
            val.URL,
            val.WMSParameters,
            {
              isBaseLayer: val.IsBaseLayer,
              singleTile: val.SingleTile,
              displayOutsideMaxExtent : val.DisplayOutsideMaxExtent,
              tileSize: new OpenLayers.Size(val.TileSize,val.TileSize),
              removeBackBufferDelay: 10,
              transitionEffect: mapTileRenderType,
              opacity: val.opacity,
              layerGroup: val.LayerGroup
            }
            )
          );
        });
      }

      if(layerConfig.Image) {
        $.each(layerConfig.Image, function(index, val) {
          layers.push(new OpenLayers.Layer.Image(
              val.Name,
              val.FileName,
              new OpenLayers.Bounds(-180, -88.759, 180, 88.759),
              new OpenLayers.Size(val.width, val.height),
              {numZoomLevels: mapdsConfig.MapOptions.ZoomLevels}
            )
          );
        });
      }

      if(layerConfig.Google) {
        $.each(layerConfig.Google, function(index, val) {

          //iterate through array or object
          layers.push(new OpenLayers.Layer.Google(
            val.ExternalLayerName,
            {
              type: val.Type,
              animationEnabled: true
            }
          )
          );
        });
      }

      if(layerConfig.OSM) {
        $.each(layerConfig.OSM, function(index, val) {

          //iterate through array or object
          layers.push(new OpenLayers.Layer.OSM(
            val.ExternalLayerName//,
            // {transitionEffect: 'mapTileRenderType'}
          )
          );
        });
      }
      if(layerConfig.Bing) {
        $.each(layerConfig.Bing, function(index, val) {

          //iterate through array or object
          layers.push(new OpenLayers.Layer.Bing({
              key : val.Key,
              type : val.Type,
              name : val.ExternalLayerName,
              transitionEffect: mapTileRenderType
            })
          );
        });
      }
    return sortLayers();
    }
  };

  return({
    layerCollection : layerCollection
  });
});

