var querystring = require('querystring');
var url = require('url');
var uaa = require('../uaa.js');

uaa.init({
    clientId: 'predix-seed',
    serverUrl: 'https://etc.predix-uaa-staging.grc-apps.svc.ice.ge.com',
    defaultClientRoute: '/about',
    base64ClientCredential: 'cHJlZGl4LXNlZWQ6TTBhVzdrTmZRRndyTTZ3ZHJpV2h3bVc2ck1HQ045Q0x1cnI5VnI3elc0cz0='
});

// Connect - static directory
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = {
    options: {
        port: 9000,
        base: 'public',
        open: true,
        hostname: 'localhost'
    },
    rules: [
        {
            from: '^/login(.*)$',
            to: uaa.serverUrl + '/oauth/authorize$1&response_type=code&scope=&client_id=predix-seed&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fcallback',
            redirect: 'permanent'
        },
        {
            from: '^/logout',
            to: uaa.serverUrl + '/logout?redirect=http://localhost:9000',
            redirect: 'permanent'
        },
        {
            from: '^[^\.|]+$',   //catch all client side routes
            to: '/index.html'
        }
    ],
    development: {
        options: {
            middleware: function (connect, options) {
                var middlewares = [];

                //get access token here
                middlewares.push(function (req, res, next) {
                    if (req.url.match('/callback')) {
                        var params = url.parse(req.url, true).query;
                        uaa.getAccessTokenFromCode(params.code, function (token) {
                            console.log('uaa access token: ', token);
                            params.state = params.state || '/about';
                            var url = req._parsedUrl.pathname.replace("/callback", params.state);
                            res.statusCode = 301;
                            res.setHeader('Location', url);
                            res.end();
                        }, function (err) {
                            console.error('error getting access token: ', err);
                            next(err);
                        });
                    } else if (req.url.match('/userinfo')) {
                        if (uaa.hasValidSession()) {
                            res.end(JSON.stringify({email: "testuser@ge.com", user_name: "Test User"}));
                        } else {
                            next(401);
                        }
                    } else if (req.url.match('/logout')) {
                        console.log("\n\nDeleiting user sesssion");
                        uaa.deleteSession();
                        next();
                    } else if (req.url.match('/api')) {
                        req.headers['Authorization'] = uaa.accessToken;
                        next();
                    } else {
                        next();
                    }
                });

                //secure routes are defined here
                var proxyConfig = {
                    proxy: {
                        forward: {
                            '/api/asset(.*)': 'https://predix-asset-ga.grc-apps.svc.ice.ge.com/asset$1'
                        }
                    }
                };

                var proxyRoutes = require('json-proxy').initialize(proxyConfig);

                middlewares.push(proxyRoutes);

                var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

                // RewriteRules support
                middlewares.push(rewriteRulesSnippet);

                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }

                var directory = options.directory || options.base[options.base.length - 1];
                options.base.forEach(function (base) {
                    // Serve static files.
                    middlewares.push(connect.static(base));
                });

                middlewares.push(require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]']));

                // Make directory browse-able.
                middlewares.push(connect.directory(directory));

                return middlewares;
            }
        }
    }
}
