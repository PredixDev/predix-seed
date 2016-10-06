'use strict';

// -------------------------------------
//   Task: Watch: Public
// -------------------------------------

module.exports = function(gulp) {
  return function() {
    gulp.watch('./public/**/*.scss', ['compile:sass']);
    gulp.watch(['./public/**/*.html', '!./public/index.html'], ['compile:index']);
  };
};
