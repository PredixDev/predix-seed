var viewServiceRoutes = require('./view-service-routes.js')();
var assetRoutes = require('./predix-asset-routes.js')();

// merge routes
var routes = {
  'view-service': viewServiceRoutes,
  'predix-asset': assetRoutes
};

module.exports = routes;
