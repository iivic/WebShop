module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'Grunt_Files/css/style.css': ['Grunt_Files/sass/style.scss']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'static/css/style.min.css': ['Grunt_Files/css/style.css']
                }
            }
        },
        watch: {
            cssTasks: {
                files: ['Grunt_Files/sass/style.scss'],
                tasks: ['sass', 'cssmin']
            },
            jsTasks: {
                files: ['Grunt_files/js/models/backboneModels.js', 'Grunt_files/js/collections/backboneCollections.js', 'Grunt_files/js/views/backboneViews.js', 'Grunt_files/js/routes/backboneRoutes.js', 'Grunt_files/js/functions.js'],
                tasks: ['concat', 'uglify']
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['Grunt_files/js/models/backboneModels.js', 'Grunt_files/js/collections/backboneCollections.js', 'Grunt_files/js/views/backboneViews.js', 'Grunt_files/js/routes/backboneRoutes.js', 'Grunt_files/js/functions.js'],
                // the location of the resulting JS file
                dest: 'Grunt_files/js/main.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'static/js/main.min.js': ['Grunt_files/js/main.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'sass', 'cssmin', 'uglify']);
};
