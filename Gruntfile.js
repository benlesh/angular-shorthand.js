module.exports = function(grunt) {

    grunt.config({
        pkg: grunt.util.readJSON('package.json')
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);
};