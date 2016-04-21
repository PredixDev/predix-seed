var connect = require('connect');
var http = require('http');
var fs = require("fs");
var _ = require("lodash");

var app = connect();

// allow CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Content-Type", "application/json");
  next();
});

// parse
var getPathFromParams = function(params, pathPrefix) {
  // parse out values & remove undefined
  var pathValues = _.pull(_.values(params), undefined);
  var i = 0,
    pathString = __dirname + pathPrefix;
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
  /^(?:\/api\/predix-asset){1}(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?$/,
  viewServiceRoute =
  /^(?:\/api\/view-service\/){1}(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?$/;

app.use(function(req, res) {
  var pathString = '', pathPrefix = '';
  if ('string' === typeof req.url) {
    if (req.url.match(assetRoute)) {
      pathPrefix = "/predix-asset-sample-data";
    }
    else {
      if (req.url.match(viewServiceRoute)) {
        pathPrefix = "/view-service-sample-data";
      }
      else {
        res.end('Invalid path');
      }
    }

    // remove "/api" from the processing of path sections
    var urlString = req.url.substring(17);
    // fetch the url path sections ('/'-separated)
    // and store in req.params
    req.params = urlString.split('/');
    // split() above adds unwanted empty first element that
    // needs to be shifted out below
    req.params.shift();
    pathString = getPathFromParams(req.params, pathPrefix);

    // Fetch the file corresponding to the derived path
    fs.readFile( pathString, 'utf8', function (err, data) {
      if (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
        else {
          res.end('Asset file not found');
        }
      }
      else {
        obj = JSON.parse(data);
        res.end(JSON.stringify (obj));
      }
    });
  }
  else {
    res.end('Invalid request URL type');
  }
});

http.createServer(app).listen(process.env.VCAP_APP_PORT || 8181);
