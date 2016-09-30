'use strict';

// -------------------------------------
//   Task: Serve
// -------------------------------------
var nodemon = require('gulp-nodemon');

module.exports = function(gulp) {
  return function() {
    nodemon({
        script: 'server/app.js'
      })
      .on('restart', function() {
        console.log('app.js restarted');
      });
  };
};
