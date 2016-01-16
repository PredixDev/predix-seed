// -------------------------------------
//   Task: Compile: Sass
// -------------------------------------
module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('./src/sass/**/*.scss')
            .pipe(plugins.sass({
                includePaths:'./public/bower_components'
            }).on('error', plugins.sass.logError))
            .pipe(gulp.dest('./public/css'));
    };
};
