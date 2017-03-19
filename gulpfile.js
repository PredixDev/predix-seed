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
gulp.task('compile:index', gulp.series('compile:sass', getTask('compile.index')));

// -----------------------------------------------------------------------------
// Task: Watch : Source, Public, All
// -----------------------------------------------------------------------------
gulp.task('watch:public', getTask('watch.public'));

// -----------------------------------------------------------------------------
// Task: Dist : Clean 'dist/'' folder
// -----------------------------------------------------------------------------
gulp.task('dist:clean', getTask('dist.clean'));

gulp.task('bundle', getTask('compile.vulcanize'));

gulp.task('optimize', getTask('optimize.htmlmin'));

// -----------------------------------------------------------------------------
// Task: Dist (Build app ready for deployment)
// 	clean, compile:sass, compile:index, copy, vulcanize
// -----------------------------------------------------------------------------
gulp.task('dist', gulp.series('dist:clean', 'compile:index', 'bundle', 'optimize'));

// -----------------------------------------------------------------------------
// Task: Serve : Start
// -----------------------------------------------------------------------------
gulp.task('serve:dev:start', gulp.series('compile:index', getTask('serve.dev.start')));
gulp.task('serve:dist:start', gulp.series('dist', getTask('serve.dist.start')));

// -----------------------------------------------------------------------------
//  Task: Default (compile source, start server, watch for changes)
// -----------------------------------------------------------------------------
gulp.task('default', gulp.series(dev ? 'serve:dev:start' : 'serve:dist:start', 'watch:public'));
