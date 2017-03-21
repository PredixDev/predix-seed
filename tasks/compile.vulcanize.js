const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const mergeStream = require('merge-stream');
const polymerBuild = require('polymer-build');
const swPrecacheConfig = require('../sw-precache-config.js');
const polymerJson = require('../polymer.json');
const polymerProject = new polymerBuild.PolymerProject(polymerJson);
const buildDirectory = 'dist';

/**
 * Waits for the given ReadableStream
 */
function waitFor(stream) {
  return new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
}

module.exports = function(gulp) {
  return function build() {
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      // Okay, so first thing we do is clear the build directory
      console.log(`Deleting ${buildDirectory} directory...`);
      del([buildDirectory])
      .then(() => {

        let sourcesStream = polymerProject.sources()

        let dependenciesStream = polymerProject.dependencies()

        // Okay, now let's merge them into a single build stream
        let buildStream = mergeStream(sourcesStream, dependenciesStream)
        .once('data', () => {
          console.log('Analyzing build dependencies...');
        });

        // If you want bundling, pass the stream to polymerProject.bundler.
        // This will bundle dependencies into your fragments so you can lazy
        // load them.
        buildStream = buildStream.pipe(polymerProject.bundler);
        // Okay, time to pipe to the build directory
        buildStream = buildStream.pipe(gulp.dest(buildDirectory));
        // waitFor the buildStream to complete
        return waitFor(buildStream);
      })
      .then(() => {
        // Okay, now let's generate the Service Worker
        console.log('Generating the Service Worker...');
        return polymerBuild.addServiceWorker({
          project: polymerProject,
          buildRoot: buildDirectory,
          bundled: true,
          swPrecacheConfig: swPrecacheConfig
        });
      })
      .then(() => {
        // You did it!
        console.log('Build complete!');
        resolve();
      });
    });
  };
};