'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const gulpSequence = require('gulp-sequence');


var dev = process.argv.indexOf('--dist') < 0;

// -----------------------------------------------------------------------------
// getTask() loads external gulp task script functions by filename
// -----------------------------------------------------------------------------
function getTask(task) {
  return require('./tasks/' + task)(gulp, plugins);
}

// -----------------------------------------------------------------------------
// Task: Compile : Scripts, Sass, EJS, All
// -----------------------------------------------------------------------------
gulp.task('compile:sass', getTask('compile.sass'));
gulp.task('compile:index', getTask('compile.index'));
gulp.task('compile:all', ['compile:sass', 'compile:index']);

// -----------------------------------------------------------------------------
// Task: Serve : Start
// -----------------------------------------------------------------------------
gulp.task('serve:dev:start', getTask('serve.dev.start'));
gulp.task('serve:dist:start', getTask('serve.dist.start'));

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
// Task: Compile : Vulcanize, vulanize app & views prior to deployment
// -----------------------------------------------------------------------------
gulp.task('vulcanize', getTask('compile.vulcanize'));

// -----------------------------------------------------------------------------
// Task: Dist : Copy source files for deploy to dist/
// -----------------------------------------------------------------------------
gulp.task('dist:copy', getTask('dist.copy'));

// -----------------------------------------------------------------------------
// Task: Dist : Clean 'dist/'' folder
// -----------------------------------------------------------------------------
gulp.task('dist:clean', getTask('dist.clean'));

// -----------------------------------------------------------------------------
//  Task: Default (compile source, start server, watch for changes)
// -----------------------------------------------------------------------------
gulp.task('default', ['compile:all', (dev ? 'serve:dev:start' : 'serve:dist:start'), 'watch:public']);

// -----------------------------------------------------------------------------
//  Task: Dist (Build app ready for deployment)
// -----------------------------------------------------------------------------

gulp.task('dist', function (cb) {
  gulpSequence('dist:clean', 'dist:copy', 'vulcanize')(cb);
});
