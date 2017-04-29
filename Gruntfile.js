'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

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
        files: ['docs/less/**/*.less'],
        tasks: ['less', 'postcss', 'cssmin'],
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
    'less',
    'postcss',
    'cssmin',
    'imagemin'
  ]);
};
