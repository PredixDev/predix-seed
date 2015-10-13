var allTestFiles = [];
var TEST_REGEXP = /(-spec).js/;
Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        allTestFiles.push(file);
    }
});
require.config({
    // Karma serves files from '/base'
    baseUrl: '/base/public/scripts',
    paths: {},
    // ask Require.js to load these files (all our tests)
    deps: allTestFiles,
    // start test run, once Require.js is done
    callback: window.__karma__.start
});


