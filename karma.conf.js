// Karma configuration
// Generated on Thu Nov 10 2016 18:43:13 GMT+0100 (Środkowoeuropejski czas stand.)

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine','fixture'],


		// list of files / patterns to load in the browser
		files: [


			'node_modules/jquery/dist/jquery.js',
			'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
			'node_modules/jquery-ui-dist/jquery-ui.js',

			{pattern: 'test/fixture/*.html', watched: true, served: true, included: false},

			'js/solitaire.js',
			'js/board.js',
			'js/card.js',
			'js/deck.js',
			'js/event.js',
			'js/pile.js',
			'js/rulebook.js',
			'js/score.js',
			'js/timer.js',
			'js/main.js',

			'test/rulebook.spec.js',
			'test/timer.spec.js'
		],


		// list of files to exclude
		exclude:[],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'*.html': []
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Firefox'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		plugins: [
			'karma-jasmine',
			'karma-fixture',
			'karma-firefox-launcher'
		],

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	});
};
