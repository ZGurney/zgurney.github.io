module.exports = function(grunt) { 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                },
                files: {
                    'docs/css/main-compiled.css': 'docs/css/sass/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                },
                files: {
                    'docs/css/main-compiled.css': 'docs/css/sass/main.scss'
                }
            },
        },
        purgecss: {
            dist: {
              options: {
                content: ['docs/**/*.html'],
                fontFace: false
              },
              files: {
                'docs/css/main.css': ['docs/css/main-compiled.css']
              }
            }
        },
        /*critical: {
            dist: {
                options: {
                    css: [
                        'docs/css/main.css'
                    ],
                    dimensions: [
                        {
                          height: 500,
                          width: 300,
                        },
                        {
                          height: 720,
                          width: 1280,
                        },
                    ]
                },
                src: 'docs/index.html',
                dest: 'docs/index-critical.html'
            }
        },*/
        watch: {
            dev: {
                files: ['Gruntfile.js', 'docs/css/sass/*.scss'],
                tasks: ['sass:dev'],
                reload: true
            },
            dist: {
                files: ['Gruntfile.js', 'docs/css/sass/*.scss'],
                tasks: ['sass:dev', 'purgecss:dist'],
                reload: true
            }
        }
    });
 
    // Use matchdep module to require all Grunt tasks automatically
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
    grunt.registerTask('default', ['watch:dev']);
};