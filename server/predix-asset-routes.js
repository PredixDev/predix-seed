var glob = require("glob");
var path = require("path");
var _ = require("lodash");

// for each asset level, collect the json data to configure the json-server router
// example structure: { 'assets': [ {...}, {...} ], 'enterprises': [...], ... }
var getRoutes = function() {
  var levels = ['assets', 'enterprises', 'meters', 'plants', 'root', 'sites'];
  var routes = {};
  _.each(levels, function(level) {
    routes[level] = getLevelData(level);
  });

  var compressorJson = require(path.resolve(__dirname, './sample-data/predix-asset/compressor-2017.json'));
  routes["compressor-2017"] = compressorJson;

  return routes;
};

// Pass in the name of the level
// returns an array of objects based on data in .json files in level folder
// example structure: [ { ... json file data ... }, { ... json file data ...} ]
var getLevelData = function(level) {
  var fullPath = './sample-data/predix-asset/' + level + '/**/*.json';
  var resolvedPath = path.resolve(__dirname, fullPath);
  var jsonObjects = [];
  var files = glob.sync(resolvedPath, {}); // all JSON files in path
  _.each(files, function(file) {
    var json = require(file); // import json data
    jsonObjects.push(json);
  });
  return jsonObjects;
};

// export the routes to be used in express/json-server in app.js
module.exports = function() {
  return getRoutes();
};
