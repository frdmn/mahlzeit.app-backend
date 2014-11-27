module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            bower: 'bower_components',
            css: 'assets/css',
            js: 'assets/js',
            images: 'assets/images',
            fonts: 'assets/fonts',
            svg: 'assets/svg'
        },

        // SCSS
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            }
        },

        // CSS autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.css'
                }
            }
        },

        // Connect Server
        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 9001,
                    base: ''
                }
            }
        },

        // Concat
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    '<%= dirs.bower %>/jquery/jquery.js',
                    '<%= dirs.bower %>/loglevel/dist/loglevel.js',
                    '<%= dirs.bower %>/admin-lte/js/jquery-ui-1.10.3.js',
                    '<%= dirs.bower %>/admin-lte/js/bootstrap.js',
                    '<%= dirs.bower %>/raphael/raphael.js',
                    '<%= dirs.bower %>/admin-lte/js/plugins/morris/morris.js',
                    '<%= dirs.bower %>/admin-lte/js/plugins/sparkline/jquery.sparkline.js',
                    '<%= dirs.bower %>/admin-lte/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js',
                    '<%= dirs.bower %>/admin-lte/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
                    '<%= dirs.bower %>/admin-lte/js/plugins/fullcalendar/fullcalendar.js',
                    '<%= dirs.bower %>/admin-lte/js/plugins/jqueryKnob/jquery.knob.js',
                    '<%= dirs.bower %>/admin-lte/js/plugins/daterangepicker/daterangepicker.js',
                    '<%= dirs.bower %>/admin-lte/js/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.js',
                    '<%= dirs.bower %>/admin-lte/js/plugins/iCheck/icheck.js',
                    '<%= dirs.bower %>/admin-lte/js/AdminLTE/app.js',
                    '<%= dirs.bower %>/admin-lte/js/AdminLTE/dashboard.js',
                    '<%= dirs.bower %>/admin-lte/js/AdminLTE/demo.js',
                    '<%= dirs.js %>/*.js',
                    '!<%= dirs.js %>/build.js'
                ],
                dest: '<%= dirs.js %>/build.js',
            },
        },

        // JShint
        jshint: {
            options: {
                multistr: true
            },
            all: [
                'Gruntfile.js',
                '<%= dirs.js %>/*.js',
                '!<%= dirs.js %>/build.js'
            ]
        },

        // HTMLhint
        htmlhint: {
            html: {
                options: {
                    'tag-pair': true
                },
                src: ['*.html']
            }
        },

        // Uglify
        uglify: {
            all: {
                files: {
                    '<%= dirs.js %>/build.js': ['<%= dirs.js %>/build.js']
                }
            }
        },

        // Imagemin
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.images %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.images %>'
                }]
            }
        },

        // CSSmin
        cssmin: {
            combine: {
                files: {
                    '<%= dirs.css %>/style.min.css': [
                        '<%= dirs.css %>/style.css',
                        '<%= dirs.bower %>/admin-lte/css/bootstrap.css',
                        '<%= dirs.bower %>/admin-lte/css/font-awesome.css',
                        '<%= dirs.bower %>/admin-lte/css/ionicons.css',
                        '<%= dirs.bower %>/admin-lte/css/morris/morris.css',
                        '<%= dirs.bower %>/admin-lte/css/jvectormap/jquery-jvectormap-1.2.2.css',
                        '<%= dirs.bower %>/admin-lte/css/fullcalendar/fullcalendar.css',
                        '<%= dirs.bower %>/admin-lte/css/daterangepicker/daterangepicker-bs3.css',
                        '<%= dirs.bower %>/admin-lte/css/bootstrap-wysihtml5/bootstrap3-wysihtml5.css',
                        '<%= dirs.bower %>/admin-lte/css/AdminLTE.css',
                    ]
                }
            }
        },

        // Copy
        copy: {
          main: {
            files: [
              {expand: true, cwd: '<%= dirs.bower %>/admin-lte/fonts/', src: ['**'], dest: '<%= dirs.fonts %>'},
              {expand: true, cwd: '<%= dirs.bower %>/admin-lte/img/', src: ['**'], dest: '<%= dirs.images %>'},
              {expand: true, cwd: '<%= dirs.bower %>/admin-lte/css/iCheck/minimal/', src: ['**'], dest: '<%= dirs.css %>/iCheck/minimal'},
            ]
          }
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['<%= dirs.css %>/*.scss'],
                tasks: ['sass:dev', 'autoprefixer', 'cssmin']
            },
            images: {
                files: ['<%= dirs.images %>/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            html: {
                files: ['*.html'],
                tasks: ['htmlhint']
            },
            scripts: {
                files: ['Gruntfile.js', '<%= dirs.js %>/*.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['sass:build', 'copy' , 'cssmin', 'autoprefixer', 'concat', 'uglify', 'imagemin']);
    grunt.registerTask('dev', ['connect', 'watch']);
};
