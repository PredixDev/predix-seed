'use strict';
const clean = require('gulp-clean');

// ---------------------------
//   Task: Clean 'dist' folder
// ---------------------------

module.exports = function(gulp) {
  return function() {
    return gulp.src('dist', {read: false})
      .pipe(clean());
  };
};
