// -------------------------------------
//   Task: Compile: Sass
// -------------------------------------
var stylemod = require('gulp-style-modules');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');

var getName = function(file) {
  return path.basename(file.path, path.extname(file.path));
}

var styleModuleDest = function(file) {
  return file.base;
  // console.log(path.basename(file.path));
  // var name = getName(file);
  // return './temp/styles.html';
}

module.exports = function(gulp, plugins) {
  return function() {

    gulp.src([
        './public/*.scss',
        '!./public/index-inline.scss',
        './public/elements/*.scss',
        './public/elements/**/*.scss'
      ])
      .pipe(plugins.sass({
          includePaths: './public/bower_components'
        })
        .on('error', plugins.sass.logError))
      .pipe(autoprefixer())
      .pipe(stylemod({
        // All files will be named 'styles.html'
        filename: function(file) {
          var name = getName(file) + "-styles";
          return name;
        },
        // Use '-css' suffix instead of '-styles' for module ids
        moduleId: function(file) {
          return getName(file) + "-styles";
        }
      }))
      .pipe(gulp.dest(styleModuleDest));

    gulp.src('./public/index-inline.scss')
      .pipe(plugins.sass({
          includePaths: './public/bower_components'
        })
        .on('error', plugins.sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./public'));

  };
};
