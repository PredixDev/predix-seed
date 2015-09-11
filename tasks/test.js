/**
 * grunt test runs Angular unit tests
 */
module.exports = function(grunt) {
    grunt.registerTask('test', ['jshint', 'clean:test', 'karma']);
};
