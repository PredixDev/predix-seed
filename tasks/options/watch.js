module.exports = {
    options: {
        nospawn: true,
        livereload: true
    },
    less: {
        files: ['public/stylesheets/app.less'],
        tasks: ['less','cssmin']
    },
    scripts: {
        files: [
            'public/scripts/**/*.js',
            'test/e2e/**/*.js'
        ],
        tasks: ['jshint', 'karma']
    }
}
