'use strict';
// -------------------------------------------
//   Task: Compile: Vulcanize seed-app element
// -------------------------------------------
const htmlmin = require('gulp-htmlmin');
module.exports = function(gulp) {
  return function() {
    return gulp.src([
      'dist/loader.html',
      'dist/bower_components/px-polymer-font-awesome/font-awesome-icons.html'
    ], {base: 'dist/'})
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      ignoreCustomComments: [/@license/],
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest('dist/'));
  };
};
