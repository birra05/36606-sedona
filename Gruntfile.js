"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less",
          "source/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/*.css",
        src: "source/css/*.css"
      }
    },

    watch: {
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss", "cssmin"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css": "build/css/style.css",
          "source/css/style.min.css": "source/css/style.css"
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
          src: "source/img/**/*.{png,jpg,gif,svg}"
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: ["img/**","js/**","*.html"],
          dest: "build"
        }]
      }
    },

    clean: {
      build: ["build"]
    }
  };

  config = require("./.gosha")(grunt, config);

  grunt.initConfig(config);

  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "cssmin",
    "imagemin"
  ]);
};
