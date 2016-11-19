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
        env: { 'base-dir' : '/../public'},
        stdout: false
      })
      .on('readable', function() {
        this.stdout.on('data', function(chunk) {
          if (/started/.test(chunk)) livereload.reload();
          process.stdout.write(chunk);
        });
      })
      .on('restart', function() {
        console.log('app.js restarted');
      });
  };
};
