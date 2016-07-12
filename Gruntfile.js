/**
 * @description Gruntfile that contains tasks to build, test and deploy a project.
 *
 * Configure all your tasks in the /tasks folder.
 *
 * For more help, see: http://gruntjs.com/getting-started
 */
'use strict';
module.exports = function(grunt) {

  var importOnce = require('node-sass-import-once');

  // Project configuration.
  var gruntConfig = {

    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'app.js'
      }
    },

    clean: {
      css: ['temp/css/**/*.css'],
      bower: ['bower_components'],
      reports: ['reports']
    },

    sass: {
      options: {
        importer: importOnce,
        importOnce: {
          index: true,
          bower: true
        }
      },
      style_modules: {
        files: {
          'temp/css/noprefix/seed-footer-styles.css': 'public/elements/seed-footer/seed-footer-styles.scss',
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'temp/css/noprefix/*.css',
        dest: 'temp/css/withprefix'
      }
    },

    // Configuration to be run (and then tested).
    'polymer-css-compiler': {
      //Default options sent to task
      seed_footer: {
        files: {
          'public/elements/seed-footer/seed-footer-styles.html': [
            'temp/css/min/seed-footer-styles.css'
          ]
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'temp/css/withprefix',
          src: '*.css',
          dest: 'temp/css/min',
          ext: '.css'
        }]
      }
    },

    watch: {
      sass: {
        files: ['public/elements/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin', 'polymer-css-compiler'],
        options: {
          interrupt: true,
          livereload: true
        }
      }
    }

  };

  grunt.initConfig(gruntConfig);

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('polymer-css-compiler');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task
  grunt.registerTask('default', 'Basic build', [
    'sass',
    'autoprefixer',
    'cssmin',
    'polymer-css-compiler',
    'serve'
  ]);
  grunt.registerTask('serve', ['nodemon']);

};
