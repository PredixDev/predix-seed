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
      'public/bower_components/px-polymer-font-awesome/font-awesome-icons.html',
      'public/bower_components/pxmoment-timezone/builds/moment-timezone-with-data.min.js',
      'public/bower_components/numbro/dist/languages.min.js',
      'public/bower_components/d3/d3.js'
    ], {base: 'public'})
      .pipe(gulp.dest('./dist'));
  };
};
