//custom middleware to get the user information from UAA
//function below hits the UAA endpoint with the access token and fetches user information
var request = require('request');

var getUserInfo = function (accessToken, uaaURL, callback) {

	var options = {
		method: 'GET',
		url: uaaURL + '/userinfo',
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	};

	request(options, function (err, response, body) {
		if (!err) {
			var userDetails = JSON.parse(body);
			callback(userDetails);
		} else {
			console.error(response.statusCode);
			console.error('ERROR fetching client token: ' + err);
		}
	});
};

module.exports = function(uaaURL){
  return function(req, res, next){
    if (!req.user.details){
      getUserInfo(req.session.passport.user.ticket.access_token, uaaURL, function(userDetails){
        // console.log(userDetails);
        req.user.details = userDetails;
        next();
      });
    }
    else{
      next();
    }
  }
};
