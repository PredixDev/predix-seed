/*******************************************************
The predix-seed Express web application includes these features:

* routes to mock data files to demonstrate the UI
* passport-predix-oauth for authentication, and a sample secure routes
* a proxy module for calling Predix services such as asset and time series
*******************************************************/

var express = require('express');
var jsonServer = require('json-server'); // used for mock api responses
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var CloudFoundryStrategy = require('passport-predix-oauth').Strategy;
var OAuth2RefreshTokenStrategy = require('passport-oauth2-middleware').Strategy;
var session = require('express-session');
var proxy = require('./proxy'); // used when requesting data from real services.
// get config settings from local file or VCAPS env var in the cloud
var config = require('./predix-config');
var cfStrategy;

// if running locally, we need to set up the proxy from local config file:
var node_env = process.env.node_env || 'development';
if(node_env === 'development') {
  var devConfig = require('./localConfig.json')[node_env];
	proxy.setServiceConfig(config.buildVcapObjectFromLocalConfig(devConfig));
	proxy.setUaaConfig(devConfig);
}
console.log('************'+node_env+'******************');

/*********************************************************************
				PASSPORT PREDIX STRATEGY SETUP
**********************************************************************/
function configurePassportStrategy() {
	var refreshStrategy = new OAuth2RefreshTokenStrategy({
		refreshWindow: 10, // Time in seconds to perform a token refresh before it expires
		userProperty: 'ticket', // Active user property name to store OAuth tokens
		authenticationURL: '/', // URL to redirect unathorized users to
		callbackParameter: 'callback' //URL query parameter name to pass a return URL
	});

	passport.use('main', refreshStrategy);  //Main authorization strategy that authenticates
											//user with stored OAuth access token
											//and performs a token refresh if needed

	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.  However, since this example does not
	//   have a database of user records, the complete CloudFoundry profile is
	//   serialized and deserialized.
	passport.serializeUser(function(user, done) {
		// console.log("From USER-->"+JSON.stringify(user));
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	function getSecretFromEncodedString(encoded) {
		if (!encoded) {
			return '';
		}
		var decoded = new Buffer(encoded, 'base64').toString();
		// console.log('DECODED:  ' + decoded);
		var values = decoded.split(':');
		if (values.length !== 2) {
			throw "base64ClientCredential is not correct. \n It should be the base64 encoded value of: 'client:secret' \n Set in localConfig.json for local dev, or environment variable in the cloud.";
		}
		return values[1];
	}

	cfStrategy = new CloudFoundryStrategy({
		clientID: config.clientId,
		clientSecret: getSecretFromEncodedString(config.base64ClientCredential),
		callbackURL: config.callbackURL,
		authorizationURL: config.uaaURL,
		tokenURL: config.tokenURL
	},refreshStrategy.getOAuth2StrategyCallback() //Create a callback for OAuth2Strategy
	/* TODO: implement if needed.
	function(accessToken, refreshToken, profile, done) {
		token = accessToken;
		done(null, profile);
	}*/);

	passport.use(cfStrategy);
	//Register the OAuth strategy to perform OAuth2 refresh token workflow
	refreshStrategy.useOAuth2Strategy(cfStrategy);
}
if (config.clientId &&
    config.uaaURL &&
    config.uaaURL.indexOf('https') === 0 &&
    config.base64ClientCredential) {
	configurePassportStrategy();
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

// Initialize Passport
app.use(passport.initialize());
// Also use passport.session() middleware, to support persistent login sessions (recommended).
app.use(passport.session());

//Initializing application modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(process.env.VCAP_APP_PORT || 5000, function () {
	console.log ('Server started on port: ' + server.address().port);
});

app.use(express.static(path.join(__dirname, '../public')));

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
	SETTING ROUTES
*****************************************************************************/

// app.get('/', function(req, res) {
//   res.sendFile('../public/index.html');
// });

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

//callback route redirects to secure route
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
	// console.log('in main secure route.  req.session = ' + JSON.stringify(req.session));
	console.log('Accessing the secure route');
	res.send('<h2>This is a sample secure route.</h2>');
});

//logout route
app.get('/logout', function(req, res) {
	req.session.destroy();
	req.logout();
	cfStrategy.reset(); //reset auth tokens
	res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
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

// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler - prints stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res) {
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
app.use(function(err, req, res) {
	if (!res.headersSent) {
		res.status(err.status || 500);
		res.send({
			message: err.message,
			error: {}
		});
	}
});

module.exports = app;
