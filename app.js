var jsonServer = require('json-server');
var _ = require('lodash');
var server = jsonServer.create();
var viewServiceRoutes = require('./server/view-service-routes.js')();
var assetRoutes = require('./server/predix-asset-routes.js')();

// Set default middlewares (logger, static '/public', CORS and no-cache)
var defaultMiddlewares = jsonServer.defaults();
server.use(defaultMiddlewares);

// add view service api routes
var viewServiceAPI = jsonServer.router(viewServiceRoutes);
server.use('/api/view-service', viewServiceAPI);

// add predix asset api routes
var assetAPI = jsonServer.router(assetRoutes);
server.use('/api/predix-asset', assetAPI);

// open up port (Cloud Foundry setting or 5000)
var expressPort = process.env.VCAP_APP_PORT || 5000;
server.listen(expressPort, function() {
  console.log('Predix Seed listening at port ' + expressPort);
});
