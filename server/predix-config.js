/*
This module reads config settings from localConfig.json when running locally,
  or from the VCAPS environment variables when running in Cloud Foundry.
*/

var settings = {};

// checking NODE_ENV to load cloud properties from VCAPS
// or development properties from config.json.
// These properties are not needed for fetching mock data.
// Only needed if you want to connect to real Predix services.
var node_env = process.env.node_env || 'development';
if(node_env === 'development') {
  // use localConfig file
	var devConfig = require('./localConfig.json')[node_env];
	// console.log(devConfig);
	settings.base64ClientCredential = devConfig.base64ClientCredential;
	settings.clientId = devConfig.clientId;
	settings.uaaURL = devConfig.uaaURL;
	settings.tokenURL = devConfig.uaaURL;
	settings.appURL = devConfig.appURL;
	settings.callbackURL = devConfig.appURL + '/callback';

	settings.assetURL = devConfig.assetURL;
	settings.assetZoneId = devConfig.assetZoneId;
	settings.timeseriesZoneId = devConfig.timeseriesZoneId;
	settings.timeseriesURL = devConfig.timeseriesURL;

} else {
	// read VCAP_SERVICES
	var vcapsServices = JSON.parse(process.env.VCAP_SERVICES);
	var uaaService = vcapsServices[process.env.uaa_service_label];
	var assetService = vcapsServices['predix-asset'];
	var timeseriesService = vcapsServices['predix-timeseries'];

	if(uaaService) {
    settings.uaaURL = uaaService[0].credentials.uri;
		settings.tokenURL = uaaService[0].credentials.uri;
	}
	if(assetService) {
		settings.assetURL = assetService[0].credentials.uri + '/' + process.env.assetMachine;
		settings.assetZoneId = assetService[0].credentials.zone['http-header-value'];
	}
	if(timeseriesService) {
		settings.timeseriesZoneId = timeseriesService[0].credentials.query['zone-http-header-value'];
		settings.timeseriesURL = timeseriesService[0].credentials.query.uri;
	}

	// read VCAP_APPLICATION
	var vcapsApplication = JSON.parse(process.env.VCAP_APPLICATION);
	settings.appURL = 'https://' + vcapsApplication.uris[0];
	settings.callbackURL = settings.appURL + '/callback';
	settings.base64ClientCredential = process.env.base64ClientCredential;
	settings.clientId = process.env.clientId;
}
// console.log('config settings: ' + JSON.stringify(settings));

// This vcap object is used by the proxy module.
settings.buildVcapObjectFromLocalConfig = function(config) {
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
					'zone-http-header-value': config.timeseriesZoneId
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
};

module.exports = settings;
