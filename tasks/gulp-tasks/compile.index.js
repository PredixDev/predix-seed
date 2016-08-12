// -------------------------------------
//   Task: Compile: Inline Index Source
// -------------------------------------
var inlinesource = require('gulp-inline-source');
var foreach = require('gulp-foreach');
var rename = require("gulp-rename");

module.exports = function(gulp, plugins) {
  return function() {
    gulp.src('./public/_index.html')
      .pipe(inlinesource())
      .pipe(rename('index.html'))
      .pipe(gulp.dest('./public'));
  }
};
