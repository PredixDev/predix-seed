'use strict';

// -------------------------------------------
//   Task: Compile: Vulcanize seed-app element
// -------------------------------------------

const vulcanize = require('gulp-vulcanize');

module.exports = function(gulp) {
  return function () {
    return gulp.src('public/loader.html', {base: 'public/'})
      .pipe(vulcanize({
        stripComments: true,
        // list of files to exclude or to lazy-load
        excludes: [
          'public/bower_components/px-vis/px-vis-imports.html',
          'public/bower_components/pxmoment-timezone/builds/moment-timezone-with-data.min.js',
          'public/bower_components/numbro/dist/languages.min.js',
          'public/bower_components/d3/d3.js'
        ],
        stripExcludes: [
          // exclude "canvg" which is actually a backup
          'public/bower_components/px-vis/px-vis-imports.html'
        ],
        inlineCss: true,
        inlineScripts: true
      }))
      .pipe(gulp.dest('dist/'));
  };
};
