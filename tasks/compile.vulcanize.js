// -------------------------------------------
//   Task: Compile: Vulcanize seed-app element
// -------------------------------------------

var vulcanize = require('gulp-vulcanize');
var rename = require('gulp-rename');

module.exports = function(gulp) {
  return function(){
    gulp.task('vulcanize', function() {
      return gulp.src('public/elements/seed-app/seed-app.html')
      .pipe(vulcanize({
        abspath: '',
        excludes: [
          'public/bower_components/px-theme/px-theme-styles.html',
          'public/bower_components/polymer/polymer.html',
          'public/bower_components/px-tooltip/px-tooltip.html',
          'public/bower_components/px-view/px-view.html'
        ],
        stripComments: true,
        inlineCSS: true,
        inlineScripts: true
      }))
      .pipe(rename('seed-app-vulcanized.html'))
      .pipe(gulp.dest('public/elements/seed-app/'));
    });
  };
};
