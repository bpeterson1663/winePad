module.exports = function(grunt) {
    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       uglify: {
         options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
         },
         build: {
            src: [
              'client/scripts/app.js',
              'client/scripts/controllers/*.js',
              'client/scripts/factories.js'
            ],
            dest: 'server/client/assets/scripts/app.min.js'
         }
       },
       copy: {
         angular : {
           expand: true,
           cwd: 'node_modules',
           src: [
              "angular/*",
              "angular-animate/*",
              "angular-aria/*",
              "angular-material/*",
              "angular-messages/*",
              "angular-route/*"
            ],
            dest: "server/public/assets/vendors/"
         },
         html : {
           expand: true,
           cwd: 'server/client/views/',
           src: [
              "index.html",
              "registraion.html",
              "wineListDisplay.html"
              "routes/*.html",
              "dialogs/*.html",
              "partials/*.html"
            ],
            dest: "server/public/assets/views/"
         }
       }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['copy', 'uglify']);
};
