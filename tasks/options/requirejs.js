/**
 * Configure r.js minification of Angular code
 */
module.exports = {
    compile: {
        options: {
            out: 'dist/www/scripts/bootstrapper.js',
            normalizeDirDefines: 'all',
            optimize: 'uglify',
            wrap: true,
            skipDirOptimize: false,
            generateSourceMaps: false,
            include: ['bootstrapper'],
            name: 'app',
            removeCombined: true,
            baseUrl: 'public/scripts/',
            config: {
                text: {
                    env: 'node'
                }
            },
            findNestedDependencies: true,
            mainConfigFile: 'public/scripts/config.js',
            done: function(done, output) {
                var duplicates = require('rjs-build-analysis').duplicates(output);

                if (duplicates.length > 0) {
                    grunt.log.subhead('Duplicates found in requirejs build:');
                    grunt.log.warn(duplicates);
                    done(new Error('r.js built duplicate modules, please check the excludes option.'));
                }

                done();
            }
        }
    }
};
