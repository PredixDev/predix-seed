/**
 * This module can be used to set up reverse proxying from client to Predix services.
 * It assumes only one UAA instance, one UAA client, and one instance of each service.
 * Use setUaaConfig() and setServiceConfig() for local development.
 * In cloud foundry, set the following environment vars: clientId, base64ClientCredential
 * Info for bound services is read from VCAP environment variables.
 */

var url = require('url');
var express = require('express');
var expressProxy = require('express-http-proxy');
var HttpsProxyAgent = require('https-proxy-agent');
var router = express.Router();
var vcapServices = {};

var corporateProxyServer = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY;
var corporateProxyAgent;
if (corporateProxyServer) {
	corporateProxyAgent = new HttpsProxyAgent(corporateProxyServer);
}

var clientId = process.env.clientId;
var base64ClientCredential = process.env.base64ClientCredential;
var uaaURL = (function() {
	var vcapsServices = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : {};
	var uaaService = vcapsServices['predix-uaa'];
	var uaaURL;

	if(uaaService) {
		uaaURL = uaaService[0].credentials.uri;
	}
	return uaaURL;
}) ();

// Pass a VCAPS object here if desired, for local config.
//  Otherwise, this module reads from VCAP_SERVICES environment variable.
var setServiceConfig = function(vcaps) {
	vcapServices = vcaps;
	setProxyRoutes();
};

var setUaaConfig = function(options) {
	clientId = options.clientId || clientId;
	uaaURL = options.uaaURL || uaaURL;
	base64ClientCredential = options.base64ClientCredential || base64ClientCredential;
};

var getClientToken = function(successCallback, errorCallback) {
	var request = require('request');
	var options = {
		method: 'POST',
		url: uaaURL + '/oauth/token',
		form: {
			'grant_type': 'client_credentials',
			'client_id': clientId
		},
		headers: {
			'Authorization': 'Basic ' + base64ClientCredential
		}
	};

	request(options, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			// console.log('response from getClientToken: ' + body);
			var clientTokenResponse = JSON.parse(body);
			successCallback(clientTokenResponse['token_type'] + ' ' + clientTokenResponse['access_token']);
		} else if (errorCallback) {
			errorCallback(body);
		} else {
			console.log('ERROR fetching client token: ' + body);
		}
	});
};

function cleanResponseHeaders (rsp, data, req, res, cb) {
	res.removeHeader('Access-Control-Allow-Origin');
	cb(null, data);
}

function buildDecorator(zoneId) {
	var decorator = function(req) {
		if (corporateProxyAgent) {
			req.agent = corporateProxyAgent;
		}
		req.headers['Content-Type'] = 'application/json';
		if (zoneId) {
			req.headers['Predix-Zone-Id'] = zoneId;
		}
		return req;
	};
	return decorator;
}

function getEndpointAndZone(key, credentials) {
	var out = {};
	// ugly code needed since vcap service variables are not consistent across services
	// TODO: all the other predix services
	if (key === 'predix-asset') {
		out.serviceEndpoint = credentials.uri;
		out.zoneId = credentials.zone['http-header-value'];
	} else if (key === 'predix-timeseries') {
		var urlObj = url.parse(credentials.query.uri);
		out.serviceEndpoint = urlObj.protocol + '//' + urlObj.host;
		out.zoneId = credentials.query['zone-http-header-value'];
	}
	if (!out.serviceEndpoint) {
		console.log('no proxy set for service: ' + key);
	}
	return out;
}

var setProxyRoute = function(key, credentials) {
	// console.log(JSON.stringify(credentials));
	var routeOptions = getEndpointAndZone(key, credentials);
	if (!routeOptions.serviceEndpoint) {
		return;
	}
	console.log('setting proxy route for key: ' + key);
	console.log('serviceEndpoint: ' + routeOptions.serviceEndpoint);
	// console.log('zone id: ' + routeOptions.zoneId);
	var decorator = buildDecorator(routeOptions.zoneId);

	router.use('/' + key, expressProxy(routeOptions.serviceEndpoint, {
		https: true,
		forwardPath: function (req) {
			console.log('req.url: ' + req.url);
			return req.url;
		},
		intercept: cleanResponseHeaders,
		decorateRequest: decorator
	}));
};

// Fetches client token, adds to request headers, and stores in session.
// Returns 403 if no session.
// Use this middleware to proxy a request to a secure service, using a client token.
var addClientTokenMiddleware = function(req, res, next) {
	function errorHandler(errorString) {
		// TODO: fix, so it doesn't return a status 200.
		//  Tried sendStatus, but headers were already set.
		res.send(errorString);
	}
	// console.log('proxy root route');
	if (req.session) {
		// console.log('session found.');
		if (!req.session.clientToken) {
			// console.log('fetching client token');
			getClientToken(function(token) {
				req.session.clientToken = token;
				req.headers['Authorization'] = req.session.clientToken;
				next();
			}, errorHandler);
		} else {
			// console.log('client token found in session');
			req.headers['Authorization'] = req.session.clientToken;
			next();
		}
	} else {
		next(res.sendStatus(403).send('Forbidden'));
	}
};

router.use('/', addClientTokenMiddleware);

// TODO: Support for multiple instances of the same service.
var setProxyRoutes = function() {
	var vcapString = process.env.VCAP_SERVICES;
	var serviceKeys = [];
	vcapServices = vcapString ? JSON.parse(vcapString) : vcapServices;
	console.log('vcaps: ' + JSON.stringify(vcapServices));

	serviceKeys = Object.keys(vcapServices);
	serviceKeys.forEach(function(key) {
		setProxyRoute(key, vcapServices[key][0].credentials);
	});
};
// TODO: only call this, if we find a vcapstring in environment?
setProxyRoutes();

// Use this to set up your own proxy route to your custom microservice.
// Path and arguments after the pathPrefix will be passed on to the target endpoint.
//  pathPrefix: the path that clients will call in your express app.
//  endpoint: the URL of your custom microservice.
// example usage:
//  customProxyMiddleware('/my-custom-api', 'https://my-custom-service.run.aws-usw02-pr.ice.predix.io')
var customProxyMiddleware = function(pathPrefix, endpoint) {
	console.log('custom endpoint: ' + endpoint);
	return expressProxy(endpoint, {
		https: true,
		forwardPath: function (req) {
			var path = req.url.replace(pathPrefix, '');
			console.log('proxying to:', path);
			return path;
		},
		intercept: cleanResponseHeaders,
		decorateRequest: buildDecorator()
	});
};

module.exports = {
	router: router,
	setServiceConfig: setServiceConfig,
	setUaaConfig: setUaaConfig,
	customProxyMiddleware: customProxyMiddleware,
	addClientTokenMiddleware: addClientTokenMiddleware,
	expressProxy: expressProxy
};
