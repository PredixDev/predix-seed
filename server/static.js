var path = require('path');
var express = require('express');

var static = path.join(__dirname, process.env['base-dir'] ? process.env['base-dir'] : '../dist');
module.exports = express.static(static);
