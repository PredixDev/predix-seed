// -----------------------------------------------------------------------
//   Task: Compile: Switch out vulcanized seed-app component in index.html
// -----------------------------------------------------------------------

var replace = require('gulp-replace');

module.exports = function(gulp) {
  return function(){
    gulp.src(['public/index.html'])
      .pipe(replace(
        'href="/elements/seed-app/seed-app.html"',
        'href="/elements/seed-app/seed-app-vulcanized.html"'))
      .pipe(gulp.dest('public/'));
  };
};
