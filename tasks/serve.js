module.exports = function(grunt) {
    grunt.registerTask('serve', ['cssmin', 'clean:build', 'connect:development', 'watch']);
}
