'use strict';
const merge = require('merge-stream');

// ------------------------------------------------
//   Task: Copy all deployment files to Dist folder
// ------------------------------------------------

module.exports = function(gulp) {
  return function() {
    var publicFiles = gulp.src(['public/**/*']).pipe(gulp.dest('./dist/public'));
    var server = gulp.src(['server/**/*']).pipe(gulp.dest('./dist/server'))
    var packageFile = gulp.src(['package.json']).pipe(gulp.dest('dist'));

    return merge(publicFiles, server, packageFile);
  };
};
