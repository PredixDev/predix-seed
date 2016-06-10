var jsonServer = require('json-server');
var _ = require('lodash');
var server = jsonServer.create();
var viewServiceRoutes = require('./view-service-routes.js')();
var assetRoutes = require('./predix-asset-routes.js')();

var middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Use router
_.each(routes, function(value, key) {
  var routes = {};
  // add view service routes
  routes['view-service'] = viewServiceRoutes;
  // add asset routes
  routes['predix-asset'] = assetRoutes;
  // merge routes
  server.use('/api/' + key, jsonServer.router(value));
});

server.listen(process.env.VCAP_APP_PORT || 5000, function() {
  console.log('Polymer Seed listening at port ' +
    (process.env.VCAP_APP_PORT ? process.env.VCAP_APP_PORT : 5000)
  );
});
