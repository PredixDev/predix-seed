/**
 * @description I am the Projects Gruntfile that contains tasks to build, test and deploy a project.
 * @namespace my-test-app
 */
module.exports = function(grunt) {
    'use strict';

    // Local server ports
    var LIVERELOAD_PORT = 35723;
    var SERVER_PORT = 9000;
    var RUNNER_PORT = 9002;

    // Project config
    var buildNumber = '';
    var CONFIG = {
        name: 'my-predix-app',
        app: 'public',
        test: 'test',
        server: 'server',
        src: 'public/scripts',
        dist: 'dist/www',
        bower: 'public/bower_components',
        tmp: '.tmp',
        // Environment-specific settings
        dev: {
            options: {
                variables: {
                    'repo': 'DSP-SNAPSHOT'
                }
            }
        },
        prod: {
            options: {
                variables: {
                    'repo': 'DSP'
                }
            }
        }
    };

    // For adding build number to zip
    if (grunt.option('buildNumber')) {
        buildNumber = grunt.option('buildNumber');
    }

    // Connect - Livereload setup
    var lrSnippet = require('connect-livereload')({
        port: CONFIG.livereload
    });

    // Connect - static directory
    var mountFolder = function(connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    // Time grunt tasks
    require('time-grunt')(grunt);

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/**\n' + ' * <%= pkg.name %>\n' + ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n'
            + ' * @link <%= pkg.homepage %>\n' + ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n'
            + ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' + ' */\n'
        },

        // Project settings
        config: CONFIG,

        // Watch task configuration
        watch: {
            options: {
                nospawn: true,
                livereload: '<%= connect.livereload %>'
            },
            less: {
                files: ['<%= config.app %>/stylesheets/app.less'],
                tasks: ['less','cssmin']
            },
            scripts: {
                files: [
                    '<%= config.app %>/scripts/**/*.js',
                    '<%= config.test %>/e2e/**/*.js'
                ],
                tasks: ['jshint']
            }
        },

        // Clean task configuration
        clean: {
            build: ['<%= config.dist %>'],
            test: ['test-target/']
        },

        // Preview server configuration
        connect: {
            livereload: {
                options: {
                    port: SERVER_PORT,
                    open: true,
                    hostname: 'localhost',
                    middleware: function(connect, options, middlewares) {
                        return [
                            require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]']),
                            connect.static(require('path').resolve('public'))
                        ];

                    }
                }
            },
            test: {
                options: {
                    port: RUNNER_PORT,
                    base: ['.tmp', '.']
                }
            },
            docs: {
                options: {
                    useAvailablePort: true,
                    keepalive: true,
                    open: true,
                    middleware: function(connect) {
                        return [mountFolder(connect, '.'), mountFolder(connect, '.tmp'), mountFolder(connect, 'docs')];
                    }
                }
            },
            production: {
                options: {
                    keepalive: true,
                    port: 8000,
                    middleware: function(connect, options) {
                        return [
                            // rewrite requirejs to the compiled version
                            function(req, res, next) {
                                if (req.url === '<%= config.bower %>/requirejs/require.js') {
                                    req.url = '/dist/require.min.js';
                                }
                                next();
                            }, connect.static(options.base),

                        ];
                    }
                }
            }
        },

        // Karma Unit configuration
        karma: {
            runner: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // JSHint task - https://www.npmjs.com/package/grunt-contrib-jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                '<%= config.src %>/**/*.js'
            ],
            test: [
                '<%= config.test %>/e2e/**/*.js',
                '<%= config.test %>/spec/**/*.js'
            ]
        },

        // Protractor runner - https://www.npmjs.org/package/grunt-protractor-runner
        protractor: {
            options: {
                keepAlive: false,
                noColor: false
            },
            e2e: {
                options: {
                    configFile: 'protractor.conf.js'
                }
            }
        },

        // Protractor webdriver - https://www.npmjs.org/package/grunt-protractor-webdriver
        protractor_webdriver: {
            e2e: {
                options: {
                    //path: '/usr/local/bin/webdriver-manager',
                    command: 'webdriver-manager start'
                }
            }
        },

        // Requirejs build configuration
        requirejs: {
            compile: {
                options: {
                    out: '<%= config.dist %>/scripts/bootstrapper.js',
                    normalizeDirDefines: 'all',
                    optimize: 'uglify',
                    wrap: true,
                    skipDirOptimize: false,
                    generateSourceMaps: false,
                    include: ['bootstrapper'],
                    name: 'app',
                    removeCombined: true,
                    baseUrl: '<%= config.src %>/',
                    // Since we are not using the browser and bypassing the catalog manager.
                    paths: {
                        widgets: '../../conf/components'
                    },
                    config: {
                        text: {
                            env: 'node'
                        }
                    },
                    findNestedDependencies: true,
                    mainConfigFile: '<%= config.src %>/config.js',
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
        },

        // Changelog - https://www.npmjs.org/package/grunt-changelog
        changelog: {
            sample: {
                options: {
                    dest: 'release-notes/<%= pkg.version %>.txt',
                    //TODO: Change to match your project's feature commit comment code.
                    //featureRegex: '/(^(PROJECT-*\d+\W*\s*\[FEATURE\])+\s-\s)/gm',
                    //TODO: Change to match your project's fix commit comment code.
                    //fixRegex: '/(^(PROJECT-*\d+\W*\s*\[FIX\])+\s-\s)/gm',
                    partials: {
                        features: '{{#each features}}{{> feature}}{{/each}}',
                        feature: '[NEW] {{this}}\n',
                        fixes: '{{#each fixes}}{{> fix}}{{/each}}',
                        fix: '[FIX] {{this}}\n'
                    }
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        cwd: 'public',
                        expand: true,
                        src: [
                            '**'
                        ],
                        dest: '<%= config.dist %>/'
                    }
                ]
            }
        },

        autoprefixer: {
            options: {
            browsers: ['last 2 version']
          },
          multiple_files: {
            expand: true,
            flatten: true,
            src: 'public/stylesheets/noprefix/*.css',
            dest: 'public/stylesheets'
          }
        },

        // cssmin task - https://github.com/gruntjs/grunt-contrib-cssmin
        cssmin: {
            options: {},
            target: {
                files: {
                    "public/stylesheets/main.min.css": [
                        //'public/stylesheets/app.css',
                        'public/stylesheets/**/*.css',
                        '!public/stylesheets/main.min.css'
                    ]
                }
            }
        },

        less: {
            development: {
                files: {
                    '<%= config.app %>/stylesheets/app.css': '<%= config.app %>/stylesheets/app.less'
                }
            }
        },

        // Bump task - https://www.npmjs.com/package/grunt-bump
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },

        // NG Docs Task - https://github.com/m7r/grunt-ngdocs
        // Docs how-to - https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
        ngdocs: {
            options: {
                html5Mode: false,
                title: '<%= pkg.name %> Documentation',
                scripts: ['angular.js'],
                styles: ['../dist/<%= pkg.name %>.css']
            },
            api: {
                src: ['public/scripts/**/*.js'],
                title: 'API Documentation'
            }
        },

        // ngAnnotate - https://www.npmjs.com/package/grunt-ng-annotate
        ngAnnotate: {
            options: {
                singleQuotes: true,
                remove: false,
                add: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: ['<%= config.src %>/**/*.js'],
                        dest: '<%= config.tmp %>/scripts',
                        ext: '.annotated.js', // Dest filepaths will have this extension
                        extDot: 'last'       // Extensions in filenames begin after the last dot
                    }
                ]
            }
        },

        // Concat task - https://www.npmjs.com/package/grunt-contrib-concat
        concat: {
            options: {
                //banner: '<%= meta.banner %>',
                stripBanners: true
            },
            dist: {
                src: ['<%= config.src %>/<%= pkg.name %>.js'],
                dest: '<%= config.dist %>/<%= pkg.name %>.js'
            }
        },

        // Uglify task - https://www.npmjs.com/package/grunt-contrib-uglify
        uglify: {
            options: {
                //banner: '<%= meta.banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= config.dist %>/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.registerTask('dist', ['clean:build', 'cssmin', 'jshint:src', 'copy:dist', 'requirejs', 'autoprefixer']);
    grunt.registerTask('test', ['jshint:test', 'clean:test', 'karma']);
    grunt.registerTask('test:e2e', ['clean:test', 'protractor_webdriver', 'protractor']);
    grunt.registerTask('serve', ['cssmin', 'clean:build', 'connect:livereload', 'watch', 'autoprefixer']);
    grunt.registerTask('docs', ['dist', 'ngdocs', 'connect:docs']);
    grunt.registerTask('default', ['dist', 'test']);
};
