// -------------------------------------
//   Task: Watch: Public
// -------------------------------------
module.exports = function(gulp, plugins) {
  return function() {
    //  reload
    reload = function() {};
    gulp.watch('./public/**/*.scss', reload);
    gulp.watch('./public/**/*.html', reload);
  };
};
