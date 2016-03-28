var express = require('express');
var app = express();
var fs = require("fs");
var _ = require("lodash");

// allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// parse
var getPathFromParams = function(params) {
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

app.get(/^(?:\/api){1}(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?$/g, function(req, res) {
  var pathString = getPathFromParams(req.params);
  console.log(pathString);
  fs.readFile( pathString, 'utf8', function (err, data) {
   if (err) throw err;
   obj = JSON.parse(data);
   res.send(JSON.stringify (obj));
  });
});


app.listen(8181, function() {
  console.log('API mock app listening on port 8181.');
});
