module.exports = function(grunt) {
    grunt.registerTask('dist', ['clean:build', 'cssmin', 'jshint:src', 'test', 'copy:dist', 'requirejs']);
};
