'use strict';

// -------------------------------------
//   Task: Serve
// -------------------------------------
const nodemon = require('gulp-nodemon');

module.exports = function() {
  return function() {
    nodemon({
        script: 'server/app.js'
        , env: { 'NODE_ENV' : 'development'}
      })
      .on('restart', function() {
        console.log('app.js restarted');
      });
  };
};
