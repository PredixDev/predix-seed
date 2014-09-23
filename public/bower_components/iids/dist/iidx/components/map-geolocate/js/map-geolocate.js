'use strict';
define(['jquery',
      'map-core',
      'OpenLayers',
      'map-core-component/pubsub'],

function Geolocate($) {
  var controls = [],
      locationErrorString = 'Your location could not be determined',
      locationNotSupportedString = 'Your browser does not support geolocalisation';

  var eventSubscribe = function eventSubscribe() {
    $.subscribe('mapInitialised', function(mapName){
      init(mapName);
    });
  };

  var init = function init(mapName) {
    var $buttons = $('button[data-locate-map="' + mapName + '"]');

    $buttons.each(function(k,val) {
      var geolocateControl = initNewGeoLocateControl(mapName);
      $.publish('initNewGeoLocateControlForMap', [geolocateControl, mapName]);
      $(val).on('click', function(ev){ locate(geolocateControl, ev) });
    });
    return this;
  };
  var initNewGeoLocateControl = function initNewGeoLocateControl(mapName){
    var geolocateControl = new OpenLayers.Control.Geolocate({
      id: 'locate-control',
      bind: true,
      watch: false  ,
      geolocationOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 7000
      }
    });

    geolocateControl.events.register('locationfailed',geolocateControl, function(ev) {currentLocationFailed(ev,mapName) });
    geolocateControl.events.register('locationuncapable',geolocateControl, function(ev) { currentLocationFailed(ev, mapName) });
    geolocateControl.events.register('locationupdated',geolocateControl,function(ev) { currentLocationUpdated(ev, mapName)} );
    controls[mapName] = geolocateControl;
    return controls[mapName];
  }

  var currentLocationUpdated = function currentLocationUpdated(position, mapName) {
    //add more data on the event on just not wrap it ?
    $.publish('geolocationUpdated',[position, mapName]);
  }

  var currentLocationFailed = function currentLocationFailed(error, mapName) {
    if(error.type == 'locationfailed'){
      displayWarningPopup(error, locationErrorString, mapName);
    }
    else if (error.type == 'locationuncapable'){
      displayWarningPopup(error, locationNotSupportedString, mapName);
    }
  };

  var displayWarningPopup = function displayWarningPopup(error, text, mapName) {
    $.publish('mapPopupAlert', [text, mapName]);
  };

  var locate = function locate(control, ev) {
    control.deactivate();
    control.activate();
    control.getCurrentLocation();
  };

  eventSubscribe();

  return({
  });

});
