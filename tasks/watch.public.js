// -------------------------------------
//   Task: Watch: Public
// -------------------------------------
module.exports = function(gulp, plugins) {
  return function() {
    gulp.watch('./public/**/*.scss', ['compile:sass']);
    gulp.watch('./public/**/*.html', ['compile:index']);
  };
};
