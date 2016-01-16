'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.browserSync = require('browser-sync');

// -----------------------------------------------------------------------------
// getTask() loads external gulp task script functions by filename
function getTask(task) {
    return require('./tasks/gulp-tasks/' + task)(gulp, plugins);
};

// -----------------------------------------------------------------------------
// Task: Compile : Scripts, Sass, EJS, All
// -----------------------------------------------------------------------------
gulp.task('compile:js', getTask('compile.js'));
gulp.task('compile:sass', getTask('compile.sass'));
gulp.task('compile:ejs', getTask('compile.ejs'));
gulp.task('compile:all', ['compile:js', 'compile:sass', 'compile:ejs']);

// -----------------------------------------------------------------------------
// Task: Serve : Start
// -----------------------------------------------------------------------------
gulp.task('serve:start', getTask('serve.start'));

// -----------------------------------------------------------------------------
// Task: Watch : Source, Public, All
// -----------------------------------------------------------------------------
gulp.task('watch:source', getTask('watch.source'));
gulp.task('watch:public', getTask('watch.public'));
gulp.task('watch:all', ['watch:source', 'watch:public']);

// -----------------------------------------------------------------------------
//  Task: Default (compile source, start server, watch for changes)
// -----------------------------------------------------------------------------
gulp.task('default', ['compile:all', 'serve:start', 'watch:all']);
