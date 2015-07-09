/**
 * @description I am the Projects Gruntfile that contains tasks to build, test and deploy a project.
 * @namespace my-test-app
 */
module.exports = function(grunt) {
    'use strict';

    function loadConfig(path) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
           key = option.replace(/\.js$/, '');
            object[key] = require(path + option);
        });

        return object;
    }

    // Initial config
    var config = {
        pkg: grunt.file.readJSON('package.json')
    };

    // Load tasks from tasks folder
    grunt.loadTasks('tasks');

    grunt.util._.extend(config, loadConfig('./tasks/options/'));

    grunt.initConfig(config);

    require('load-grunt-tasks')(grunt);

};
