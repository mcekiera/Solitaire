module.exports = function(grunt) { 
	// Project configuration. 
	grunt.initConfig({ 
		sass: { 
			options: { 
				sourceMap: true 
			}, 
				dist: { 
				files: { 
					'css/style.css': 'scss/style.scss' 
				} 
			} 
		},
		watch: { 
			scripts: { 
				files: ['scss/*.scss'], 
				tasks: ['sass'], 
				options: { 
					spawn: false, 
				}, 
			} 
		},
		browserSync: {
			default_options: {
				bsFiles: {
					src: [
						"*js",
						"js/*.js",
						"css/*.css",
						"img/*.css",
						"scss/*.scss",
						"*.html"
					]
				},
					options: {
						watchTask: true,
					server: {
						baseDir: "./"
					}
				}
			}
		}

	}); 
	// Load the plugins tasks 
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	// Default task(s). 

	grunt.registerTask('default', ['browserSync', 'watch']); 
};