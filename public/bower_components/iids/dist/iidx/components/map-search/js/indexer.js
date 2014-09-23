
define(['jquery', 'map-search-component/lunr', 'map-core-component/pubsub'],

function ClientIndexer($){
  'use strict';

  var searchIndexField = "__searchIndexField"; // The field on the feature object to index
  var defaultMaxResults = 100; // limit the munber of results
  var joinString = ", "; // used to create the index string and the secondary attribute string for display
  var facetOrderAlphanumeric = true; // false will do a numeric ordering of the facet taxonomy
  var indexes = {};

  // NB the indexed data is expected to be in the properties object of each feature
  var addToIndex = function addToIndex(d3Overlay) {

    var featureCollection = d3Overlay.collection();
    var options = d3Overlay.searchOptions()

    if(options){

      var lunrIndex = lunr(function(){
        this.field(searchIndexField)
      });

      $.each(featureCollection.features, function(index, feature){
        var idxStrArr = [];
        $.each(options.indexAttribs, function(i, attribName){
          idxStrArr.push(feature.properties[attribName]);
        });
        feature[searchIndexField] = idxStrArr.join(joinString);

        lunrIndex.add(feature);
      });

      var indexRecord = {
        search: true,
        overlay: d3Overlay,
        index: lunrIndex,
        options: options
      };

      indexes[d3Overlay.overlay().id] = indexRecord;
    }
  };

  var getResult = function getResult(indexedString, secondaryAttribs, facet, id){
    var r = {
      value: indexedString,
      id: id
    }

    if(secondaryAttribs){
      r.location = secondaryAttribs.join(joinString);
    }else{
      r.location = "";
    }

    if(facet){
      r.facet = facet;
    }else{
      r.facet = "";
    }

    return r;
  };

  var searchIndex = function searchIndex(query, isFaceted, maxResults){
    if(!maxResults){
      maxResults = defaultMaxResults;
    }

    var actualResults = [];

    $.each(indexes, function(i, indexRecord){
      if(indexRecord.search){

        var lunrResults = indexRecord.index.search(query).slice(0, maxResults);

        $.each(lunrResults, function(index, result){
          var feature = result.originalDocument;
          var options = indexRecord.options;

          if(isFaceted){
            var s = [];
            $.each(options.secondaryAttribs, function(i, attribName){
              s.push(feature.properties[attribName]);
            });

            var f = feature.properties[options.facet]

            actualResults.push(getResult(feature[searchIndexField], s, f, feature.id));
          }else{
            actualResults.push(feature[searchIndexField]);
          }
        });
      }
    });

    if(isFaceted){
      // This is a facet search so sort by facet
      actualResults.sort(function(a, b){
        if(facetOrderAlphanumeric){
          if (a.facet > b.facet){
            return 1;
          }
          if (a.facet < b.facet){
            return -1;
          }
          // a must be equal to b
          return 0;
        }else{
          return b.facet - a.facet;
        }
      });
    }

    return actualResults;
  };

  var gotoAsset = function gotoAsset(searchString, id){
    $.each(indexes, function(i, indexRecord){
      if(indexRecord.search){
        var r = indexRecord.index.search(searchString);
        if(typeof id === 'undefined'){
          // No ID - go to first record
          $.publish("gotoAsset", [indexRecord.overlay, r[0].originalDocument]);
        }else{
          for(var i = 0; i < r.length; i++){
            if(r[i].originalDocument.id === id){
              $.publish("gotoAsset", [indexRecord.overlay, r[i].originalDocument]);
            }
          }
        }
      }
    });
  }

  $.subscribe('markerLayerInitialised', function(d3Overlay){
    addToIndex(d3Overlay);
  });

  $.subscribe("overlayVisibilityChanged", function(layerId, isVisible){
    if(indexes[layerId]){
      indexes[layerId].search = isVisible;
    }
    var anyIndexesVisible = false;
    $.each(indexes, function(layerId, index){
      if(index.search){
        anyIndexesVisible = true;
        return false;
      }
    });

    $.publish("searchableAssetIndexesExist", [anyIndexesVisible])
  });

  return {
    searchIndex: searchIndex,
    gotoAsset: gotoAsset
  };

});
