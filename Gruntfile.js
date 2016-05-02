/**
 * @description Gruntfile that contains tasks to build, test and deploy a project.
 *
 * Configure all your tasks in the /tasks folder.
 *
 * For more help, see: http://gruntjs.com/getting-started
 */
module.exports = function(grunt) {

  'use strict';

  // Initial config
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'app.js'
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('serve', ['nodemon']);
};
