// -------------------------------------
//   Task: Watch: Public
// -------------------------------------
module.exports = function(gulp, plugins) {
  return function() {
    gulp.watch('./public/**/*.scss', ['compile:all']);
    gulp.watch('./public/**/*.html', ['compile:all']);
  };
};
