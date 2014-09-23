/*global module:false*//*jshint unused:false*/

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      bower: ['components']
    },

    watch: {
      component: {
        files: ['js/**/*', 'test/**/*'],
        tasks: 'default',
        options: {
          interrupt: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
