// -------------------------------------
//   Task: Watch: Public
// -------------------------------------
module.exports = function (gulp, plugins) {
    return function () {
        var reload = plugins.browserSync.reload;
        gulp.watch('./public/css/**/*.css', reload);
        gulp.watch('./public/**/*.html', reload);
    };
};
