// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

var defaultConfig = require('test-dependencies').defaultKarmaConf;

module.exports = function(config) {

    defaultConfig(config); //inherit from default config

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'src/js/**/!(require.config).js', included: false}, // make everything in our project available (but don't load it) except require config
            'src/js/require.config.js' // require config needs to be loaded into the browser
        ].concat(config.defaultFiles), // concat together with all the default paths

        // enable / disable watching file and executing tests whenever any file changes, Defaults to false
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - DEFAULT: PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS']
    });
};
