# Setup your app web server
In this tutorial we will discuss how to setup a Express web server and utilize  express middleware to serve in different purpose of the seed app, you will be using the following Express middleware in this step:

* http-proxy-middleware
* express-static
* json-server
* connect-history-api-fallback
* passport


## Create `Express` server

### Create a server
Follow [Express installation guide](https://expressjs.com/en/starter/installing.html). There's our basic express web app and hello world;-)

```js
var express = require('express');

var app = express();

var server = app.listen(process.env.VCAP_APP_PORT || 5000, function () {
	console.log ('Server started on port: ' + server.address().port);
});

module.exports = app;
```

#### Notes
`process.env.VCAP_APP_PORT` is the provided port as an environment variable from cloudfoundry in each predix app. [read more here](https://docs.run.pivotal.io/devguide/deploy-apps/environment-variable.html#VCAP-APP-PORT)

### Create a gulp task to start the server in `app.js`:

```js
const nodemon = require('gulp-nodemon');

module.exports = function() {
  return function() {
    nodemon({
        script: 'server/app.js',
        env: { 'base-dir' : '/../public'}
      })
      .on('restart', function() {
        console.log('app.js restarted');
      });
  };
};
```
#### Notes
[`Express`](https://expressjs.com/) is a minimal and flexible Node.js web app framework that provides a robust set of features.

[`gulp-nodemon`](https://github.com/JacksonGariety/gulp-nodemon) enable `nodemon` in gulp task.

[`nodemon`](https://github.com/remy/nodemon) watches for changes in your node.js files and then restart the server automatically.

## Serve static files
Use `express.static` to serve static assets such as HTML files, images, and so on. We serve the `dist` folder for the compiled files.

```js
var path = require('path');
var express = require('express');
var static = path.join(__dirname,
  process.env['base-dir'] ? process.env['base-dir'] : '../dist'
);
module.exports = express.static(static);
```

#### Notes
`express.static` is the only built-in `middleware` in `Express` since version 4.x. [read more here](https://expressjs.com/en/guide/using-middleware.html#middleware.built-in)

[`path`](https://nodejs.org/api/path.html) is a native node module that provides utilities for working with file and directory paths. [path.join](https://nodejs.org/api/path.html#path_path_join_paths) method joins given path segments together and return the result.

## Make sure route work with html5 history
Since the seed app is a SPA(Single Page Application) that utilise the HTML5 History API, we must make sure Express server always responds with the same index file when request different URLs in browser. [`Connect-history-api-fallback`](https://github.com/bripkens/connect-history-api-fallback) acts as a express middleware to proxy requests through a specified index page.

```js
..
var history = require('connect-history-api-fallback');
app.use(history());
...
```

## Setup mock API
We can serve our mock JSON files using [json-server](https://github.com/typicode/json-server) to create API response by assembling a JSON object on each api path by adding the following routes via `jsonServer.router`:

```js
...
var viewServiceRoutes = require('./view-service-routes.js')();
var assetRoutes = require('./predix-asset-routes.js')();
var timeSeriesRoutes = require('./time-series-routes.js')();

app.use('/api/view-service', jsonServer.router(viewServiceRoutes));
app.use('/api/predix-asset', jsonServer.router(assetRoutes));
app.use('/api/time-series', jsonServer.router(timeSeriesRoutes));
...
```

#### Notes

`jsonServer.router()` was used as a middleware in the existing Express app.

The detailed response of each API request are defined by the following files:

* /api/view-service -> /server/view-service-routes.js
* /api/time-series -> /server/time-series-routes.js
* /api/predix-asset -> /server/predix-asset-routes.js

## Authenticate the app
In order to secure seed app with Predix UAA, the Express server need to have an authentication layer. [`Passport.js`](http://passportjs.org) is an authentication middleware for Node. Firstly, initialize the session middleware to allow persistent auth token across user session:

```js
...
var config = require('./predix-config');
var uaaIsConfigured = config.clientId &&
    config.uaaURL &&
    config.uaaURL.indexOf('https') === 0 &&
    config.base64ClientCredential;

if (uaaIsConfigured) {
  app.use(passport.initialize());
  // Also use passport.session() middleware, to support persistent login sessions(recommended).
  app.use(passport.session());
}
...
```

Passport delegates the authentication details to different **strategies**, which are packaged as individual modules. In seed app we use this strategy which is defined in  `passport-config.js`.

```js
var passport = require('passport');
var PredixStrategy = require('passport-predix-oauth').Strategy;

var predixStrategy = new PredixStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    uaaURL: UAA_URL
},refreshStrategy.getOAuth2StrategyCallback() //Create a callback for OAuth2Strategy
function(accessToken, refreshToken, profile, done) {
    token = accessToken;
    done(null, profile);
});

passport.use(predixStrategy);
```

To secure all API requests using UAA, we need to employee the `main` strategy we created above, as a middleware in the route.

```js
app.use('/predix-api', passport.authenticate('main', {
  noredirect: true
}), proxy.router);
```

Other than securing the api endpoints, we shall secure the entire web app as well:

```js
//Use this route to make the entire app secure.  This forces login for any path in the entire app.
app.use('/', passport.authenticate('main', {
  noredirect: false //Don't redirect a user to the authentication page, just show an error
  }),
  history(),
  require('./static.js')
);
```