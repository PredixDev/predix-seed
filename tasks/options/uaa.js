/**
 * UAA integration helper object.
 *
 * You shouldn't need to touch this file - work in /tasks/options/connect.js instead.
 */
var qs = require('querystring');

module.exports = {
    init: function (options) {
        options = options || {};
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
                'Authorization': 'Basic '+this.base64ClientCredential
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
    hasValidSession: function(){
        return !!this.accessToken;
    },
    deleteSession: function(){
        this.accessToken=null;
    }
};
