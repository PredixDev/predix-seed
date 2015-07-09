// Connect - static directory
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = {
    livereload: {
        options: {
            port: 9000,
            open: true,
            hostname: 'localhost',
            middleware: function (connect, options, middlewares) {
                return [
                    require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]']),
                    connect.static(require('path').resolve('public'))
                ];

            }
        }
    },
    test: {
        options: {
            port: 9002,
            base: ['.tmp', '.']
        }
    },
    docs: {
        options: {
            useAvailablePort: true,
            keepalive: true,
            open: true,
            middleware: function (connect) {
                return [mountFolder(connect, '.'), mountFolder(connect, '.tmp'), mountFolder(connect, 'docs')];
            }
        }
    },
    production: {
        options: {
            keepalive: true,
            port: 8000,
            middleware: function (connect, options) {
                return [
                    // rewrite requirejs to the compiled version
                    function (req, res, next) {
                        if (req.url === 'public/bower_components/requirejs/require.js') {
                            req.url = '/dist/require.min.js';
                        }
                        next();
                    }, connect.static(options.base),

                ];
            }
        }
    }
}
