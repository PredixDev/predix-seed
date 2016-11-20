'use strict';

// ------------------------------------------------
//   Task: Copy all deployment files to Dist folder
// ------------------------------------------------

module.exports = function(gulp) {
  return function() {
    return gulp.src([
      'public/index.html',
      'public/*.css',
      'public/images/*',
      'public/bower_components/px-typography-design/type/*',
      'public/bower_components/font-awesome/fonts/*'
    ], {base: 'public'})
      .pipe(gulp.dest('./dist'));
  };
};
