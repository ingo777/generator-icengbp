module.exports = function ( karma ) {
    karma.set({
        /**
         * From where to look for files, starting with the location of this file.
         */
        basePath: '../',

        preprocessors: {
            '**/*.ts': ['typescript']
        },

        /**
         * This is the list of file patterns to load into the browser during testing.
         */
        files: [
            <% scripts.forEach( function ( file ) { %>'<%= file %>',
                <% }); %>
            'src/**/*.module.js',
            'src/**/*.js',
            'src/**/*.module.ts',
            'src/**/*.ts'
        ],
        exclude: [
          'src/assets/**/*.js'
        ],
        frameworks: [ 'jasmine' ],
        plugins: [
            'karma-jasmine',
            'karma-firefox-launcher',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-typescript-preprocessor'
        ],

        /**
         * How to report, by default.
         */
        reporters: 'dots',

        /**
         * On which port should the browser connect, on which port is the test runner
         * operating, and what is the URL path for the browser to use.
         */
        port: 9018,
        runnerPort: 9100,
        urlRoot: '/',

        /**
        * Disable file watching by default.
        */
        autoWatch: false,

        typescriptPreprocessor: {
            // options passed to the typescript compiler
            options: {
                sourceMap: false, // (optional) Generates corresponding .map file. If you set the sourceMap option to true then the generated source map will be inlined as a data-uri.
                target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
                module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd'
                noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: true, // (optional) Skip resolution and preprocessing.
                removeComments: true // (optional) Do not emit comments to output.
            },

            // transforming the filenames
            transformPath: function(path) {
                return path.replace(/\.ts$/, '.js');
            }
        },
        /**
        * The list of browsers to launch to test on. This includes only "Firefox" by
        * default, but other browser names include:
        * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
        *
        * Note that you can also use the executable name of the browser, like "chromium"
        * or "firefox", but that these vary based on your operating system.
        *
        * You may also leave this blank and manually navigate your browser to
        * http://localhost:9018/ when you're running tests. The window/tab can be left
        * open and the tests will automatically occur there during the build. This has
        * the aesthetic advantage of not launching a browser every time you save.
        */
        browsers: [
          'Firefox'
        ]
  });
};

