'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    pug: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'docs/pug',
          src: ['*.pug'],
          dest: 'docs',
          ext: '.html'
        }]
      }
    },

    less: {
      style: {
        files: {
          'build/css/style.css': 'docs/less/style.less',
          'docs/css/style.css': 'docs/less/style.less'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'build/css/*.css',
        src: 'docs/css/*.css'
      }
    },

    watch: {
      style: {
        files: ['docs/less/**/*.less', 'docs/pug/**/*.pug'],
        tasks: ['pug', 'less', 'postcss', 'cssmin'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: 'gzip'
      },
      style: {
        files: {
          'build/css/style.min.css': 'build/css/style.css',
          'docs/css/style.min.css': 'docs/css/style.css'
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: 'docs/img/**/*.{png,jpg,gif,svg}'
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'docs',
          src: ['img/**','js/**','*.html'],
          dest: 'build'
        }]
      }
    },

    clean: {
      build: ['build']
    }
  };

  // config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'pug',
    'less',
    'postcss',
    'cssmin',
    'imagemin'
  ]);
};
