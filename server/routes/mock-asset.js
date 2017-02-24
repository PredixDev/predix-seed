var path = require("path");

// export the routes to be used in express/json-server in app.js
module.exports = function() {
  // mock asset data contains an extra "filter" property, so we can easily match the Predix API.
  const routes = {};

  // http://localhost:5000/mock-api/predix-asset/asset?filter=group=/group/plant-richmond-refinery
  const compressorJson = require(path.resolve(__dirname, '../sample-data/predix-asset/compressor-2017.json'));
  routes["asset"] = compressorJson;

  // http://localhost:5000/mock-api/predix-asset/group?filter=parent=/group/enterprise-predix
  const groupsJson = require(path.resolve(__dirname, '../sample-data/predix-asset/groups.json'));
  routes["group"] = groupsJson;
  return routes;
};
