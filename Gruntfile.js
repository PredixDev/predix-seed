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
        script: 'server/app.js'
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
      compileBaseStyles: {
        files: {
          'temp/css/noprefix/index.css': 'src/sass/index.scss',
          'temp/css/noprefix/seed-app.css': 'src/sass/seed-app.scss',
          'temp/css/noprefix/seed-footer.css': 'src/sass/seed-footer.scss'
        }
      },
      compileCardStyles: {
        files: {
          'temp/css/noprefix/data-table-card.css': 'src/sass/data-table-card.scss',
          'temp/css/noprefix/seed-intro-card.css': 'src/sass/seed-intro-card.scss',
          'temp/css/noprefix/simple-charts-card.css': 'src/sass/simple-charts-card.scss',
          'temp/css/noprefix/three-widgets-card.css': 'src/sass/three-widgets-card.scss',
          'temp/css/noprefix/time-series-card.css': 'src/sass/time-series-card.scss'
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
          ],
          'public/elements/cards/data-table-card/data-table-card.html': [
            'temp/css/withprefix/data-table-card.css'
          ],
          'public/elements/cards/seed-intro-card/seed-intro-card.html': [
            'temp/css/withprefix/seed-intro-card.css'
          ],
          'public/elements/cards/simple-charts-card/simple-charts-card.html': [
            'temp/css/withprefix/simple-charts-card.css'
          ],
          'public/elements/cards/three-widgets-card/three-widgets-card.html': [
            'temp/css/withprefix/three-widgets-card.css'
          ],
          'public/elements/cards/time-series-card/time-series-card.html': [
            'temp/css/withprefix/time-series-card.css'
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
        files: ['src/**/*'],
        tasks: ['styles', 'htmlbuild'],
        options: {
          interrupt: true,
          livereload: true
        }
      }
    },

    // Devmode to run serve and watch concurrently
    concurrent: {
      devmode: ['serve', 'watch']
    },

    htmlbuild: {
      index: {
        src: 'src/index.html',
        dest: 'public/',
        options: {
          beautify: false,
          relative: true,
          scripts: {
            index: 'src/js/loading-script.js'
          },
          styles: {
            index: 'temp/css/withprefix/index.css'
          }
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
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', 'WCT Tests', ['wct-test:local']);

  grunt.registerTask('styles', ['sass', 'autoprefixer', 'polymer-css-compiler']);

  grunt.registerTask('serve', ['nodemon']);

  // Default task
  grunt.registerTask('default', 'Default', ['styles', 'htmlbuild', 'serve']);

  // Devmode to run serve and watch concurrently
  grunt.registerTask('devmode', 'Development Mode - serve and watch run concurrently', [
    'styles',
    'htmlbuild',
    'concurrent:devmode'
  ]);


};
