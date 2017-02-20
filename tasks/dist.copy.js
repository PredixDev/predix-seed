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
      'public/bower_components/px-demo-data/demo-data/**',
      // list of lazy-load modules, see also "compile.vulcanize.js"
      'public/bower_components/{*d3,canvg,numbro,pxmoment-timezone}/**',
    ], {base: 'public'})
      .pipe(gulp.dest('./dist'));
  };
};
