'use strict';

// -------------------------------------
//   Task: Compile: Sass
// -------------------------------------
const stylemod = require('gulp-style-modules');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');
const importOnce = require('node-sass-import-once');
const cssmin = require('gulp-cssmin');

var getName = function(file) {
  return path.basename(file.path, path.extname(file.path));
};

var styleModuleDest = function(file) {
  return file.base;
  // console.log(path.basename(file.path));
  // var name = getName(file);
  // return './temp/styles.html';
};

module.exports = function(gulp, plugins) {
  return function() {

    const sassOptions = {
      includePaths: 'bower_components',
      importer: importOnce,
      importOnce: {
        index: true, bower: true
      }
    };

    gulp.src([
        'elements/**/*.scss'
      ])
      .pipe(plugins.sass(sassOptions)
        .on('error', plugins.sass.logError))
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(stylemod({
        // All files will be named 'styles.html'
        filename: function(file) {
          var name = getName(file) + '-styles';
          return name;
        },
        // Use '-css' suffix instead of '-styles' for module ids
        moduleId: function(file) {
          return getName(file) + '-styles';
        }
      }))
      .pipe(gulp.dest(styleModuleDest));

    return gulp.src('./index-inline.scss')
      .pipe(plugins.sass(sassOptions)
        .on('error', plugins.sass.logError))
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(gulp.dest('.'));
  };
};
