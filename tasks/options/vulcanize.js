/**
 * Configure the vulcanize task
 *
 * For more options see https://www.npmjs.com/package/grunt-vulcanize and https://github.com/Polymer/vulcanize
 */
module.exports = {
    dist: {
        options: {
            inlineScripts: true,
            inlineCss: true,
            stripComments: true
        },
        files: {
            'public/polymer-loader.vulcanized.html': 'public/polymer-loader.html'
        }
    }
};
