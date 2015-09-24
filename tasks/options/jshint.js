/**
 * Configure which files to run jshint on.
 *
 * Feel free to adjust the jshint rules in .jshintrc.  http://jshint.com/docs/options/
 */
module.exports = {
    options: {
        jshintrc: '.jshintrc'
    },
    src: [
        'public/scripts/**/*.js'
    ],
    test: [
        'public/scripts/**/spec/*.js',
        'test/e2e/**/*.js'
    ]
};
