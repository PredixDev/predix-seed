/*
 * Implementation of the asset service backend for the polymer-based seed
 * using the Connect (https://github.com/senchalabs/connect) HTTP middleware
 * framework
*/

var connect = require('connect');
var http = require('http');

var app = connect();

var fs = require("fs");
var _ = require("lodash");

// allow CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Content-Type", "application/json");
  next();
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

app.use(function(req, res) {
  var pathString = '';
  if ('string' === typeof req.url) {
    if (req.url.match(/^(?:\/api){1}(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?(?:\/)?([\w\d-]+)?$/)) {
      // remove "/api" from the processing of path sections
      var urlString = req.url.substring(4);
      // fetch the url path sections ('/'-separated)
      // and store in req.params
      req.params = urlString.split('/');
      // split() above adds unwanted empty first element that
      // needs to be shifted out below
      req.params.shift();
      pathString = getPathFromParams(req.params);
      console.log('pathString; ' + pathString);
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
      res.end('Invalid path string');
    }
  }
  else {
    res.end('Invalid request URL type');
  }
});

var options = {
  key: fs.readFileSync('./keyfile.key'),
  cert: fs.readFileSync('./certfile.crt')
};

http2.createServer(options, app).listen(8181);

/*
var server = app.listen(8181, function() {
  console.log('API mock app listening on port 8181.');
});
*/
