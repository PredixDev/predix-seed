
define(['jquery', 'map-search-component/faceted-search', 'map-search-component/indexer', 'map-core-component/pubsub'],

function AssetAddressSearch($, f, indexr){
  'use strict';

  var searchAddresses = function searchAddresses(query, process) {
    var service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query }, function(predictions, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        process($.map(predictions, function(prediction) {
          return prediction.description;
        }));
      }
    });
  };

  var searchAssetIndex = function searchAssetIndex(query){
    // this is the faceted typeahead object in context
    return indexr.searchIndex(query, this.isFaceted, this.options.items);
  };

  var setAddressSearch = function setAddressSearch(isAddressSearch){
    console.log($.fn.facetedTypeahead);
  }

  var gotoAddressCallback = function gotoAddressCallback(val, id, f){
    for (var i = 0; i < f.options.mapNames.length; i++) {
      gotoAddress(val, f.options.mapNames[i]);
    }
  }

  var gotoAddress = function gotoAddress(val, mapName){
      $.publish('gotoAddress', [val, mapName]);
  }

  var gotoAsset = function gotoAsset(val, id, f){
    indexr.gotoAsset(val, id);
  }

  $.fn.assetOrAddressSearch = function assetOrAddressSearch(options) {
    this.each(function () {
      var $this = $(this),
          searchOptions = $.extend({}, defaults, options),
          typeahead = $this.data('facetedtypeahead');
      $this.focus();

      if(!typeahead){
        typeahead = new f.FacetedTypeahead(this, searchOptions);
        $this.data('facetedtypeahead', typeahead);
      }
    });

    if(options.type == 'asset'){
      options.source = searchAssetIndex;
      if(typeof options.isFaceted === 'undefined'){
        options.isFaceted = true;
      }
      options.viewItemCallback = gotoAsset;
      //typeahead.$menu = $(facetedTypeahead.options.menu);
    }else{
      options.source = searchAddresses;
      if(options.isFaceted !== true){
        options.isFaceted = false;
      }
      options.viewItemCallback = gotoAddressCallback;
      //typeahead.$menu = $($.fn.typeahead.defaults.menu);
    }

    this.setTypeaheadOptions(options);
  }

  var defaults = {
    type: 'address',
    items: 10,
    mapNames: ['default'],
    offsetPosY: 13,
  };

  return {
    gotoAsset: gotoAsset,
    gotoAddress: gotoAddress
  };
});
