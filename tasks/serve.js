module.exports = function(grunt) {
    grunt.registerTask('serve', ['cssmin', 'clean:build', 'connect:livereload', 'watch']);
}
