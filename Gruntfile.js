'use strict';

module.exports = function(grunt) {

    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        sass: {
            dist_grunt: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist_grunt'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist_grunt'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist_grunt/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'dist_grunt/'
                }]
            }
        },
        useminPrepare: {
            foo: {
                dest: 'dist_grunt',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist_grunt: {}
        },
        uglify: {
            dist_grunt: {}
        },
        cssmin: {
            dist_grunt: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist_grunt/js/*.js',
                        'dist_grunt/css/*.css',
                    ]
                }]
            }
        },
        usemin: {
            html: ['dist_grunt/contactus.html', 'dist_grunt/aboutus.html', 'dist_grunt/index.html'],
            options: {
                assetDirs: ['dist_grunt', 'dist_grunt/css', 'dist_grunt/js']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: {
                    'dist_grunt/index.html': 'dist_grunt/index.html',
                    'dist_grunt/contactus.html': 'dist_grunt/contactus.html',
                    'dist_grunt/aboutus.html': 'dist_grunt/aboutus.html'
                }
            }
        }
    });

    grunt.registerTask('css',['sass']);
    grunt.registerTask('default',['browserSync', 'watch']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};