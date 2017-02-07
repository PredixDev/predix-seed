'use strict';

// -------------------------------------
//   Task: Compile: Inline Index Source
// -------------------------------------
const inlinesource = require('gulp-inline-source');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');

module.exports = function(gulp) {
  return function() {
    return gulp.src('./public/_index.html')
      .pipe(inlinesource())
      .pipe(livereload())
      .pipe(rename('index.html'))
      .pipe(gulp.dest('./public'));
  };
};
