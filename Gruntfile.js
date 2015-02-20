/**
 * @description I am the Projects Gruntfile that contains tasks to build, test and deploy a project.
 * @namespace my-test-app
 */
module.exports = function (grunt) {
	'use strict';

	//Local server ports
	var LIVERELOAD_PORT = 35724;
	var SERVER_PORT = 9000;
	var RUNNER_PORT = 9002;

	//Project config
	var buildNumber = '';
	var CONFIG = {
		name: 'my-predix-app',
		app: 'public',
		test: 'test',
		server: 'server',
		src: 'public/scripts',
		dist: 'dist',
		bower: 'public/bower_components',
		tmp: '.tmp',
		artifactory: {
			host: 'https://devcloud.swcoe.ge.com',
			repo: 'DSP',
            		username: '502398775',
			password: '{DESede}/O9QTuX+WMKXBCwL9/LJUQ=='
		},
		//Enviornment specific settings
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

	//For adding build number to zip
	if(grunt.option('buildNumber')){
		buildNumber = grunt.option('buildNumber');
	}

	//Connect - Livereload setup
	var lrSnippet = require('connect-livereload')({
		port: CONFIG.livereload
	});

	//Connect - static directory
	var mountFolder = function (connect, dir) {
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
			styles: {
				files: [ '<%= config.app %>/stylesheets/**/*.css' ]
			},
			scripts: {
				files: [
					'<%= config.test %>/e2e/**/*.js',
					'<%= config.test %>/spec/**/*.js',
					'<%= config.app %>/scripts/**/*.js'
				],
				tasks: ['jshint', 'karma']
			},
			test: {
				files: [ 'test/spec/**/*.js' ],
				tasks: [ 'karma' ]
			}
		},

		// Clean task configuration
		clean: {
			build: [ '<%= config.dist %>' ],
			artifactory: [
				'<%= config.bower %>/vruntime'
			],
			test: [ 'test-target/' ]
		},

		// Preview server configuration
		connect: {
			livereload: {
				options: {
					port: SERVER_PORT,
					open: true,
                    hostname: 'localhost',
                    middleware: function(connect,options,middlewares) {
                        var proxyConfig = {
                            proxy: {
                                forward: {
                                    '/services/asset': 'http://asset-server.grc-apps.svc.ice.ge.com',
                                    '/api/v2/proxy': 'http://localhost:9001'
                                },
                                headers: {
                                    //make sure to keep Service-End-Point header which for some reason is getting clobbered
                                    'X-No-Validation': function(req) {
                                        console.log(req.headers);
                                        return true; //req.headers['x-no-validation']
                                    },
                                    'Accept': function(req) {
                                        return 'application/json; charset=UTF-8';
                                    },
                                    'Content-Type': function(req) {
                                        return 'application/json, text/javascript, */*; q=0.01';
                                    },
                                    'Service-End-Point': function(req) {
                                        return req.headers['service-end-point']
                                    },
                                    'authorization': function(req) {
                                        return req.headers['authorization']
                                    }
                                }
                            }
                        };

                        return [
                            require('json-proxy').initialize(proxyConfig),
                            require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]']),
                            connect.static(require('path').resolve('public'))
                        ];

                    }
				}
			},
			test: {
				options: {
					port: RUNNER_PORT,
					base: [ '.tmp', '.' ]
				}
			},
			docs: {
				options: {
					useAvailablePort: true,
					keepalive: true,
					open: true,
					middleware: function (connect) {
						return [ mountFolder(connect, '.'), mountFolder(connect, '.tmp'), mountFolder(connect, 'docs') ];
					}
				}
			},
			production: {
				options: {
					keepalive: true,
					port: 8000,
					middleware: function (connect, options) {
						return [
							// rewrite requirejs to the compiled version
							function (req, res, next) {
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

		//JSHint task -
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
					out: '<%= config.dist %>/public/scripts/bootstrapper.js',
					normalizeDirDefines: 'all',
					optimize: 'uglify',
					wrap: true,
					skipDirOptimize: false,
					include:['bootstrapper'],
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
					done: function (done, output) {
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

		//Changelog - https://www.npmjs.org/package/grunt-changelog
		changelog: {
			sample: {
				options: {
					dest: 'release-notes/<%= pkg.version %>.txt',
					//TODO: Change to match your projects feature commit comment code.
					//featureRegex: '/(^(PROJECT-*\d+\W*\s*\[FEATURE\])+\s-\s)/gm',
					//TODO: Change to match your projects fix commit comment code.
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
                files:[
                    {
                        expand: true,
                        src: [
                            'public/index.html',
                            'public/stylesheets/main.min.css',
                            'public/bower_components/oauth-ng/dist/**/*.html',
                            'public/bower_components/px-*/*.html',
                            'public/views/*.html',
                            'public/bower_components/px-datagrid/src/*',
                            'public/bower_components/px-time-series/src/*',
                            '!public/bower_components/px-contextual-dashboard/node_modules/**',
                            '!public/bower_components/px-contextual-dashboard/bower_components/**',
                            ],
                        dest: '<%= config.dist %>/'
                    },
                    {
                        expand: true, src: [
                            'public/bower_components/iids/dist/iidx/components/requirejs/**',
                            'public/bower_components/requirejs-plugins/src/**'
                        ],
                        dest: '<%= config.dist %>/'
                    },
                    {
                        expand: true,
                        src:['public/**/components/brandkit/fonts/*.*',],
                        dest:'<%= config.dist %>/public/components/brandkit/fonts/',
                        flatten: true
                     },
                    {
                        expand: true,
                        src:['public/**/components/brandkit/img/*.*',],
                        dest:'<%= config.dist %>/public/components/brandkit/img/',
                        flatten: true
                    }

                ]
            }
        },

        cssmin: {
            options: {},
            target: {
                files: {
                    "public/stylesheets/main.min.css": [
                        'public/stylesheets/app.css',
                        'public/bower_components/iids/dist/iidx/css/*.min.css'
                    ]
                }
            }
        },


        // Bump task -
		bump: {
			options: {
				files: [ 'package.json' ],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: [ 'package.json' ],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
			}
		},

		// NG Docs Task - https://github.com/m7r/grunt-ngdocs
		//Docs how-to - https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
		ngdocs: {
			options: {
				html5Mode: false,
				title: '<%= pkg.name %> Documentation',
				scripts: [ 'angular.js' ],
				styles: [ '../dist/<%= pkg.name %>.css' ]
			},
			api: {
				src: [ 'public/scripts/**/*.js' ],
				title: 'API Documentation'
			}
		},

		//ngAnnotate task
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
						src: [ '<%= config.src %>/**/*.js' ],
						dest: '<%= config.tmp %>/scripts',
						ext: '.annotated.js', // Dest filepaths will have this extension.
						extDot: 'last'       // Extensions in filenames begin after the last dot
					}
				]
			}
		},

		//Concat task
		concat: {
			options: {
				//banner: '<%= meta.banner %>',
				stripBanners: true
			},
			dist: {
				src: [ '<%= config.src %>/<%= pkg.name %>.js' ],
				dest: '<%= config.dist %>/<%= pkg.name %>.js'
			}
		},

		//Uglify task
		uglify: {
			options: {
				//banner: '<%= meta.banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: '<%= config.dist %>/<%= pkg.name %>.min.js'
			}
		},

		// Artifactory task
		artifactory: {
			//vClient library
			vclient: {
				options: {
					url: '<%=config.artifactory.host %>',
					repository: '<%= grunt.config.get("repo") %>',
					username: '<%= config.artifactory.username %>',
					password: '<%= config.artifactory.password %>',
					fetch: [
						{
							group_id: 'com.ge.predix.js',
							name: 'vruntime',
							ext: 'zip',
							version: '1.9.0',
							path: '<%= config.bower %>/vruntime'
						}
					]
				}
			},
			//iidx library
			ux: {
				options: {
					url: '<%=config.artifactory.host %>',
					repository: '<%= grunt.config.get("repo") %>',
					username: '<%=config.artifactory.username %>',
					password: '<%=config.artifactory.password %>',
					fetch: [
						{
							group_id: 'com.ge.predix',
							name: 'iidx',
							ext: 'zip',
							version: '3.0.0',
							path: '<%= config.bower %>/iids'
						}

					]
				}
			}
		}
	});

	//TODO - Grunt Tasks
	//TODO - pull the vclient/iidx distributions from artifactory (configured above)
	grunt.registerTask('predix:update', [ 'config:prod', 'clean:artifactory', 'artifactory:ux','artifactory:vclient' ]);
	grunt.registerTask('update', [ 'config:prod', 'clean:artifactory', 'artifactory:ux', 'artifactory:vclient' ]);

	grunt.registerTask('build', [ 'clean:build', 'cssmin', 'jshint:src', 'copy:dist','requirejs']);
	grunt.registerTask('test', [ 'jshint:test', 'clean:test', 'karma' ]);
	grunt.registerTask('test:e2e', [ 'clean:test', 'protractor_webdriver', 'protractor' ]);
	grunt.registerTask('serve', [ 'clean:build', 'connect:livereload', 'watch' ]);
	grunt.registerTask('docs', [ 'build', 'ngdocs', 'connect:docs' ]);
	grunt.registerTask('default', [ 'build', 'test' ]);
};
