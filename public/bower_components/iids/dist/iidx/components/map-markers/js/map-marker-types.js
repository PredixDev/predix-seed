define([
    'jquery',
    'module',
    'd3-amd'],
function MarkerTypes($, module, d3) {
  'use strict';

  var deferred = $.Deferred();

  //Define marker types and icons
  ///////////////////////////////
    var typeDefinitions = {
        "default": {
          translateX: -20.499,
          translateY: -20.499,
          popoverOffset: 14,
          fileName: 'marker_normal.svg'
        },
        "default-mini": {
          translateX: -19.231,
          translateY: -18.231,
          popoverOffset: 9,
          fileName: 'marker_normal_mini.svg'
        },
        "virtual": {
          translateX: -20,
          translateY: -55,
          popoverOffset: 38,
          fileName: 'marker_virtual.svg'
        },
        "virtual-mini": {
          translateX: -20.5,
          translateY: -30,
          popoverOffset: 24,
          fileName: 'marker_virtual_mini.svg'
        },
        "notification": {
          translateX: -21.999,
          translateY: -20.999,
          popoverOffset: 14,
          fileName: 'marker_notification.svg'
        },
        "notification-mini": {
          translateX: -21.999,
          translateY: -16.231,
          popoverOffset: 10,
          fileName: 'marker_notification_mini.svg'
        },
        "myposition": {
          translateX: -20.499,
          translateY: -20.499,
          popoverOffset: 14,
          fileName: 'marker_myposition.svg'
        },
        "moving": {
          translateX: -30.499,
          translateY: -20.499,
          popoverOffset: 14,
          fileName: 'marker_moving.svg'
        },
        "moving-mini": {
          translateX: -17.231,
          translateY: -15.750,
          popoverOffset: 11,
          fileName: 'marker_moving_mini.svg'
        },
        "info": {
          translateX: -20.744,
          translateY: -20.499,
          popoverOffset: 14,
          fileName: 'marker_info.svg'
        },
        "info-mini": {
          translateX: -20.231,
          translateY: -15.231,
          popoverOffset: 11,
          fileName: 'marker_info_mini.svg'
        },
    };

    var loadSVGMarkerElements = function loadSVGMarkerElements(){
      var index = 0;
      var noOfMarkers = Object.keys(typeDefinitions).length;
      //check to see if the markers are loaded, don't reload them if they're already there.
      if (!typeDefinitions.default.svgElement)
      {
        $.each(typeDefinitions, function(key, val){
          d3.xml( getSVGFileName(key), "image/svg+xml", function(xml) {
            typeDefinitions[key].svgElement = document.importNode(xml.documentElement, true);
            index++;
            if (index === noOfMarkers){
              deferred.resolve();
            }
          });
        });
      }
      else{
        deferred.resolve();
      }
    };

    var getMetadata = function getMetadata(data, prop){
      if (typeof data.metadata === "undefined"){
        return '';
      }
      else{
        return data.metadata[prop];
      }
    };

    var getType = function getType(d) {
      var size = getMetadata(d, 'size');
      var type = getMetadata(d, 'type');

      if(size === 'mini') {
          type += "-mini";
      }
      return type;
    };

    var getTranslateX = function(d){
        var type = getType(d);

        if(typeDefinitions[type]){
            return typeDefinitions[type].translateX;
        }else{
            return typeDefinitions["default"].translateX;
        }
    };

    var getTranslateY = function(d){
        var type = getType(d);

        if(typeDefinitions[type]){
            return typeDefinitions[type].translateY;
        }else{
            return typeDefinitions["default"].translateY;
        }
    };

    var getStrokeWidth = function(d){
        var type = getType(d);

        if(typeDefinitions[type]){
            return typeDefinitions[type].strokeWidth;
        }else{
            return typeDefinitions["default"].strokeWidth;
        }
    };

    var getStrokeMiterlimit = function(d){
        var type = getType(d);

        if(typeDefinitions[type]){
            return typeDefinitions[type].strokeMiterlimit;
        }else{
            return typeDefinitions["default"].strokeMiterlimit;
        }
    };

    var getStroke = function(d){
        var type = getType(d);

        if(typeDefinitions[type]){
            return typeDefinitions[type].stroke;
        }else{
            return typeDefinitions["default"].stroke;
        }
    };

    var getPopoverOffset = function(d){
        var type = getType(d);

        if(typeDefinitions[type]){
            return typeDefinitions[type].popoverOffset;
        }else{
            return typeDefinitions["default"].popoverOffset;
        }
    };

    var getSVGFileName = function(type){
        if(typeDefinitions[type]){
            return getPopoverPath() + typeDefinitions[type].fileName;
        }else{
            return getPopoverPath() + typeDefinitions["default"].fileName;
        }
    };

    var getSVGElement = function(d){
        var type = getType(d);

        if(typeDefinitions[type]){
            return typeDefinitions[type].svgElement;
        }else{
            return typeDefinitions["default"].svgElement;
        }
    };

    var getPopoverPath = function(){
      return module.uri.split('/js/')[0] + '/svg/';
    };

    return deferred.promise({
        loadSVGMarkerElements : loadSVGMarkerElements,
        getTranslateX: getTranslateX,
        getTranslateY: getTranslateY,
        getStrokeWidth: getStrokeWidth,
        getStrokeMiterlimit: getStrokeMiterlimit,
        getStroke: getStroke,
        getPopoverOffset: getPopoverOffset,
        getSVGElement: getSVGElement
    });

  });
