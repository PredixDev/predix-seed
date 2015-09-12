var qs = require('querystring');
var url = require('url');
var rewriteModule = require('http-rewrite-middleware');

module.exports = {
  init: function (options) {
    options = options || {}
    this.clientId = options.clientId || 'predix-seed';
    this.serverUrl = options.serverUrl || 'https://etc.predix-uaa-staging.grc-apps.svc.ice.ge.com';
    this.accessToken = null;
    this.defaultClientRoute = options.defaultClientRoute || '/about';
    this.base64ClientCredential = options.base64ClientCredential || 'cHJlZGl4LXNlZWQ6TTBhVzdrTmZRRndyTTZ3ZHJpV2h3bVc2ck1HQ045Q0x1cnI5VnI3elc0cz0=';
  },
  getAccessTokenFromCode: function (authCode, successCallback, errorCallback) {
    var request = require('request');
    var self = this;
    var options = {
      method: 'POST',
      url: this.serverUrl + '/oauth/token',
      form: {
        'grant_type': 'authorization_code',
        'code': authCode,
        'redirect_uri': 'http://localhost:9000/callback',
        'state': this.defautClientRoute
      },
      headers: {
        'Authorization': 'Basic ' + this.base64ClientCredential
      }
    };

    request(options, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        var res = JSON.parse(body);
        self.accessToken = res.token_type + ' ' + res.access_token;
        successCallback(self.accessToken);
      }
      else {
        errorCallback(body);
      }
    });
  },
  getMiddlewares: function () {
    //get access token here
    var middlewares = [];
    var uaa = this;
    var rewriteMiddleware = rewriteModule.getMiddleware([
        {
          from: '^/login(.*)$',
          to: uaa.serverUrl + '/oauth/authorize$1&response_type=code&scope=&client_id=' + uaa.clientId + '&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fcallback',
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
      ]
    );

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
      }
      else {
        next();
      }
    });

    middlewares.push(rewriteMiddleware);

    return middlewares;
  },
  hasValidSession: function () {
    return !!this.accessToken;
  },
  deleteSession: function () {
    this.accessToken = null;
  }
}
