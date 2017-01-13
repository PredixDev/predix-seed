'use strict';

// -------------------------------------
//   Task: Compile: Inline Index Source
// -------------------------------------
const inlinesource = require('gulp-inline-source');
const rename = require('gulp-rename');

module.exports = function(gulp) {
  return function() {
    return gulp.src('./public/_index.html')
      .pipe(inlinesource())
      .pipe(rename('index.html'))
      .pipe(gulp.dest('./public'));
  };
};
