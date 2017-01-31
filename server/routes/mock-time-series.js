var path = require("path");

// export the routes to be used in express/json-server in app.js
// TODO: Add support for POST requests, to return different data based on request body.
module.exports = function() {
  const routes = {};
  const compressorJson = require(path.resolve(__dirname, '../sample-data/time-series/compressor-2017-compression-ratio.json'));
  routes["compression-ratio"] = compressorJson;
  return routes;
};
