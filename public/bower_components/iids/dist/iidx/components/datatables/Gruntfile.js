/*global module:false*//*jshint unused:false*/

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: [
            'dist',
            'lib'
        ],

        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            bower: {
                command: 'bower install'
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "lib/datatables",
                        src: ['media/css/**', 'media/images/**', 'media/js/**', '!media/js/jquery.js', 'Readme.txt'],
                        dest: 'dist'
                    }
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    // Default task.
    grunt.registerTask('default', 'Build/copy Datatables distributable', [
        'clean',
        'shell:bower',
        'copy:dist'
    ]);

};
