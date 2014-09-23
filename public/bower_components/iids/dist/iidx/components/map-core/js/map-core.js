
'use strict';
define(['jquery',
    'underscore',
    'map-loader',
    'map-google',
    'OpenLayers',
    'map-core-component/map-layer-creator',
    'map-core-component/pubsub',
    'ge-bootstrap'],


function MapDSMap($, _, mapdsConfig, google, OpenLayers, mapdsLayerCreator) {

  var UP = 38,
      DOWN = 40,
      LEFT = 37,
      RIGHT = 39,
      PAGE_UP = 33,
      PAGE_DOWN = 34,
      END = 35,
      HOME = 36,
      PX_SMALL_PAN = 100,
      SMALL_MULTIPLIER = 2,
      LARGE_MULTIPLIER = 4,
      COMMAND = 91,
      CONTROL = 17;


  var geocoder = new google.maps.Geocoder(),
      initialised = false,
      mercatorString = 'EPSG:900913',
      wgs84CoordinateSystem = new OpenLayers.Projection('EPSG:4326'),
      mercator = new OpenLayers.Projection(mercatorString),
      alertPopupTemplate = '<div class="alert alert-info popup-navigation hide" id="alertPopup" style="position:absolute;top:0px;"></div>',
      mapTemplate = '<div id="mapdsMap." class="mapdsMap"></div>',
      __olMap,
      name,
      $mapSelector,
      $containerSelector,
      $popUpAlertSelector = null,
      isCommandDown = false,
      isControlDown = false;


  var eventSubscribe = function eventSubscribe() {
    $.subscribe('gotoAddress', function(address, mapName){
      if (mapName === name) {
        gotoAddress(address);
      }
    });

    $.subscribe('streetViewPanoFound', function(streetViewSelector, mapName) {
      if (mapName === name) {
        enterStreetView();
      }
    });

    $.subscribe('streetViewExit', function(streetViewSelector, streetViewPosition, mapName) {
      if (mapName === name) {
        setBusyCursor();
        var position = new OpenLayers.LonLat( streetViewPosition.lng(), streetViewPosition.lat()),
            longlat = position.transform(wgs84CoordinateSystem, mercator);
        //recenter the map
        __olMap.setCenter(longlat,20);
        exitStreetView();
        clearBusyCursor();
      }
    });

    $.subscribe('initNewGeoLocateControlForMap', function(geoLocateControl, mapName) {
      if (mapName === name) {
        __olMap.addControl(geoLocateControl);
      }
    });

    $.subscribe('mapPopupAlert', function(text, mapName) {
      if (mapName === name) {
        displayAlert(text);
      }
    });


    $.subscribe('layerAdded', function(targetolMap) {
      if( targetolMap.id === __olMap.id ) {
        sortOverlays();
      }
    });

  };

  var eventPublish = function eventPublish() {
    $mapSelector.click(function() {
      $.publish('mapClicked',[]);
      $.publish('mapHasFocus',[ getContainerSelector() ]);
    });

    $.publish('mapInitialised',[name, olMap()]);
  };

  var zoomEndPublish = function zoomEndPublish(){
    $.publish('zoomEnd',[name, olMap()]);
  };

  var zoomStartPublish = function zoomStartPublish(center,zoom){
    $.publish('zoomStart',[name, olMap()]);
  };

  var changeBaseLayerPublish = function changeBaseLayerPublish(){
    $.publish('changebaselayer',[name, olMap()]);
  };

  var init = function init(map) {
    $containerSelector = map;
    name = $containerSelector.data('map-name');

    var layerCollection = mapdsLayerCreator.layerCollection( mapdsConfig ),
        //generate map markup dynamically
        idNumber = $('.mapdsMap').length + 1,
        uniqueTemplate = mapTemplate.replace('id="mapdsMap.', 'id="mapdsMap.' + idNumber.toString());

    //build map div
    $mapSelector = $(uniqueTemplate);
    $containerSelector[0].appendChild($mapSelector[0]);

    var initZoomControls = function initZoomControls() {

      // capture the current key down
      //var isCommandDown = false;

      // handler for key down
      /*
      var onKeyDown = function (e) {
        console.log('key down: ' + e.keyCode);



        if (e.keyCode === COMMAND) {
          isCommandDown = true;
        }
      }*/

      // handler for key up
      var onKeyDown = function (e) {
        // flags are set for mousewheel zoom levels
        isCommandDown = e.metaKey;
        isControlDown = e.ctrlKey;

        //console.log('key down: ' + isShiftDown);

        // zoom
        if (e.keyCode === 189 || e.keyCode === 109) {
          // minus key
          zoomOut(__olMap.center);
          return false;
        }
        if (e.keyCode === 187 || e.keyCode === 107) {
          // plus key
          zoomIn(__olMap.center);
          return false;
        }

        // enable other keyboard controls here
        if (e.keyCode === UP) { // up arrow
          // check if command or control key is pressed
          if (e.metaKey || e.ctrlKey) {
            __olMap.pan(0, -1 * PX_SMALL_PAN * SMALL_MULTIPLIER);
          } else {
            __olMap.pan(0, -1 * PX_SMALL_PAN);
          }
          return false;
        }
        if (e.keyCode === DOWN) { // down arrow
          // check if command or control key is pressed
          if (e.metaKey || e.ctrlKey) {
            __olMap.pan(0, PX_SMALL_PAN * SMALL_MULTIPLIER);
          } else {
            __olMap.pan(0, PX_SMALL_PAN);
          }
          return false;
        }
        if (e.keyCode === LEFT) { // left arrow
          // check if command or control key is pressed
          if (e.metaKey || e.ctrlKey) {
            __olMap.pan(-1 * PX_SMALL_PAN * SMALL_MULTIPLIER, 0);
          } else {
            __olMap.pan(-1 * PX_SMALL_PAN, 0);
          }
          return false;
        }
        if (e.keyCode === RIGHT) { // right arrow
          // check if command or control key is pressed
          if (e.metaKey || e.ctrlKey) {
            __olMap.pan(PX_SMALL_PAN * SMALL_MULTIPLIER, 0);
          } else {
            __olMap.pan(PX_SMALL_PAN, 0);
          }
          return false;
        }
        if (e.keyCode === PAGE_UP) {
          // page up
          __olMap.pan(0, -1 * LARGE_MULTIPLIER * PX_SMALL_PAN);
          return false;
        }
        if (e.keyCode === PAGE_DOWN) {
          // page down
          __olMap.pan(0, LARGE_MULTIPLIER * PX_SMALL_PAN);
          return false;
        }
        if (e.keyCode === HOME) {
          // home
          __olMap.pan(-1 * LARGE_MULTIPLIER * PX_SMALL_PAN, 0);
          return false;
        }
        if (e.keyCode === END) {
          // right arrow
          __olMap.pan(LARGE_MULTIPLIER * PX_SMALL_PAN, 0);
          return false;
        }

      };

      var onKeyUp = function(e) {
          //console.log(e.keyCode);
          if (e.keyCode === COMMAND) {
            isCommandDown = false;
          }
          if (e.keyCode === CONTROL) {
            isControlDown = false;
          }
      }

      //bind keyboard events when hovering inside, unbind when leaving
      $mapSelector.hover(function() {
        $(document).keydown(onKeyDown);
        $(document).keyup(onKeyUp);
      },function(){
        $(document).unbind('keydown', onKeyDown);
        $(document).unbind('keyup', onKeyUp);
      });

      //bind to OpenLayers zoom events and publish
      __olMap.events.register('zoomend',{},zoomEndPublish);
      __olMap.events.register('zoomstart',{},zoomStartPublish);

      //bind to Base map changed event
      __olMap.events.register('changebaselayer',{},changeBaseLayerPublish);
    };

    var initAdditionalControls = function initAdditionalControls() {
      //adding custom mousewheel control
      var mousewheel = new OpenLayers.Control();
      OpenLayers.Util.extend(mousewheel, {
        // The draw method is called when the control is initialized
        draw: function () {
          this.mouse = new OpenLayers.Handler.MouseWheel(mousewheel,
            {
              'up' : zoomInMouse,
              'down': zoomOutMouse
            },
            {
              'interval':150,
              'cumulative':false,
              'maxDelta':4
            }
          );
          this.mouse.activate();
        }
      });
      __olMap.addControl(mousewheel);
    };

    // create map
    __olMap = new OpenLayers.Map({
      div : $mapSelector[0],
      theme : null,
      projection : mercator,
      units : 'm',
      numZoomLevels : mapdsConfig.MapOptions.ZoomLevels,
      controls: [
        new OpenLayers.Control.Navigation({
          zoomWheelEnabled: false,
          dragPanOptions: {enableKinetic: true},
          handleRightClicks: true,
          defaultDblRightClick: zoomOutMouse,
          defaultDblClick: zoomInMouse,
          zoomBox: new OpenLayers.Control.ZoomBox({
            alwaysZoom: true,
            out: false
          }),
          zoomBoxEnabled: true,
          zoomBoxKeyMask:OpenLayers.Handler.MOD_ALT
        }),
      ],
      layers: layerCollection,
      center:
        new OpenLayers.LonLat(
          mapdsConfig.MapOptions.CentreLong,
          mapdsConfig.MapOptions.CentreLat)
            .transform(wgs84CoordinateSystem, mercator),
      zoom: mapdsConfig.MapOptions.DefaultZoom
    });

    initAdditionalControls();
    initZoomControls();

    // Listen for interesting events
    eventSubscribe();
    eventPublish();
    if (!Modernizr.touch){
      // Register tooltips for non-touch devices only.
      $('[rel=tooltip]').tooltip();
    }
    initialised = true;
    return this;
  };

  var gotoAddress = function gotoAddress(address) {
    if(geocoder) {
      geocoder.geocode( {'address': address}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
          var point = results[0].geometry.location;
          var p = new OpenLayers.LonLat(point.lng(), point.lat());
          p.transform(wgs84CoordinateSystem, __olMap.getProjectionObject());
          __olMap.panTo(p);
        }
      });
      $.publish('exitStreetView', [name]);
      //quit streetview for search
      exitStreetView();
    }
  };


  var createAlertPopup = function createAlertPopup() {
    $popUpAlertSelector = $(alertPopupTemplate).html("");

    // account for if we've got the map-toolbar visible and offset down accordingly.
    if ($('.map-toolbar', $mapSelector.parent()).length){
      $popUpAlertSelector.css('top', parseInt($('.map-toolbar', $mapSelector.parent()).css('height')) + 4 + 'px');
    }
    //Add the popup
    $mapSelector[0].appendChild($popUpAlertSelector[0]);
  };

  var forceMapRefresh = function forceMapRefresh() {

    //first force layer to reload
    var active = __olMap.getLayersBy('visibility', true),
        layer;
    for(var i=0; i<active.length; i++) {
      if(active[i].isBaseLayer) {
        layer = active[i];
        break;
      }
    }

    //update map size
    __olMap.updateSize();

    //setting loaded to false unloads the layer
    layer.loaded = false;

    //setting visibility to true forces a reload of the layer
    layer.setVisibility(false);
    layer.setVisibility(true);
    layer.redraw();
  };

  var sortOverlays = function sortOverlays() {

    var layerOrder = mapdsConfig.LayerOrder,
        sortedLayers = [],
        overlayLayers = __olMap.getLayersBy("isBaseLayer", false);

    if (layerOrder === undefined) return true;

    // Order based on the defined object
    $.each(layerOrder, function(k, val){
      //expand objects...
      if(typeof val === 'string') {
        var toPush = _.findWhere(overlayLayers, {name: val});
        if (toPush) {
          sortedLayers.push(toPush);
        }
      }
      else {
        $.each(val.Layers, function(key, value){
          var toPush = _.findWhere(overlayLayers, {name: value});
          if (toPush) {
            sortedLayers.push(toPush);
          }
        });
      }
    });

    // reverse the stack, the last on the list has top render priority
    sortedLayers.reverse();

    // Put undefined layers on top priority ( probably added after creation)
    var otherLayers = _.difference(overlayLayers, sortedLayers);

    $.each(otherLayers, function(key, val) {
      sortedLayers.push(val);
    });

    //Update order in OL indexes
    var index = 0;
    $.each(sortedLayers, function() {
      __olMap.setLayerIndex(this, index);
      index++;
    });
  };

  var enterStreetView = function enterStreetView() {
    //hiding 'layers', changing tooltip, going to street view, handling mouse wheel
    $('#layer').hide();
    $('#minus').attr('data-original-title', 'Zoom out of street view').tooltip('fixTitle');
    clearBusyCursor();
  };

  var exitStreetView = function exitStreetView() {
    $('#layer').show();
    $('#minus').attr('data-original-title', 'Zoom out').tooltip('fixTitle');
    forceMapRefresh();
  };

  var displayAlert = function displayAlert(text) {
    if($popUpAlertSelector === null) {
      createAlertPopup();
    }
    clearBusyCursor();
    //if the alert popup is not displayed already create it
    if($popUpAlertSelector.css('display') === 'none') {

      //re center popup
      $popUpAlertSelector.html(text);
      $popUpAlertSelector[0].style.left = ($mapSelector.width()/2 - $popUpAlertSelector.width()/2) + 'px';

      //display alert popup and fade it out
      $popUpAlertSelector.fadeIn(0, function(){
        $popUpAlertSelector.delay(1500).fadeOut(1000);
      });
    }
  };

  var zoomIn = function zoomIn(position, zoomMultiplier) {
    zoomMultiplier = typeof zoomMultiplier !== 'undefined' ? zoomMultiplier : 1;
    if( isInitialised() ) {
      if (__olMap.zoom + (1 * zoomMultiplier) < __olMap.baseLayer.numZoomLevels) {
        __olMap.setCenter(position,__olMap.zoom + (1 * zoomMultiplier));
      }
      else {
        $.publish('zoomInPastMax',[__olMap, name]);
        setBusyCursor();
      }
    }
  };

  var zoomOut = function zoomOut(position, zoomMultiplier) {
    zoomMultiplier = typeof zoomMultiplier !== 'undefined' ? zoomMultiplier : 1;
    if( isInitialised() ) {
      __olMap.setCenter(position,__olMap.zoom - (1 * zoomMultiplier));
    }
  };

  var zoomInMouse = function zoomInMouse(e) {
    if( isInitialised() ) {
      var mousePositionPx = __olMap.events.getMousePosition(e),
          mousePositionLonLat = __olMap.getLonLatFromViewPortPx(mousePositionPx),
          newPosition = new OpenLayers.LonLat(
            (__olMap.center.lon + mousePositionLonLat.lon) / 2,
            (__olMap.center.lat + mousePositionLonLat.lat) / 2);
      var zoomMultiplier = (isCommandDown || isControlDown) ? SMALL_MULTIPLIER : 1;
      zoomIn(newPosition, zoomMultiplier);
    }
  };

  var zoomOutMouse = function zoomOutMouse(e) {
    if( isInitialised() ) {
      var mousePositionPx = __olMap.events.getMousePosition(e),
          mousePositionLonLat = __olMap.getLonLatFromViewPortPx(mousePositionPx),
          //zoom 'opposite' to the mouse cursor to ease quick zooming/dezooming
          newPosition = new OpenLayers.LonLat(
            (2 * __olMap.center.lon - mousePositionLonLat.lon) ,
            (2 * __olMap.center.lat - mousePositionLonLat.lat) );
      var zoomMultiplier = (isCommandDown || isControlDown) ? SMALL_MULTIPLIER : 1;
      zoomOut(newPosition, zoomMultiplier);
    }
  };

  var setBusyCursor = function setBusyCursor() {
    $mapSelector.addClass('busy');
  };

  var clearBusyCursor = function clearBusyCursor() {
    $mapSelector.removeClass('busy');
  };

  var olMap = function olMap() {
    return __olMap;
  };

  var isInitialised = function isInitialised() {
    return initialised;
  };

  var removeControls = function removeControls() {
    //deactivate all map controls
    $.each(__olMap.controls, function(index, control) {
      //mousewheel handler is inside a control
      if(control.mouse) {
        control.mouse.deactivate();
      }
      control.deactivate();
    });
    //deactivate keyboard zooming
    $mapSelector.off('mouseenter mouseleave');
  }

  var getMapSelector = function getMapSelector(){
    return $mapSelector;
  };

  var getContainerSelector = function getContainerSelector(){
    return $containerSelector;
  };

  var googleToOLPosition = function googleToOLPosition(googlePosition) {
    var olPos = new OpenLayers.LonLat(googlePosition.lng(),googlePosition.lat()),
        transformedPos = olPos.transform(wgs84CoordinateSystem, mercator);

    return transformedPos;
  };

  $.fn.initializeMapWithOptionsOnly = function initializeMapOptions( option ) {
    return this.each(function () {
      var $elementSelector = $(this);

      //recreate a module instance and bind it to the current element
      this.map =  new MapDSMap($, _, option, google, OpenLayers, mapdsLayerCreator).initialize($elementSelector);
    });
  };

  $.fn.initializeMap = function initializeMap( option ) {
    return this.each(function () {
      var $elementSelector = $(this);

      //if map options are provided merge with the default config
      if(option){
        $.extend(true,mapdsConfig,option);
      }

      //recreate a module instance and bind it to the current element
      this.map =  new MapDSMap($, _, mapdsConfig, google, OpenLayers, mapdsLayerCreator).initialize($elementSelector);
    });
  };

  return({
          getMapSelector      : getMapSelector,
          googleToOLPosition  : googleToOLPosition,
          initialize          : init,
          isInitialised       : isInitialised,
          olMap               : olMap,
          removeControls      : removeControls,
          zoomIn              : zoomIn,
          zoomInMouse         : zoomInMouse,
          zoomOut             : zoomOut,
          zoomOutMouse        : zoomOutMouse
  });

});
