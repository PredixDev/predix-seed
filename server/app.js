var express = require('express');
var app = express();
var fs = require("fs");
var _ = require("lodash");

// allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type", "application/json");
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// parse
var getAssetPathFromParams = function(params) {
  // parse out values & remove undefined
  var pathValues = _.pull(_.values(params), undefined);
  var i = 0,
    pathString = __dirname + "/predix-asset-sample-data";
  // iterate over values and concat path string
  for (i; i < pathValues.length; i++) {
    pathString += '/';
    pathString += pathValues[i];
  };
  // concat .json file string
  pathString += '/' + _.last(pathValues) + '.json';
  return pathString;
};

// get '/predix-asset/uri'
// examples: '/predix-asset/root', 'api/enterprises/san-ramon-oil'
var assetRoute =
  /^(?:\/api\/predix-asset){1}(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?$/;
app.get(assetRoute, function(req, res) {
  var pathString = getAssetPathFromParams(req.params);
  fs.readFile(pathString, 'utf8', function(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.send(JSON.stringify(obj));
  });
});


// parse
var getViewServicePathFromParams = function(params) {
  // parse out values & remove undefined
  var pathValues = _.pull(_.values(params), undefined);
  var i = 0,
    pathString = __dirname + "/view-service-sample-data";
  // iterate over values and concat path string
  for (i; i < pathValues.length; i++) {
    pathString += '/';
    pathString += pathValues[i];
  };
  // concat .json file string
  pathString += '/' + _.last(pathValues) + '.json';
  return pathString;
};

// view service routes
// example: /api/view-service/decks/1/cards/1
var viewServiceRoute =
  /^(?:\/api\/view-service\/){1}(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?$/;
app.get(viewServiceRoute, function(req, res) {
  var pathString = getViewServicePathFromParams(req.params);
  fs.readFile(pathString, 'utf8', function(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.send(JSON.stringify(obj));
  });
});


app.listen(8181, function() {
  console.log('API mock app listening on port 8181.');
});
