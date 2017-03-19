'use strict';

// -------------------------------------
//   Task: Serve
// -------------------------------------
const nodemon = require('gulp-nodemon');

module.exports = function() {
  return function() {
    return new Promise(function(resolve, reject) {
      nodemon({
        script: 'server/app.js'
        , env: {'base-dir': '/../dist'}
      })
      .on('restart', function() {
        console.log('app.js restarted');
        resolve();
      });
    });
  };
};
