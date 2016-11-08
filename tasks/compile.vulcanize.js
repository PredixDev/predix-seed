'use strict';

// -------------------------------------------
//   Task: Compile: Vulcanize seed-app element
// -------------------------------------------

const vulcanize = require('gulp-vulcanize');

module.exports = function(gulp) {
  return function () {
    return gulp.src(['public/elements/seed-app/seed-app.html', 'public/elements/views/dashboards-view.html'], { base: 'public/elements/' })
      .pipe(vulcanize({
        abspath: '',
        excludes: [
          'public/bower_components/polymer/polymer.html',
          'public/bower_components/px-tooltip/px-tooltip.html',
          'public/bower_components/px-view/px-view.html',
          'public/bower_components/iron-meta/iron-meta.html',
          'public/bower_components/iron-iconset-svg/iron-iconset-svg.html',
          'public/bower_components/iron-icon/iron-icon.html'
        ],
        stripComments: true,
        inlineCSS: true,
        inlineScripts: true
      }))
      .pipe(gulp.dest('dist/public/elements/'));
  };
};
