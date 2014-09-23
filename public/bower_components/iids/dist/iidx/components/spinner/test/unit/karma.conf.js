var defaultConfig = require('test-dependencies').defaultKarmaConf;
module.exports = function(config) {

    defaultConfig(config); //inherit from default config

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'test/fixtures/*.html', included: false, served: true },
            {pattern: 'js/**/!(require.config).js', included: false, served: true }, // make everything in our project available (but don't load it) except require config
            {pattern: 'css/**', included: false, served: true},
            {pattern: 'components/**/*.*', included: false, served: true},
            {pattern: 'node_modules/test-dependencies/src/js/unit/karma/fixtures.js', included: false, served: true},
            'js/require.config.js' // require config needs to be loaded into the browser
        ].concat(config.defaultFiles), // concat together with all the default paths

        preprocessors : { 'test/fixtures/*.html' : [] } ,

        // enable / disable watching file and executing tests whenever any file changes, Defaults to false
        autoWatch: false,

        // single run: set to false to leave the browser/connection open and debug a page
        singleRun: true,

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
