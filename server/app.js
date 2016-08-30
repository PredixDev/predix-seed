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
var environmentVars = require('./config.json');

/*******************************************************
INITIALIZE VARIABLES (LOCAL OR VCAP BASED ON ENV)
*******************************************************/
var CLIENT_ID;
var CALLBACK_URL;
var AUTHORIZATION_URL;
var TOKEN_URL;
var uaaUri;
var base64ClientCredential;
var cfStrategy;
var assetURL = '';
var assetZoneId = '';
var timeseriesZone = '';
var timeseriesURL = '';

// This vcap object is used by the proxy module.
function buildVcapObjectFromLocalConfig(config) {
  'use strict';
	// console.log('local config: ' + JSON.stringify(config));
	var vcapObj = {};
	if (config.uaaURL) {
		vcapObj['predix-uaa'] = [{
			credentials: {
				uri: config.uaaURL
			}
		}];
	}
	if (config.timeseriesURL) {
		vcapObj['predix-timeseries'] = [{
			credentials: {
				query: {
					uri: config.timeseriesURL,
					'zone-http-header-value': config['timeseries_zone']
				}
			}
		}];
	}
	if (config.assetURL) {
		vcapObj['predix-asset'] = [{
			credentials: {
				uri: config.assetURL,
				zone: {
					'http-header-value': config.assetZoneId
				}
			}
		}];
	}
	return vcapObj;
}

// checking NODE_ENV to load cloud properties from VCAPS
// or development properties from config.json.
// These properties are not needed for fetching mock data.
// Only needed if you want to connect to real Predix services.
var node_env = process.env.node_env || 'development';
if(node_env === 'development') {
	var devConfig = environmentVars[node_env];
	// console.log(devConfig);
	uaaUri = devConfig.uaaURL;
	base64ClientCredential = devConfig.base64ClientCredential;
	CLIENT_ID = devConfig.clientId;
	AUTHORIZATION_URL = devConfig.uaaURL;
	TOKEN_URL = devConfig.uaaURL;
	CALLBACK_URL = devConfig.appUrl + '/callback';

	assetURL = devConfig.assetURL;
	assetZoneId = devConfig.assetZoneId;
	timeseriesZone = devConfig['timeseries_zone'];
	timeseriesURL = devConfig.timeseriesURL;

	proxy.setServiceConfig(buildVcapObjectFromLocalConfig(devConfig));
	proxy.setUaaConfig(devConfig);
} else {
	// read VCAP_SERVICES
	var vcapsServices = JSON.parse(process.env.VCAP_SERVICES);
	var uaaService = vcapsServices[process.env.uaa_service_label];
	var assetService = vcapsServices['predix-asset'];
	var timeseriesService = vcapsServices['predix-timeseries'];

	if(uaaService) {
		AUTHORIZATION_URL = uaaService[0].credentials.uri;
		TOKEN_URL = uaaService[0].credentials.uri;
	}
	if(assetService) {
		assetURL = assetService[0].credentials.uri + "/" + process.env.assetMachine;
		assetZoneId = assetService[0].credentials.zone["http-header-value"];
	}
	if(timeseriesService) {
		timeseriesZone = timeseriesService[0].credentials.query["zone-http-header-value"];
		timeseriesURL = timeseriesService[0].credentials.query.uri;
	}

	// read VCAP_APPLICATION
	var vcapsApplication = JSON.parse(process.env.VCAP_APPLICATION);
	CALLBACK_URL = 'https://' + vcapsApplication.uris[0] + '/callback';

	base64ClientCredential = process.env.base64ClientCredential;
	CLIENT_ID = process.env.clientId;
}

console.log('************'+node_env+'******************');
console.log('AUTHORIZATION_URL: ' + AUTHORIZATION_URL);
console.log('TOKEN_URL: ' + TOKEN_URL);
console.log('***************************');


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
			throw "base64ClientCredential is not correct. \n It should be the base64 encoded value of: 'client:secret' \n Set in config.json for local dev, or environment variable in the cloud.";
		}
		return values[1];
	}

	cfStrategy = new CloudFoundryStrategy({
		clientID: CLIENT_ID,
		clientSecret: getSecretFromEncodedString(base64ClientCredential),
		callbackURL: CALLBACK_URL,
		authorizationURL: AUTHORIZATION_URL,
		tokenURL: TOKEN_URL
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
if (CLIENT_ID &&
    AUTHORIZATION_URL &&
    AUTHORIZATION_URL.indexOf('https') === 0 &&
    base64ClientCredential) {
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
jsonServer.create();
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
