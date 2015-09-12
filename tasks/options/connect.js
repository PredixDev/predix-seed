var auth = require('../helpers/auth');
var proxy = require('../helpers/proxy');
var config = require('../helpers/config');

auth.init(config.uaa);

module.exports = {
  options: {
    port: 9000,
    base: 'public',
    open: true,
    hostname: 'localhost'
  },
  development: {
    options: {
      middleware: function (connect, options) {
        var middlewares = [];

        var middlewares = middlewares.concat(proxy.init(auth, config.proxy));

        //add auth middlewaress
        middlewares = middlewares.concat(auth.getMiddlewares());

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
