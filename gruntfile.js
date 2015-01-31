'use strict';
var to5ify = require('6to5ify');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      css: {
        files: ['public/sass/*.scss'],
        tasks: ['compass']
      },
      js: {
        files: ['public/js/galactron/**/*.js'],
        tasks: ['browserify']
      },
      options: {
        spawn: false
      },
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
      js: {
        files: { 'public/js/dist/galactron.min.js': 
            [   
                'public/js/dist/galactron/**/*.js'
           ]
        }
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

    browserify: {
      dist: {
        src: ['public/js/galactron/galactron.js'],
        dest: 'public/js/dist/module.js',
        options: {
          debug: true,
          external: [
            'public/js/lib/phaser/phaser.js'
          ],
          transform: ['6to5ify']
        },
        expose: 'modules'
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      }
    }
  });

  //Default task(s).
  if (process.env.NODE_ENV === 'production') {
    grunt.registerTask('default', ['cssmin', 'uglify', 'concurrent']);
  } else {
    grunt.registerTask('default', ['concurrent:server', 'uglify']);
  }
  grunt.loadNpmTasks('grunt-browserify');

  //Test task.
  grunt.registerTask('test', ['env:test', 'mochaTest']);
  grunt.registerTask('bower', ['bowercopy']);
};
