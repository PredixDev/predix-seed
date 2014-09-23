'use strict';
define([
  'jquery',
  'OpenLayers'
  ],

function Cluster($, OpenLayers) {

    var clusterCache = [],
        resolutionCache,
        clusterDistance = 80,
        threshold = 3,
        geoJSONReader = new OpenLayers.Format.GeoJSON();

    function calculateClusters(overlay, collection){

      var features = collection.features;
      if(features.length > 0) {
        var resolution = overlay.map.getResolution();
        if(resolution != resolutionCache || !clustersExist(collection)) {
            resolutionCache = resolution;
            var clusters = [];
            var feature, clustered, cluster, minDist, minDistCluster;
            for(var i = 0; i < features.length; ++i) {
              feature = features[i];
              if(feature.geometry) {
                clustered = false;
                minDist = 20015087; // Earth circumference

                for(var j=clusters.length-1; j>=0; --j) {
                  cluster = clusters[j];
                  var shc = shouldCluster(cluster, feature, resolution, clusterDistance);
                  if(shc.shouldCluster && shc.distance < minDist) {
                    minDistCluster = cluster;
                    minDist = shc.distance;
                    clustered = true;
                  }
                }
                if(clustered) {
                  addToCluster(minDistCluster, feature);
                } else {
                  clusters.push(createCluster(feature));
                }
              }
            }

            if(clusters.length > 0) {
              if(threshold > 1) {
                var clone = clusters.slice();
                clusters = [];
                var candidate;
                for(var i = 0, len=clone.length; i < len; i++) {
                  candidate = clone[i];
                  if(candidate.attributes.count < threshold) {
                    deCluster(clusters, candidate.cluster);
                    //Array.prototype.push.apply(clusters, candidate.cluster);
                  } else {
                    clusters.push(candidate);
                  }
                }
              }
            }
        }
      }
      clusterCache = clusters;
      return clusters;
    };

    function shouldCluster(cluster, feature, resolution, clusterDistance) {
        var cc = createOLTransformedGeom(cluster.geometry).getBounds().getCenterLonLat();
        var fc = createOLTransformedGeom(feature.geometry).getBounds().getCenterLonLat();
        var distance = (
            Math.sqrt(
                Math.pow((cc.lon - fc.lon), 2) + Math.pow((cc.lat - fc.lat), 2)
            ) / resolution
        );
        return {shouldCluster : (distance <= clusterDistance), distance : distance};
    };

    function addToCluster(cluster, feature) {
        cluster.cluster.push(feature);
        cluster.attributes.count += 1;
    };

    function deCluster(clusters, features) {
      for( var i = 0, len = features.length; i < len; i++ ) {
        var feature = features[i];
        clusters.push(createCluster(feature));
      }
    }

    function createCluster(feature) {
        var geometry = geoJSONReader.parseGeometry(feature.geometry);
        var center = geometry.getCentroid();

        var cluster = {
          geometry : $.parseJSON(geoJSONReader.write(center)),
          attributes: {count: 1},
          metadata: feature.metadata,
          cluster: [feature],
          properties: feature.properties,
          type: "Feature"
        };

        return cluster;
    };

    function createOLTransformedGeom(geoJSONGeom){
      return (geoJSONReader.parseGeometry(geoJSONGeom).transform("EPSG:4326", "EPSG:900913"));
    }

    function clustersExist(collection) {
        var exist = false;
        if(clusterCache && clusterCache.length > 0 &&
           clusterCache.length == collection.features.length) {
            exist = true;
            for(var i=0; i<clusterCache.length; ++i) {
                if(clusterCache[i] != collection.features[i]) {
                    exist = false;
                    break;
                }
            }
        }
        return exist;
    };
	return( {calculateClusters: calculateClusters } );
})
