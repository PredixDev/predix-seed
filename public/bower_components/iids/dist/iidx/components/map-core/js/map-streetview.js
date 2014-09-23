'use strict';
define(['jquery',
  'map-google',
  'OpenLayers',
  'map-core',
  'map-core-component/pubsub'],

function MapDSStreetView($, google, OpenLayers, mapDSCore, pubSub, isInstance) {

  var streetViews = [],
      initialised = false,
      mercatorString = 'EPSG:900913',
      wgs84CoordinateSystem = new OpenLayers.Projection('EPSG:4326'),
      mercator = new OpenLayers.Projection(mercatorString),
      streetViewPrecision = 50,
      defaultZoomChange = 0.5,
      mapName,
      streetViewPanorama,
      $streetViewSelector,
      $mapSelector,
      $containerSelector,
      isStreetViewEmbedded,
      streetViewTemplate = '<div id="streetview" class="map streetview"></div>',
      alertPopupText = 'Street View not available at this location';

  var eventSubscribe = function eventSubscribe() {
    if(!isInstance) {
      $.subscribe('mapInitialised', function(mapName, olMap){
        var $map = $('.map[data-map-name="'+mapName+'"]');
        var toggle = $map.data('toggle');
        if( toggle && toggle.indexOf('streetview') !== -1) {
          streetViews.push( new MapDSStreetView($, google, OpenLayers, mapDSCore, pubSub, true).init(mapName, olMap) );
        }
      });
    }
  };

  var eventPublish = function eventPublish() {
  };


  var init = function init(targetMapName, olMap, $streetViewTarget) {
    //don't let instances listen to created maps
    $.unsubscribe('mapInitialised');
    mapName = targetMapName;
    $containerSelector = $('.map[data-map-name="'+mapName+'"]');

    $mapSelector = $containerSelector.children(".mapdsMap");

    var initalStreetViewPos = new google.maps.LatLng(olMap.center.lon, olMap.center.lat);

    //generate streetview markup dynamically
    var idNumber = $('.streetview').length + 1,
        uniqueTemplate = streetViewTemplate.replace('id="streetview', 'id="streetview' + idNumber.toString());

    //build streetview div
    $streetViewSelector = $(uniqueTemplate);

    if( !$streetViewTarget ) {
      setEmbeddedInMap(true);
      $containerSelector[0].appendChild($streetViewSelector[0]);
    } else {
      setEmbeddedInMap(false);
      $streetViewTarget[0].appendChild($streetViewSelector[0]);
    }

    var panoramaOptions = {
      position: initalStreetViewPos,
      addressControl: false,
      panControl: false,
      zoomControl: false,
      disableDoubleClickZoom: true,
      scrollwheel: false,
      pov: {
        heading: 165,
        pitch: 10,
        zoom: 0
      }
    };

    streetViewPanorama = new google.maps.StreetViewPanorama($streetViewSelector[0], panoramaOptions);
    streetViewPanorama.setVisible(true);

    $streetViewSelector.hover(function() {
      $streetViewSelector.bind('mousewheel', mouseWheelHandler);
      },function(){
        $streetViewSelector.unbind('mousewheel');
    });

    $.subscribe('zoomInPastMax', function(olMap, targetMapName) {
      if(targetMapName === mapName) {
        searchForPanorama(olMap.center, streetViewPrecision );
      }
    });

    return this;
  };

  var forceRefresh = function forceRefresh() {
    streetViewPanorama.setVisible(false);
    streetViewPanorama.setVisible(true);
    streetViewPanorama.setPov(streetViewPanorama.getPov());
  };

  var mouseWheelHandler = function mouseWheelHandler(e) {
    //handles zooming on streetview and quiting
    var zoomLevel = streetViewPanorama.getZoom();
    if(e.originalEvent.wheelDelta < 0) {
      if(zoomLevel === 0) {
        exit();
      }
      else {
        streetViewPanorama.setZoom(zoomLevel - defaultZoomChange);
      }
    }
    else {
      streetViewPanorama.setZoom(zoomLevel + defaultZoomChange);
    }
    e.preventDefault();
  };

  var getCentre = function getCentre() {
    return streetViewPanorama.position;
  };

  var searchForPanorama = function searchForPanorama(position, precision) {
    var pos = $.extend(true, {}, position),
              longlat = pos.transform(mercator, wgs84CoordinateSystem),
              newPos =  new google.maps.LatLng(longlat.lat,longlat.lon),
              sv = new google.maps.StreetViewService();

    sv.getPanoramaByLocation(newPos, precision, processResult);
  };

  var isEmbeddedInMap = function isEmbeddedInMap() {
    return isStreetViewEmbedded;
  };

  var setEmbeddedInMap = function setEmbeddedInMap(booleanVal) {
    isStreetViewEmbedded = booleanVal;
  };

  var selector = function selector() {
    return $streetViewSelector;
  };

  var processResult = function processResult(data, status) {
    if (status === google.maps.StreetViewStatus.OK) {
     streetViewPanorama.setPosition(data.location.latLng);
      enter();
      $.publish('streetViewPanoFound',[selector()]);

      var $zoomIndicator = $(".zoom_out", $containerSelector);

      var exitSVClick = function(){
        exit();
        $zoomIndicator.unbind('mousedown', exitSVClick);
      }

      $zoomIndicator.on('mousedown', exitSVClick);

    }
    else if(status === google.maps.StreetViewStatus.ZERO_RESULTS){
      $.publish('mapPopupAlert',[alertPopupText, mapName]);
    }
  };

  var enter = function enter(callback) {
    if( isEmbeddedInMap() ) {
      $mapSelector.fadeOut(250,function() {
        selector().fadeIn(250, function() {
          forceRefresh();
          if(callback) {
            callback();
          }
        });
      });
    }
  };

  var exit = function exit(callback) {
    $.publish('streetViewExit',[selector(), streetViewPanorama.getPosition(), mapName ]);
    if( isEmbeddedInMap() ) {
      selector().fadeOut(250,function(){
        $mapSelector.fadeIn(250, function() {
          if(callback) {
            callback();
          }
        });
      });
    }
  };

  var getPanorama = function getPanorama(){
    return streetViewPanorama;
  }

  var show = function show(){
    selector().show();
  }

  var hide = function hide(){
    selector().hide();
  }

  var getStreetViews = function getStreetViews(){
    return streetViews;
  }

  var getMapName = function getMapName(){
    return mapName;
  }

  // Listen for interesting events
  eventSubscribe();

  return({enter              : enter,
          exit               : exit,
          getCentre          : getCentre,
          init               : init,
          hide               : hide,
          show               : show,
          isEmbeddedInMap    : isEmbeddedInMap,
          searchForPanorama  : searchForPanorama,
          getPanorama        : getPanorama,
          selector           : selector,
          setEmbeddedInMap   : setEmbeddedInMap,
          getStreetViews     : getStreetViews,
          getMapName         : getMapName
  });

});
