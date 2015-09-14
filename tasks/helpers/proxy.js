var auth = require('./auth');

var serviceProxy = {
  init: function (proxyConfig) {
    return this.getMiddlewareRoutes(proxyConfig);
  },
  getMiddlewareRoutes : function(proxyConfig){
    var middlewares = [];
    var routes = Object.keys(proxyConfig);
    var secureProxyRoutes = {};
    //get access token here
    middlewares.unshift(function (req, res, next) {
      var urlFound = false;
      var i = 0;
      if (req.url.match('/api')) {

        console.log('proxy url', req.url);

        var urlFound = false;
        var i = 0;
        while (!urlFound) {
          if (req.url.match(routes[i])) {
            req.headers['authorization'] = auth.accessToken;
            req.headers['predix-zone-id'] = proxyConfig[routes[i]].instanceId;
            console.log('proxy headers', req.headers);
            urlFound = true;
          }
          i++;
          if (i >= routes.length) {
            urlFound = true;
          }
        }
        next();
      } else {
        next();
      }
    });

    for (var routeIndex = 0; routeIndex < routes.length; routeIndex++){
      secureProxyRoutes[routes[routeIndex]] = proxyConfig[routes[routeIndex]].url;
    }

    var config = {
      proxy: {
        forward: secureProxyRoutes
      }
    };

    middlewares.push(require('json-proxy').initialize(config));


    return middlewares;
  }
};


module.exports = serviceProxy;

