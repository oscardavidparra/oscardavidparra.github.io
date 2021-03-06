// Generated on 2015-02-24 using generator-jadestyl v0.2.5

module.exports = function(grunt) {

  var config = {
    jade: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.jade',
          dest: 'public/',
          ext: '.html'
        }],
        options: {
          pretty: true
        }
      }
    },
    stylus: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/styles/',
          src: '**/*.styl',
          dest: 'public/styles/',
          ext: '.css'
        }],
        options: {
          compress: false
        }
      }
    },
    coffee: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/scripts/',
          src: '**/*.coffee',
          dest: 'public/scripts/',
          ext: '.js'
        }]
      }
    },
    copy: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            'scripts/*.js'
          ],
          dest: 'public/'
        }]
      }
    },
    watch: {
      jade: {
        files: 'src/*.jade',
        tasks: 'jade'
      },
      stylus: {
        files: 'src/styles/*.styl',
        tasks: 'stylus'
      },
      coffee: {
        files: '**/*.coffee',
        tasks: 'coffee'
      },
      copy: {
        files: [
          'src/scripts/*.js',
          'src/*.jade',
          'src/scripts/*.coffee',
          'src/styles/*.styl'
        ],
        tasks: 'copy:src'
      },
      public: {
        files: [
          'public/**/*',
          '!public/bower_components/**/*'
        ],
        options: {
          livereload: 35729
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 80,
          hostname: '*', // Remove this line if you only want the server available locally
          base: 'public',
          keepalive: true,
          middleware: function(connect, options) {
            return [
              require('connect-livereload')({
                port: config.watch.public.options.livereload
              }),
              connect.static(options.base)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:80'
      }
    },
    concurrent: {
      compile: {
        tasks: [
          'jade',
          'stylus',
          'coffee',
          'copy'
        ],
        options: {
          logConcurrentOutput: false
        }
      },
      server: {
        tasks: [
          'open',
          'watch:jade',
          'watch:stylus',
          'watch:coffee',
          'watch:copy',
          'watch:public',
          'connect'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    useminPrepare: {
      html: 'public/index.html',
      options: {
        dest: 'public'
      }
    },
    usemin: {
      html: 'public/index.html'
    },
  uncss: {
    dist: {
      files: {
        'public/styles/styles.css': ['public/index.html']
      }
    }
  },
  cssmin: {
      after: {
        options: {
          keepSpecialComments: '0'
        },
        files: {
          'public/styles/styles.css': ['public/styles/styles.css']
        }
      }
    },
    htmlmin: {
        dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: {
            'public/index.html': 'public/index.html'
          }
      }
    }
  

  };

  grunt.initConfig(config);

  // Load all Grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['concurrent:compile', 'useminPrepare', 'concat', 'uglify', 'uncss', 'cssmin:after', 'usemin', 'htmlmin']);
  grunt.registerTask('server', ['concurrent:compile', 'concurrent:server']);

};