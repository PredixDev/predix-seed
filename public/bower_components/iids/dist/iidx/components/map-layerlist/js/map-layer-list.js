'use strict';
define([
  'jquery',
  'underscore',
  'OpenLayers',
  'hogan',
  'map-loader',
  'ge-bootstrap'],

function LayerList($, _, openlayers, hogan, mapdsConfig) {

  var templateBaseContainer = hogan.compile("<div class='base-layer-chooser{{#twoLayers}} toggle{{/twoLayers}}'><ul></ul></div>"),
      templateBaseItem = hogan.compile("<li class='{{type}}{{#visibility}} selected{{/visibility}}' rel='tooltip' data-title='{{name}}' data-container='body' data-layer-id={{id}}></li>"),
      templateOverlayItem = hogan.compile("<li class='{{#visibility}}enabled{{/visibility}}' rel='tooltip' data-placement='left' data-title='Click and drag to quickly change multiple layers' data-container='body' data-layer-id={{id}}><span></span><label>{{name}}</label></li>"),
      templateSubOverlayItem = hogan.compile("<li class='suboverlay {{#visibility}}enabled{{/visibility}}' rel='tooltip' data-placement='left' data-title='Click and drag to quickly change multiple layers' data-container='body' data-layer-id={{id}}><span></span><label>{{name}}</label></li>"),
      templateDivider = hogan.compile("<li class='divider'></li>"),
      currentMouseAction,
      mouseDown = false;

  //Layer/Layer Group state management
  var overlayManager = (function(){
    //Private
    var overlayItems = [];

    var createOverlayItem = function createOverlayItem($overlayList, overlayItem, olMap){
      if($overlayList[0].childNodes.length>0){
        $overlayList.append(templateDivider.render());
      }
      //Add a overlay item to the drop down list
      $overlayList.append(templateOverlayItem.render(overlayItem.overlay));

      //Bind events
      bindOverlayItemEvents($overlayList, overlayItem.overlay, olMap);
    };

    var createOverlayGroupItem = function createOverlayGroupItem($overlayList, overlayItem, olMap){
      if($overlayList[0].childNodes.length>0){
        $overlayList.append(templateDivider.render());
      }
      //Add an overlay group item to the drop down list
      $overlayList.append(templateOverlayItem.render(overlayItem));

      //Bind events
      bindOverlayGroupItemEvents($overlayList, overlayItem, olMap);
    };

    var createSubOverlayItem = function createSubOverlayItem($overlayList, overlayItem, olMap){
      //Add a suboverlay item to an group in the drop down list
      var numSubOverlays = overlayItem.subOverlayItems.length,
          selectorString;

      if(numSubOverlays===1){
        selectorString = "li[data-layer-id='" + overlayItem.id + "']";
        $(selectorString,$overlayList).after(templateSubOverlayItem.render(overlayItem.subOverlayItems[0].overlay)).after(templateDivider.render());
      }else{
        selectorString = "li[data-layer-id='" + overlayItem.subOverlayItems[numSubOverlays-2].id + "']";
        $(selectorString,$overlayList).after(templateSubOverlayItem.render(overlayItem.subOverlayItems[numSubOverlays-1].overlay));
      }

      //Bind events
      bindSubOverlayItemEvents($overlayList, overlayItem.subOverlayItems[numSubOverlays-1].overlay, overlayItem, olMap);

    };

    var setOverlayVisibility = function setOverlayVisibility(layerId,visible,olMap,$layerItem){
      olMap.getLayer(layerId).setVisibility(visible);
      publishVisibilityChange(layerId, visible, $layerItem);
    };

    var setSubOverlayVisibility = function setSubOverlayVisibility(layerId,visible,parentGroup,olMap,$layerItem){
      var layer = olMap.getLayer(layerId),
          $container = $layerItem.parent(),
          selectorString = "li[data-layer-id='" + parentGroup.id + "']",
          $groupLayerItem = $(selectorString,$container);

      if(parentGroup.visibility){
        //If group is visbible toggle layer
        layer.setVisibility(visible);

        //Update UI
        if(visible){
          $layerItem.addClass("enabled");
        }else{
          $layerItem.removeClass("enabled");
        }

      }else if(currentMouseAction){
        //If group is off turn on group
        $layerItem.removeClass("inactive");
        $layerItem.addClass("enabled");

        layer.setVisibility(true);

        setOverlayGroupVisibility(parentGroup,true,olMap,$groupLayerItem);
      }
      publishVisibilityChange(layerId, visible, $layerItem);
    };

    var publishVisibilityChange = function(layerId, visible, $layerItem){

      //Update UI
      if(visible){
        $layerItem.addClass("enabled");
        $.publish("overlayVisibilityChanged", [layerId, true])
      }else{
        $layerItem.removeClass("enabled");
        $.publish("overlayVisibilityChanged", [layerId, false])
      }
    };

    var setOverlayGroupVisibility = function setOverlayGroupVisibility(group,groupVisible,olMap,$layerItem){
      var subItem,
          layerId,
          selectorString,
          $subLayerItem,
          visible,
          i,
          $container;

      if(!groupVisible){
        $layerItem.removeClass("enabled");
        group.visibility = false;

        //Turn off Sub Overlays
        $container = $layerItem.parent();

        for(i = 0; i < group.subOverlayItems.length; i++){
          subItem = group.subOverlayItems[i];

          selectorString = "li[data-layer-id='" + subItem.id + "']";
          $subLayerItem = $(selectorString,$container);
          layerId = subItem.id;

          visible = getOverlayItemVisibility(layerId,olMap);

          if(visible){
            $subLayerItem.removeClass("enabled");
            $subLayerItem.addClass("inactive");
          }

          olMap.getLayer(layerId).setVisibility(false);
          publishVisibilityChange(layerId, false, $subLayerItem);
        }

      }else{
        $layerItem.addClass("enabled");
        group.visibility = true;

        //Turn on Sub Overlays
        $container = $layerItem.parent();

        for(i = 0; i < group.subOverlayItems.length; i++){
          subItem = group.subOverlayItems[i];

          selectorString = "li[data-layer-id='" + subItem.id + "']";
          $subLayerItem = $(selectorString,$container);
          layerId = subItem.id;

          if($subLayerItem.hasClass("inactive")){
            $subLayerItem.removeClass("inactive");
            $subLayerItem.addClass("enabled");

            olMap.getLayer(layerId).setVisibility(true);
          }
          publishVisibilityChange(layerId, true, $subLayerItem);
        }
      }
    };

    var getOverlayItemVisibility = function getOverlayItemVisibility(layerId,olMap){
      return olMap.getLayer(layerId).visibility;
    };

    var bindOverlayItemEvents = function bindOverlayItemEvents($overlayList, overlay, olMap){
      //Add UI events
      var item = "li[data-layer-id='"+overlay.id+"']";
      $(item,$overlayList).mousedown({map: olMap}, function(event){
        event.preventDefault();
        if(event.which==1){
          mouseDown = true;

          var $layerItem;
          if($(event.target).is("li")){
            $layerItem = $(event.target);
          }else if($(event.target).parent().is("li")){
            $layerItem = $(event.target).parent();
          }else{
            return;
          }

          var layerId = $layerItem.data('layer-id');
          var olMap = event.data.map;

          //get current visibility
          var visible = getOverlayItemVisibility(layerId,olMap);

          currentMouseAction = !visible;

          setOverlayVisibility(layerId, !visible, olMap, $layerItem);
        }
      });

      $(item,$overlayList).mouseup({map: olMap},function(event){
        event.preventDefault();
        mouseDown = false;
        currentMouseAction = null;
      });

      $(item,$overlayList).mouseenter({map: olMap},function(event){
        event.preventDefault();
        if(mouseDown){
          var $layerItem;
          if($(event.target).is("li")){
            $layerItem = $(event.target);
          }else if($(event.target).parent().is("li")){
            $layerItem = $(event.target).parent();
          }else{
            return;
          }
          var layerId = $layerItem.data('layer-id');
          var olMap = event.data.map;
          var layer = olMap.getLayer(layerId);

          setOverlayVisibility(layerId, currentMouseAction, olMap, $layerItem);
        }
      });

      //Add delay and markup to tool tip
      $(item,$overlayList).data('delay',{show: 3000, hide: 100});
    };

    var bindSubOverlayItemEvents = function bindSubOverlayItemEvents($overlayList, overlay, parentGroup, olMap){
      //Add UI events
      var item = "li[data-layer-id='"+overlay.id+"']";
      $(item,$overlayList).mousedown({map: olMap, parentGroup: parentGroup}, function(event){
        event.preventDefault();
        if(event.which==1){
          mouseDown = true;

          var $layerItem;
          if($(event.target).is("li")){
            $layerItem = $(event.target);
          }else if($(event.target).parent().is("li")){
            $layerItem = $(event.target).parent();
          }else{
            return;
          }

          var layerId = $layerItem.data('layer-id');
          var olMap = event.data.map;
          var parentGroup = event.data.parentGroup;

          currentMouseAction = !$layerItem.hasClass("enabled");

          setSubOverlayVisibility(layerId, currentMouseAction, parentGroup, olMap, $layerItem);

        }
      });

      $(item,$overlayList).mouseup({map: olMap},function(event){
        event.preventDefault();
        mouseDown = false;
        currentMouseAction = null;
      });

      $(item,$overlayList).mouseenter({map: olMap, parentGroup: parentGroup},function(event){
        event.preventDefault();
        if(mouseDown){
          var $layerItem;
          if($(event.target).is("li")){
            $layerItem = $(event.target);
          }else if($(event.target).parent().is("li")){
            $layerItem = $(event.target).parent();
          }else{
            return;
          }
          var layerId = $layerItem.data('layer-id');
          var olMap = event.data.map;
          var parentGroup = event.data.parentGroup;

          setSubOverlayVisibility(layerId, currentMouseAction, parentGroup, olMap, $layerItem);
        }
      });

      //Add delay and markup to tool tip
      $(item,$overlayList).data('delay',{show: 3000, hide: 100});
    };

    var bindOverlayGroupItemEvents = function bindOverlayGroupItemEvents($overlayList, overlay, olMap){
      //Add UI events
      var item = "li[data-layer-id='"+overlay.id+"']";
      $(item,$overlayList).mousedown({map: olMap, group: overlay}, function(event){
        event.preventDefault();
        if(event.which==1){
          mouseDown = true;

          var $layerItem;
          if($(event.target).is("li")){
            $layerItem = $(event.target);
          }else if($(event.target).parent().is("li")){
            $layerItem = $(event.target).parent();
          }else{
            return;
          }

          var layerId = $layerItem.data('layer-id');
          var olMap = event.data.map;
          var group = event.data.group;

          currentMouseAction = !$layerItem.hasClass("enabled");

          var visible = group.visibility;

          setOverlayGroupVisibility(group, !visible, olMap, $layerItem);

        }
      });

      $(item,$overlayList).mouseup({map: olMap},function(event){
        event.preventDefault();
        mouseDown = false;
        currentMouseAction = null;
      });

      $(item,$overlayList).mouseenter({map: olMap, group: overlay},function(event){
        event.preventDefault();
        if(mouseDown){
          var $layerItem;
          if($(event.target).is("li")){
            $layerItem = $(event.target);
          }else if($(event.target).parent().is("li")){
            $layerItem = $(event.target).parent();
          }else{
            return;
          }
          var layerId = $layerItem.data('layer-id');
          var olMap = event.data.map;
          var group = event.data.group;

          setOverlayGroupVisibility(group, currentMouseAction, olMap, $layerItem);
        }
      });

      //Add delay and markup to tool tip
      $(item,$overlayList).data('delay',{show: 3000, hide: 100});
    };

    var getGroupIndex = function getGroupIndex(id){
      //Test of group already exists
      for(var i=0; i<overlayItems.length; i++){
        if(overlayItems[i].subOverlayItems && overlayItems[i].id === id){
          return i;
        }
      }
      return -1;
    };

    //Public methods
    var add = function add(overlay, $overlayList, olMap){
      //Add layers and sublayers to the overlay manager
      if(overlay.layerGroup){
        var group = overlay.layerGroup;
        if(group.Id){
          //Get index of group in managed overlay array
          var groupIndex = getGroupIndex(group.Id);

          if(groupIndex == -1){
            //Create new group in array
            groupIndex = overlayItems.push({
              id: group.Id,
              visibility: true,
              name: group.Name,
              subOverlayItems: []
            });

            groupIndex--;

            //Render Group Item
            createOverlayGroupItem($overlayList,overlayItems[groupIndex],olMap);
          }

          //Add overlay as sub overlay
          overlayItems[groupIndex].subOverlayItems.push({
            id: overlay.id,
            visibility: overlay.visibility,
            overlay: overlay
          });

          //Render Sub layer
          createSubOverlayItem($overlayList,overlayItems[groupIndex],olMap);

        }
      }else{
        overlayItems.push({
          id: overlay.id,
          visibility: overlay.visibility,
          overlay: overlay
        });

        //Render Layer Item
        createOverlayItem($overlayList,overlayItems[overlayItems.length-1],olMap);
      }
    };

    var reset = function reset() {
      overlayItems = [];
    };

    return {
      add: add,
      reset: reset
    };
  })(); //end of overlayManager definition

  var eventSubscribe = function eventSubscribe() {
    $.subscribe('mapInitialised', function(mapName, olMap){
      init(mapName, olMap);
    });
    $.subscribe('addlayer', function(e){console.log(e);});
  };

  var init = function init(mapName, olMap) {
    var $mapContainer = $("div.map[data-map-name='"+mapName+"']");

    if($mapContainer){
      var baseLayers = olMap.getLayersBy("isBaseLayer", true),
      overlayLayers = olMap.getLayersBy("isBaseLayer", false);

      //If there are more than 1 avaialable base layers add the chooser
      if(baseLayers.length>1){
        buildBaseLayerChooser($mapContainer,baseLayers,olMap);
      }

      var $overlayContainer = $('button[data-layer-map="'+mapName+'"]').parent();
      var $overlayList = $("ul.dropdown-menu",$overlayContainer);

      if ($overlayList.length > 0 ) {
        if(overlayLayers.length > 0){
          buildOverlayChooser($overlayList, overlayLayers, olMap);
        }

        $.subscribe('layerAdded', function(targetolMap) {
          if( targetolMap.id === olMap.id ) {
            rebuildOverlayChooser($overlayList, olMap);
          }
        });
      }

    }
  };

  var buildBaseLayerChooser = function buildBaseLayerChooser($mapContainer, baseLayers, olMap){
    //Create main element container
    $mapContainer.append(templateBaseContainer.render({twoLayers:baseLayers.length==2}));

    //Create baselayer items
    for(var i=0; i<baseLayers.length; i++){
      $(".base-layer-chooser ul",$mapContainer).append(templateBaseItem.render(baseLayers[i]));
    }

    $(".base-layer-chooser li",$mapContainer).click({map: olMap} ,function(event){
      var layerItem = $(event.target);
      var layerId = layerItem.data('layer-id');
      var olMap = event.data.map;
      var layer = olMap.getLayer(layerId);
      olMap.setBaseLayer(layer);

        //Change slected item
        layerItem.parent().children('li').removeClass('selected');
        layerItem.addClass('selected');

      });
  };

  var sortOverlays = function sortOverlays( overlayLayers ){

    var findOverlay = function findOverlay(overlayName){
      var foundLayer;
      $.each(overlayLayers, function(){
        if (this.name === overlayName){
          foundLayer = this;
          return false;
        }
      });
      if (foundLayer) {
        overlayLayers = _.without(overlayLayers, foundLayer);
      }
      return foundLayer;
    };

    var sortedLayers = [],
        layerOrderDef = mapdsConfig.LayerOrder,
        layerObjects = overlayLayers,
        layerGroupCount = 1;

    if (layerOrderDef === undefined){
      sortedLayers = overlayLayers;
    } else {

      $.each(layerOrderDef, function(){
        if (typeof this === 'object'){
          var layerGroupName = this.LayerGroupName;
          $.each(this.Layers, function(){
            var overlay = findOverlay(this);
            if(typeof overlay !== 'undefined'){
              overlay.layerGroup = {
                'Name' : layerGroupName,
                'Id' : layerGroupCount
              };
              sortedLayers.push(overlay);
            }
          });

          layerGroupCount ++;

        }
        else {
          var thisLayer = findOverlay(this);
          if( thisLayer ) {
            sortedLayers.push( thisLayer );
          }
        }
      });

      // Include non defined layers at bottom of list
      $.each(overlayLayers, function(){
        sortedLayers.unshift( this );
      })
    }

    return sortedLayers;

  };

  var rebuildOverlayChooser = function rebuildOverlayChooser($overlayList, olMap) {
    var overlayLayers = olMap.getLayersBy("isBaseLayer", false);
    $overlayList.empty();
    overlayManager.reset();

    var sortedOverlayLayers = sortOverlays( overlayLayers );

    $.each(sortedOverlayLayers, function(i, overlay){
      addOverlayToList(overlay,$overlayList,olMap);
    });
  }

  var buildOverlayChooser = function buildOverlayChooser($overlayList, overlayLayers, olMap){
    var sortedOverlayLayers = sortOverlays( overlayLayers );

    $.each(sortedOverlayLayers, function(i, overlay){
      addOverlayToList(overlay,$overlayList,olMap);
    });

    //Prevent Overlay Chooser from closing on click
    $overlayList.click(function(event){
      event.stopPropagation();
    });

    $overlayList.mouseleave(function(event){
      currentMouseAction = null;
      mouseDown = false;
    });

    //Measure menu width when opned and make sized fix to prevent jitter when
    //text toggles between bold and normal
    var $toggleButton = $overlayList.parent().children(".dropdown-toggle");
    $toggleButton.click(function(event){
      var $menu = $(this).parent().children(".dropdown-menu");
      $menu.css("width","");
      var currentWidth = $menu.width() + "px";
      $menu.css("width",currentWidth);
    });

    //Add delay to dropdown toggle tooltip
    $toggleButton.data('delay',{show: 2000, hide: 200});
  };

  var addOverlayToList = function addOverlayToList(overlay,$overlayList,olMap){
    overlayManager.add(overlay,$overlayList,olMap);
  };

  eventSubscribe();

  return( { } );
}); // End of LayerList definition
