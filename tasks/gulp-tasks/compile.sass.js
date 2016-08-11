// -------------------------------------
//   Task: Compile: Sass
// -------------------------------------
var stylemod = require('gulp-style-modules');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');

var getName = function(file) {
  console.log(
    path.basename(
      file.path,
      path.extname(file.path)
    )
  );
  return path.basename(file.path, path.extname(file.path));
}

var testDest = function(file) {
  console.log(path.basename(file.path));
  var name = getName(file);
  return './public/elements/styles.html';
}

module.exports = function(gulp, plugins) {
  return function() {
    gulp.src('./src/sass/**/*.scss')
      .pipe(plugins.sass({
          includePaths: './public/bower_components'
        })
        .on('error', plugins.sass.logError))
      .pipe(autoprefixer())
      .pipe(stylemod({
        // All files will be named 'styles.html'
        filename: function(file) {
          return getName(file) + "-styles";
        },
        // Use '-css' suffix instead of '-styles' for module ids
        moduleId: function(file) {
          return getName(file) + "-styles";
        }
      }))
      .pipe(gulp.dest(testDest));
  };
};
