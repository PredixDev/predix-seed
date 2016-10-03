'use strict';

// ------------------------------------------------
//   Task: Copy all deployment files to Dist folder
// ------------------------------------------------

module.exports = function(gulp) {
  return function() {
    return gulp.src(['public/**/*'], {base: 'public'})
      .pipe(gulp.dest('./dist'));
  };
};
