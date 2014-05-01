'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: ['public/sass/*.scss'],
                tasks: ['compass']
            }
        },

        compass: {
          dist: {
            options: {
              sassDir: 'public/sass',
              cssDir: 'public/css',
              imagesDir: 'public/images'
            }
          }
        },

        uglify: {
            options: {
                mangle: false
            },
            production: {
                files: '<%= assets.js %>'
            }
        },

        cssmin: {
            combine: {
                files: '<%= assets.css %>'
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**', 'bower_components', 'node_modules'],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: require('./server/config/config').port
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            server: {
                tasks: ['nodemon', 'watch'],
                options: {
                  logConcurrentOutput: true
                }
            },
            compile: {
                tasks: ['compass']
            }
        },

        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },

        bowercopy: {
            js: {
                options: {
                    destPrefix: 'public/js/lib'
                },
                files: {
                    'jquery.js' : 'jquery/dist/jquery.js'
                }
            },
            
            css: {
                options: {
                    destPrefix: 'public/css/lib'
                },
                files: {
                    'bootstrap.css' : 'bootstrap/dist/css/bootstrap.css'
                }
            }
        },

        env: {
            test: {
                NODE_ENV: 'test'
            }
        }
    });

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['cssmin', 'uglify', 'concurrent']);
    } else {
        grunt.registerTask('default', ['concurrent:server']);
    }

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest']);
    grunt.registerTask('bower', ['bowercopy']);
};
