var auth = require('../helpers/auth');
var proxy = require('../helpers/proxy');

/**
 * Configuration for local developent uaa and predix service proxy
 * For proxy config, please extract the url and instanceId from vcap_services after your bind the app to the service
 */
var config = {
  uaa: {
    clientId: 'predix-seed',
    serverUrl: 'https://etc.predix-uaa-staging.grc-apps.svc.ice.ge.com',
    defaultClientRoute: '/about',
    base64ClientCredential: 'cHJlZGl4LXNlZWQ6TTBhVzdrTmZRRndyTTZ3ZHJpV2h3bVc2ck1HQ045Q0x1cnI5VnI3elc0cz0='
  },
  proxy: {
    '/api/asset(.*)': {
      url: 'https://predix-asset-ga.grc-apps.svc.ice.ge.com/asset$1',
      instanceId: 'c8918695-f515-41e2-ba86-cdea84848cc5'
    },
    '/api/views(.*)': {
      url: 'http://px-view-service-exp.grc-apps.svc.ice.ge.com/api$1',
      instanceId: 'c8918695-f515-41e2-ba86-cdea84848cc5'
    }
  }
};

module.exports = {
  server: {
    options: {
      port: 9000,
      base: 'public',
      open: true,
      hostname: 'localhost',
      middleware: function (connect, options) {
        var middlewares = [];

        //add predix services proxy middlewares
        middlewares = middlewares.concat(proxy.init(config.proxy));

        //add predix uaa authentication middlewaress
        middlewares = middlewares.concat(auth.init(config.uaa));

        if (!Array.isArray(options.base)) {
          options.base = [options.base];
        }

        var directory = options.directory || options.base[options.base.length - 1];
        options.base.forEach(function (base) {
          // Serve static files.
          middlewares.push(connect.static(base));
        });

        // Make directory browse-able.
        middlewares.push(connect.directory(directory));

        return middlewares;
      }
    }
  }
};
