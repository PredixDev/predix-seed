var path = require("path");

// export the routes to be used in express/json-server in app.js
module.exports = function() {
  const routes = {};
  const compressorJson = require(path.resolve(__dirname, '../sample-data/predix-asset/compressor-2017.json'));
  routes["compressor-2017"] = compressorJson;
  return routes;
};
