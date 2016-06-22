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
      css: ['css'],
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
      threeWidgetsCardStyles: {
        files: {
          'src/css/noprefix/three-widgets-card-styles.css': 'src/sass/three-widgets-card-styles.scss',
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
        src: 'src/css/noprefix/*.css',
        dest: 'src/css/withprefix'
      }
    },
    insert: {
      options: {
        // Task-specific options go here.
      },
      insertStyles: {
        src: "src/css/withprefix/three-widgets-card-styles.css",
        dest: "public/elements/cards/three-widgets-card/three-widgets-card-styles.html",
        match: "/* insert styles here */"
      },
    },
    watch: {
      sass: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'insert'],
        options: {
          interrupt: true,
          livereload: true
        }
      }
    }

  };

  grunt.initConfig(gruntConfig);

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-insert');

  // Default task.
  grunt.registerTask('default', 'Basic build', [
    'sass',
    'autoprefixer',
    'insert',
    'serve'
  ]);
  grunt.registerTask('serve', ['nodemon']);



};
