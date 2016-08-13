// -------------------------------------
//   Task: Watch: Source
// -------------------------------------
module.exports = function (gulp, plugins) {
    return function () {
        gulp.watch('src/js/**/*.js', ['compile:js'])
        gulp.watch('src/sass/**/*.scss', ['compile:sass']);
        gulp.watch('src/ejs/**/*.ejs', ['compile:ejs']);
    };
};
