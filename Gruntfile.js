/**
 * @description Gruntfile that contains tasks to build, test and deploy a project.
 *
 * Configure all your tasks in the /tasks folder.
 *
 * For more help, see: http://gruntjs.com/getting-started
 */
'use strict';
module.exports = function(grunt) {

  var path = require('path');

  var importOnce = require('node-sass-import-once');

  // Project configuration
  var gruntConfig = {

    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'app.js'
      }
    },

    /* cleanup temporary files */
    clean: {
      css: ['temp/css/**/*.css'],
      bower: ['bower_components'],
      reports: ['reports'],
      temp: ['temp']
    },

    sass: {
      options: {
        importer: importOnce,
        importOnce: {
          index: true,
          bower: true
        }
      },
      /* Sass files destined to be Polymer style modules */
      seed_app: {
        files: {
          'temp/css/noprefix/seed-app.css': 'sass/seed-app.scss',
        }
      },
      seed_footer: {
        files: {
          'temp/css/noprefix/seed-footer.css': 'sass/seed-footer.scss',
        }
      }
    },

    /* Modify CSS to include necessary vendor prefixes */
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
    //Custom options - will append filename to output file, and use the returned moduleId value

    /* Generate Polymer style modules using prefixed CSS */
    'polymer-css-compiler': {
      seed_app: {
        files: {
          'public/elements/seed-app/seed-app.html': [
            'temp/css/withprefix/seed-app.css'
          ],
          'public/elements/seed-footer/seed-footer.html': [
            'temp/css/withprefix/seed-footer.css'
          ]
        },
        options: {
          moduleId: function(file) {
            return path.basename(file.dest, '.html') + '-styles';
          }
        }
      },
    },

    'wct-test': {
      local: {
        options: {
          remote: false
        },
      },
      chrome: {
        options: {
          browsers: ['chrome']
        },
      },
    },

    watch: {
      sass: {
        files: ['sass/*.scss'],
        tasks: ['styles'],
        options: {
          interrupt: true,
          livereload: true
        }
      }
    }

  };

  grunt.initConfig(gruntConfig);

  grunt.loadNpmTasks('polymer-css-compiler');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('web-component-tester');

  grunt.registerTask('test', 'WCT Tests', ['wct-test:local']);

  grunt.registerTask('styles', ['sass', 'autoprefixer', 'polymer-css-compiler']);

  grunt.registerTask('serve', ['nodemon']);

  // Default task
  grunt.registerTask('default', 'Default', ['styles', 'serve']);


};
