// -------------------------------------
//   Task: Compile: EJS
// -------------------------------------
module.exports = function (gulp, plugins) {
    return function () {
        gulp.src("./src/ejs/*.ejs")
            .pipe(plugins.ejs({
                msg: "Hello Gulp!"
        	}))
        	.pipe(gulp.dest("./dist/"));
    };
};
