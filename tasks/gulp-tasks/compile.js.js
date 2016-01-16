// -------------------------------------
//   Task: Compile: Scripts
// -------------------------------------
module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('src/js/**/*.js')
            .pipe(plugins.concat('predix-seed-scripts.js'))
            .pipe(gulp.dest('./public/scripts/js'));
    };
};
