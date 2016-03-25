var auth = require('./auth');
var httpProxy = require('http-proxy-middleware');

var serviceProxy = {
  init: function (proxyConfig) {
    return this.getMiddlewareRoutes(proxyConfig);
  },
  getMiddlewareRoutes : function(proxyConfig){
    var middlewares = [];
    var routes = Object.keys(proxyConfig);
    //get access token here
    middlewares.unshift(function (req, res, next) {
      var urlFound = false;
      var i = 0;
      if (req.url.match('/api')) {
        urlFound = false;
        i = 0;
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

    var agent,
        corporateProxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
    if (corporateProxyServer) {
        agent = require('https-proxy-agent');
    }
    routes.forEach(function(r) {
        var proxyOptions = {
            target: proxyConfig[r].url,
            changeOrigin: true,
            logLevel: 'debug'
        };
        if (proxyConfig[r].pathRewrite) {
            proxyOptions.pathRewrite = proxyConfig[r].pathRewrite;
        }
        if (corporateProxyServer) {
            proxyOptions.agent = agent(corporateProxyServer);
        }

        middlewares.push(httpProxy(r, proxyOptions));
    });

    return middlewares;
  }
};


module.exports = serviceProxy;
