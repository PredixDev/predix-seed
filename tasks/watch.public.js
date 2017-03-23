'use strict';

// -------------------------------------
//   Task: Watch: Public
// -------------------------------------

module.exports = function(gulp) {
  return function() {
    return new Promise(function(resolve) {
      gulp.watch('./public/elements/*.scss', gulp.series('compile:sass'));
      gulp.watch([
          './_index.html',
          './_index-inline-loading-script.js',
          './index-inline.scss'
        ], gulp.series('compile:index'));
      resolve();
    });
  };
};
