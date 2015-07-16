var request = require('request');
var qs = require('querystring');

module.exports = {
    init: function (options) {
        this.clientSecret = 'U2GoXJPsG4jYx2G3Bn0k99Fle0+yNSqt7D92po40RvU=';
        this.clientId = 'predix-seed';
        this.serverUrl = 'https://stc.predix-uaa-test.grc-apps.svc.ice.ge.com';
        this.accessToken = null;
        this.defaultClientRoute = '/about';
        this.base64Credential = 'Basic ' + new Buffer(this.clientId + ':' + this.clientSecret).toString('base64');

        if (options) {
            if (options.clientSecret) {
                this.clientSecret = options.clientSecret;
            }
            if (options.clientId) {
                this.clientId = options.clientId;
            }
            if (options.serverUrl) {
                this.serverUrl = options.serverUrl;
            }
            if (options.defaultClientRoute) {
                this.defaultClientRoute = options.defaultClientRoute;
            }
            if (options.base64Credential) {
                this.base64Credential = options.base64Credential
            }
        }
    },
    getAccessToken: function (authCode, successCallback, errorCallback) {
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
                'Authorization': this.base64Credential
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
}
