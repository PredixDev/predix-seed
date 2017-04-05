'use strict';
const del = require('del');

// ---------------------------
//   Task: Clean 'dist' folder
// ---------------------------

module.exports = function(done) {
  return function() {
    return del(['./dist']);
  };
};
