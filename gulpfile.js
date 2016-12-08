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
gulp.task('compile:index', ['compile:sass'], getTask('compile.index'));

// -----------------------------------------------------------------------------
// Task: Serve : Start
// -----------------------------------------------------------------------------
gulp.task('serve:dev:start', getTask('serve.dev.start'));
gulp.task('serve:dist:start', ['dist'], getTask('serve.dist.start'));

// -----------------------------------------------------------------------------
// Task: Watch : Source, Public, All
// -----------------------------------------------------------------------------
gulp.task('watch:public', getTask('watch.public'));

// -----------------------------------------------------------------------------
// Task: Exposes gulp test:local and gulp test:remote
// -----------------------------------------------------------------------------
// require('web-component-tester')
//   .gulp.init(gulp);

// -----------------------------------------------------------------------------
// Task: Dist (Build app ready for deployment)
// 	clean, compile:sass, compile:index, copy, vulcanize
// -----------------------------------------------------------------------------
gulp.task('dist', ['dist:copy'], getTask('compile.vulcanize'));

// -----------------------------------------------------------------------------
// Task: Dist : Copy source files for deploy to dist/
// -----------------------------------------------------------------------------
gulp.task('dist:copy', ['dist:clean', 'compile:index'], getTask('dist.copy'));

// -----------------------------------------------------------------------------
// Task: Dist : Clean 'dist/'' folder
// -----------------------------------------------------------------------------
gulp.task('dist:clean', getTask('dist.clean'));

// -----------------------------------------------------------------------------
//  Task: Default (compile source, start server, watch for changes)
// -----------------------------------------------------------------------------
gulp.task('default', function (cb) {
	gulpSequence('compile:index', (dev ? 'serve:dev:start' : 'serve:dist:start'), 'watch:public')(cb);
});
