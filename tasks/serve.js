/**
 * grunt serve starts a live-reloading server for development of your app
 *
 *
 * Note:
 *
 * The connect task simulates the NGINX UAA integration, allowing you to talk to secure CloudFoundry services.
 * You will need to update the UAA configuration for your app in /tasks/options/connect.js.
 *
 * Additionally, you will need to add any services you are proxying in the NGINX layer to /tasks/options/connect.js.
 *
 */
module.exports = function(grunt) {
    grunt.registerTask('serve', ['clean:build',  'copy:serve', 'connect:server', 'watch']);
}
