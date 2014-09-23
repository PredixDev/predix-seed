/*global module:false*//*jshint unused:false*/

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
          components: ['components'],
          test: ['test/unit/report*', 'test/ui/report*']
        },

        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            bower: {
                command: 'bower install'
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'js/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        karma: {
            unit: {
                configFile: 'test/unit/karma.conf.js'
            }
        },

        watch: {
            tests: {
                files: ['test/unit/mock/*.js', 'test/unit/spec/*.js'],
                tasks: 'karma',
                options: {
                    interrupt: true
                }
            }
        },

    });

    // Load all grunt tasks that start with 'grunt-*'
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    var reporter = grunt.option('reporter') || 'spec';

    grunt.registerTask('test', 'Run full test suite', [
        'clean:test',
        // 'jshint',
        'karma'
    ]);

    // Default task.
    grunt.registerTask('default', 'Run Unit Tests', [
      'clean:components',
      'shell:bower',
      'test'
    ]);

};
