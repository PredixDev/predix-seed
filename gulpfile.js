'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// -----------------------------------------------------------------------------
// getTask() loads external gulp task script functions by filename
// -----------------------------------------------------------------------------
function getTask(task) {
  return require('./tasks/' + task)(gulp, plugins);
};

// -----------------------------------------------------------------------------
// Task: Compile : Scripts, Sass, EJS, All
// -----------------------------------------------------------------------------
gulp.task('compile:sass', getTask('compile.sass'));
gulp.task('compile:index', getTask('compile.index'));
gulp.task('compile:all', ['compile:sass', 'compile:index']);

// -----------------------------------------------------------------------------
// Task: Serve : Start
// -----------------------------------------------------------------------------
gulp.task('serve:start', getTask('serve.start'));

// -----------------------------------------------------------------------------
// Task: Watch : Source, Public, All
// -----------------------------------------------------------------------------
gulp.task('watch:public', getTask('watch.public'));

// -----------------------------------------------------------------------------
// Task: Exposes gulp test:local and gulp test:remote
// -----------------------------------------------------------------------------
require('web-component-tester')
  .gulp.init(gulp);

// -----------------------------------------------------------------------------
// Task: Compile : Vulcanize, insert vulanized file into index.html for deploy
// -----------------------------------------------------------------------------
gulp.task('vulcanize:components', getTask('compile.vulcanize'));
gulp.task('vulcanize:deploy', getTask('compile.switch.vulcanize.file'));
gulp.task('vulcanize', ['vulcanize:components', 'vulcanize:deploy']);

// -----------------------------------------------------------------------------
//  Task: Default (compile source, start server, watch for changes)
// -----------------------------------------------------------------------------
gulp.task('default', ['compile:all', 'vulcanize', 'serve:start', 'watch:public']);
