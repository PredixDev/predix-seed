/*******************************************************
The predix-seed Express web application includes these features:
  * routes to mock data files to demonstrate the UI
  * passport-predix-oauth for authentication, and a sample secure route
  * a proxy module for calling Predix services such as asset and time series
*******************************************************/

var express = require('express');
var jsonServer = require('json-server'); // used for mock api responses
var path = require('path');
var cookieParser = require('cookie-parser'); // used for session cookie
var bodyParser = require('body-parser');
var passport;  // only used if you have configured properties for UAA
// simple in-memory session is used here. use connect-redis for production!!
var session = require('express-session');
var proxy = require('./proxy'); // used when requesting data from real services.
// get config settings from local file or VCAPS env var in the cloud
var config = require('./predix-config');
// configure passport for authentication with UAA
var passportConfig = require('./passport-config');

// if running locally, we need to set up the proxy from local config file:
var node_env = process.env.node_env || 'development';
if (node_env === 'development') {
  var devConfig = require('./localConfig.json')[node_env];
	proxy.setServiceConfig(config.buildVcapObjectFromLocalConfig(devConfig));
	proxy.setUaaConfig(devConfig);
}

console.log('************'+node_env+'******************');

var uaaIsConfigured = config.clientId &&
    config.uaaURL &&
    config.uaaURL.indexOf('https') === 0 &&
    config.base64ClientCredential;
if (uaaIsConfigured) {
	passport = passportConfig.configurePassportStrategy(config);
}

/**********************************************************************
       SETTING UP EXRESS SERVER
***********************************************************************/
var app = express();

app.set('trust proxy', 1);
app.use(cookieParser('predixsample'));
// Initializing default session store
// *** Use this in-memory session store for development only. Use redis for prod. **
app.use(session({
	secret: 'predixsample',
	name: 'cookie_name',
	proxy: true,
	resave: true,
	saveUninitialized: true}));

if (uaaIsConfigured) {
  app.use(passport.initialize());
  // Also use passport.session() middleware, to support persistent login sessions (recommended).
  app.use(passport.session());
}

//Initializing application modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(process.env.VCAP_APP_PORT || 5000, function () {
	console.log ('Server started on port: ' + server.address().port);
});
app.use(express.static(path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../dist')));

/*******************************************************
SET UP MOCK API ROUTES
*******************************************************/
// Import route modules
var viewServiceRoutes = require('./view-service-routes.js')();
var assetRoutes = require('./predix-asset-routes.js')();
var timeSeriesRoutes = require('./time-series-routes.js')();

// add mock API routes.  (Remove these before deploying to production.)
app.use('/api/view-service', jsonServer.router(viewServiceRoutes));
app.use('/api/predix-asset', jsonServer.router(assetRoutes));
app.use('/api/time-series', jsonServer.router(timeSeriesRoutes));

/****************************************************************************
	SET UP EXPRESS ROUTES
*****************************************************************************/

if (uaaIsConfigured) {
  //login route redirect to predix uaa login page
  app.get('/login',passport.authenticate('predix', {'scope': ''}), function(req, res) {
    // The request will be redirected to Predix for authentication, so this
    // function will not be called.
  });

  // access real Predix services using this route.
  // the proxy will add UAA token and Predix Zone ID.
  app.use('/predix-api',
  	passport.authenticate('main', {
  		noredirect: true
  	}),
  	proxy.router);

  //callback route redirects to secure route after login
  app.get('/callback', passport.authenticate('predix', {
  	failureRedirect: '/'
  }), function(req, res) {
  	console.log('Redirecting to secure route...');
  	res.redirect('/secure');
    });

  //secure route checks for authentication
  app.get('/secure', passport.authenticate('main', {
  	noredirect: true //Don't redirect a user to the authentication page, just show an error
    }), function(req, res) {
  	console.log('Accessing the secure route');
    // modify this to send a secure.html file if desired.
  	res.send('<h2>This is a sample secure route.</h2>');
  });
}

//logout route
app.get('/logout', function(req, res) {
	req.session.destroy();
	req.logout();
  passportConfig.reset(); //reset auth tokens
  res.redirect(config.uaaURL + '/logout?redirect=' + config.appURL);
});

app.get('/favicon.ico', function (req, res) {
	res.send('favicon.ico');
});

// Sample route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
//currently not being used as we are using passport-oauth2-middleware to check if
//token has expired
/*
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
*/

////// error handlers //////
// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler - prints stacktrace
if (node_env === 'development') {
	app.use(function(err, req, res, next) {
		if (!res.headersSent) {
			res.status(err.status || 500);
			res.send({
				message: err.message,
				error: err
			});
		}
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	if (!res.headersSent) {
		res.status(err.status || 500);
		res.send({
			message: err.message,
			error: {}
		});
	}
});

module.exports = app;
