'use strict';

// ------------------------------------------------
//   Task: Copy all deployment files to Dist folder
// ------------------------------------------------

module.exports = function(gulp) {
  return function() {
    return gulp.src([
      'public/index.html',
      'public/*-styles.html',
      'public/images/*',
      'public/bower_components/px-typography-design/type/*',
      'public/bower_components/font-awesome/fonts/*',
      'public/bower_components/px-demo-data/demo-data/**'
    ], {base: 'public'})
      .pipe(gulp.dest('./dist'));
  };
};
