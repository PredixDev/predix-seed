'use strict';

// -------------------------------------
//   Task: Serve
// -------------------------------------
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');

module.exports = function() {
  return function() {
    nodemon({
        script: 'server/app.js',
        env: { 'base-dir' : '/../public'}
      })
      .on('restart', function() {
        console.log('app.js restarted');
      });
  };
};
