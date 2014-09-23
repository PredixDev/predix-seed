define([  'jquery',
          'OpenLayers',
          'map-markers-component/map-marker-types',
          'd3-amd',
          'map-popovers',
          'map-core-component/pubsub'],

function Overlay($, OpenLayers, mapMarkerTypes, d3, popovers) {
  'use strict';

  var generatedId = 0;

  function OverlayConstructor(collection, map, name, isMarker, indexOptions) {

    var div,
        svg,
        g,
        path,
        feature,
        layerData,
        bounds,
        ctx = this,
        deferred = $.Deferred();

    var iconSet = (function(){

        var getX = function(d){
          return ((typeof d.metadata === 'undefined')||(typeof d.metadata.iconPos === 'undefined')) ? -7 : d.metadata.iconPos.x;
        };

        var getY = function(d){
          return ((typeof d.metadata === 'undefined')||(typeof d.metadata.iconPos === 'undefined')) ? 5 : d.metadata.iconPos.y;
        };

        var getIcon = function(d){

          var unicodeId = "";

          if(typeof d.metadata !== 'undefined'){

            unicodeId = d.metadata.icon;

            if(d.metadata.size == "mini"){
                unicodeId = "";
            }

          }

          return unicodeId;
        };

        return ({
            getIcon: getIcon,
            getX: getX,
            getY: getY
        });
    })();

    var getId = function(d){
      if(typeof d.id === 'undefined'){
        d.id = "id" + generatedId++;
      }

      return d.id;
    };

    var $mapContainer = $(map.div.parentElement),
        //Create vector layer
        overlay = new OpenLayers.Layer.Vector(name),
        searchOptions = indexOptions,
        svgElement = (function(){
          if( isMarker ){
            return "g";
          }
          else{
            return "path";
          }
        })();


    this.$mapcontainer = function(){ return $mapContainer; };
    this.overlay = function(){ return overlay; };
    this.feature = function(){ return feature; };
    this.collection = function(){ return collection; };
    this.searchOptions = function(){ return searchOptions; };
    this.updateLayerData = function(data){ updateLayerData(data); };

    $.subscribe("gotoAsset", function(d3Overlay, feature){
      // select the marker
      if(d3Overlay.overlay() === overlay){
        d3Overlay.feature().on('click')(feature);

        // goto location
        var olOverlay = d3Overlay.overlay();
        var c = feature.geometry.coordinates;
        olOverlay.map.panTo(new OpenLayers.LonLat(c[0], c[1]).transform("EPSG:4326", "EPSG:900913"));
      }
    });

    var getFeatureState = function(d){
        if (isMarker){
          return (typeof d.metadata === 'undefined') ? '' : d.metadata.state;
        }
        else{
          return d.geometry.type.toLowerCase();
        }
    };

    var getCSSClass = function(){
      if (isMarker){
        return 'marker';
      }
      else{
        return 'vector';
      }
    };

    var getFeaturePointTranslation = function getFeaturePointTranslation(d){
          var pathString = path(d);
          var floatString = pathString.slice(1,pathString.indexOf("m"));
          var translateString = "translate(" + floatString + ")";
          return translateString;
    };

    function createD3Layer(data){

      layerData = data;

      //Create geo located group to contain the marker
      feature = g.selectAll(svgElement)
        .data(layerData.features) //Use feature id for join
        .enter()
        .append(svgElement)
        .attr("class",getFeatureState)
        .classed(getCSSClass(),true)
        .attr("transform", getFeaturePointTranslation)
        .attr("id",getId)
        .on("mouseover", function(){
            d3.select(this)
                .classed("active",true);
        })
        .on("mouseout", function(){
            d3.select(this)
                .classed("active",false);
        })
        .on("dblclick", function(){
            if(isMarker){
              d3.event.stopPropagation();
            }
        });

        if(isMarker){

          feature.each(function(d,i){
            var thisMarker = this.appendChild( mapMarkerTypes.getSVGElement(d).cloneNode(true) );
            var data = d;
            d3.select(thisMarker)
              .attr("x", mapMarkerTypes.getTranslateX(data))
              .attr("y", mapMarkerTypes.getTranslateY(data));
          });

          // Draw icon
          feature.append('text')
            .style('font-family', 'FontAwesome')
            .style('font-size', '14px' )
            .attr('x', iconSet.getX)
            .attr('y', iconSet.getY)
            .attr('fill','white')
            .text(iconSet.getIcon);
        }


      map.events.register("moveend", map, reset);

      reset();

      //Update positions on map move
      function reset() {
        bounds = path.bounds(layerData);

        var topLeft = bounds[0],
            bottomRight = bounds[1];

        //Compensate for size of marker
        //ToDo: dynamically set based on marker size including filter
        topLeft[0] = topLeft[0] - 42;
        topLeft[1] = topLeft[1] - 42;
        bottomRight[0] = bottomRight[0] + 42;
        bottomRight[1] = bottomRight[1] + 42;

        svg.attr("width", bottomRight[0] - topLeft[0] )
            .attr("height", bottomRight[1] - topLeft[1])
            .style("margin-left", topLeft[0] + "px")
            .style("margin-top", topLeft[1] + "px");

        g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
        feature.attr("d", path);
        feature.attr("transform", getFeaturePointTranslation);
      }

    }

    var updateLayerData = function updateLayerData(data){
      popovers.removePopovers(map);
      resetSVG(data);
      if (isMarker){
        mapMarkerTypes.loadSVGMarkerElements();

        mapMarkerTypes.done(function(){
          createD3Layer(data);
          deferred.resolve(ctx);
        });
      }
      else{
        createD3Layer(data);
      }

    };

    var resetSVG = function resetSVG(data){
      div = d3.selectAll("[id='" + overlay.div.id + "']");
      div.selectAll("svg").remove();
      svg = div.append("svg");

      g = svg.append("g");

      path = d3.geo.path().projection(project);
      bounds = path.bounds(data);

      function project(x) {
          var point = map.getViewPortPxFromLonLat(new OpenLayers.LonLat(x[0], x[1])
              .transform("EPSG:4326", "EPSG:900913"));
          return [point.x, point.y];
      }
    };

    var callAfterAdd = function callAfterAdd() {
      updateLayerData(collection);
    };

    overlay.afterAdd = callAfterAdd;

    ///TODO: Send to CORE instead of OL to handle render order
    map.addLayer(overlay);
    $.publish('layerAdded', [map]);
    return deferred.promise(this);

  }
  return OverlayConstructor;
});
