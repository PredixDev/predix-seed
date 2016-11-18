'use strict';

// -------------------------------------
//   Task: Watch: Public
// -------------------------------------

const livereload = require('gulp-livereload');

module.exports = function(gulp) {
  return function() {
    livereload({ start: true });
    livereload.listen({ port: 12315 });
    gulp.watch('./public/**/*.scss', ['compile:sass']);
    gulp.watch(['./public/**/*.html', '!./public/index.html'], ['compile:index']);
  };
};
