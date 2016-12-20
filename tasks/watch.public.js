'use strict';

// -------------------------------------
//   Task: Watch: Public
// -------------------------------------

module.exports = function(gulp) {
  return function() {
    gulp.watch('./public/**/*.scss', ['compile:sass']);
    gulp.watch(['./public/_index.html','./public/_index-inline-loading-script.js','./public/index-inline.scss'],
    ['compile:index']);
  };
};
