module.exports = function(grunt) {
    grunt.registerTask('serve', ['cssmin', 'clean:build', 'configureRewriteRules','connect:development', 'watch']);
}
