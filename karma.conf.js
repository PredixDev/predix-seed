// Karma configuration
module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: [
            'jasmine',
            'requirejs'
        ],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'public/scripts/config.js', included: true},
            {pattern: 'test/test-config.js', included: true},

            //App Bower components
            {pattern: 'public/bower_components/**/*.js', included: false},

            //App src files
            {pattern: 'public/scripts/**/*.js', included: false},
            {pattern: 'public/images/**/*.*', included: false},
            {pattern: 'public/views/**/*.*', included: false}
        ],

        // list of files / patterns to exclude
        exclude: [
            'test/e2e/*.js',
            'public/bower_components/**/*-spec.*'
        ],
        plugins: [
            // these plugins will be require() by Karma
            'karma-coverage',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-requirejs',
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-script-launcher',
            'karma-phantomjs-launcher'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit', 'coverage'],


        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
        // config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        client: {
            captureConsole: true,
            useIframe: false
        },

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],
        captureTimeout: 60000,


        /**
         * The preprocessors available will be for CoffeeScript specs/src
         * Code Coverage
         * HTML2JS Note any .html files listed in the files section must be referenced at run time as window.__html__['template.html'].
         * and NG-html2js
         *
         **/
        preprocessors: {
            'public/views/**/*.html': ['html2js'],
            'public/scripts/**/*.js': ['coverage']
        },

        /**
         * Code Coverage options
         */
        coverageReporter: {
            type: 'html',
            dir: 'test-target/coverage'
        },

        /**
         * JUnit Reporter options
         */
        junitReporter: {
            outputFile: 'test-target/junit.xml',
            suite: 'unit'
        },

        /**
         * CoffeeScript options
         */
        coffeePreprocessor: {
            options: {
                bare: true
            }
        },

        /**
         * ng-html2js options
         */
        ngHtml2JsPreprocessor: {

            // strip this from the file path
            stripPrefix: 'public/',

            // prepend this to the
            prependPrefix: '',

            // or define a custom transform function
            cacheIdFromPath: function(filepath) {
                console.log(filepath);
            },

            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'app.templates'
        },


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
