'use strict';

// -------------------------------------
//   Task: Serve
// -------------------------------------
const nodemon = require('gulp-nodemon');

module.exports = function() {
  return function() {
    nodemon({
        script: 'server/app.js'
        , env: { 'node_env' : 'dist'}
      })
      .on('restart', function() {
        console.log('app.js restarted');
      });
  };
};
