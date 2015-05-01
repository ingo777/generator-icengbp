pkg         = require('./package.json'); // Load the NPM package file

/**
 * This file/module contains all configuration for the build process.
 */
module.exports = function() {
    var vendor_dir = 'vendor/',
        build_dir = 'build/',
        assets_dir = 'assets/',
        src_dir = 'src/',
        svg_dir = 'svg/',
        temp_dir = '.tmp/',
        fonts_dir = 'fonts/',
        less_dir = 'less/',
        app_dir = 'app/',
        common_dir = 'common/',
        images_dir = 'images/',
        root_dir = './',
        report_dir = 'report/';

    var index_html = 'index.html',
        templates_app_js = 'templates-app.js',
        templates_common_js = 'templates-common.js',
        gulpfile_js = 'gulpfile.js',
        gulp_config_js = 'gulp.config.js',
        specs_html = 'specs.html';

    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var useWiredep = false;

    var config = {
        files: {
            alljs: src_dir + '**/*.js',
            allts: src_dir + '**/*.ts',
            alljson: src_dir + '**/*.json',
            allless: src_dir + '**/*.less',
            allcss: src_dir + '**/*.css',

            appjs: [
                // **/*.module.js must be loaded before all the other .js files
                src_dir + app_dir + '**/*.module.js',
                src_dir + common_dir + '**/*.module.js',
                src_dir + app_dir + '**/*.js',
                src_dir + common_dir + '**/*.js',
                '!' + src_dir + '**/*.spec.js'
            ],

            appts: [
                // **/*.module.ts must be loaded before all the other .ts files
                src_dir + app_dir + '**/*.module.ts',
                src_dir + common_dir + '**/*.module.ts',
                src_dir + app_dir + '**/*.ts',
                src_dir + common_dir + '**/*.ts',
                '!' + src_dir + '**/*.spec.ts'
            ],

            images: src_dir + images_dir + '**/*.*',
            fonts: src_dir + fonts_dir + '**/*.*',

            less: src_dir + less_dir + 'main.less',
            scss: src_dir + 'scss/main.scss',

            css: pkg.name + '-' + pkg.version,

            gulp: [
                gulpfile_js,
                gulp_config_js
            ],

            app_templates: [src_dir + app_dir + '**/*.tpl.html'],
            common_templates: [src_dir + common_dir + '**/*.tpl.html'],

            templates_app_js: templates_app_js,
            templates_common_js: templates_common_js,
            index_html: index_html,

            svg: src_dir + assets_dir + '**/*.svg',

            optimized: {
                lib: 'lib.js',
                app: 'app.js'
            },

            templates: [].concat(
                temp_dir + templates_app_js,
                temp_dir + templates_common_js
            ),

            assets: {
                js: [
                    src_dir + assets_dir + '**/*.module.js',
                    src_dir + assets_dir + '**/*.js',
                    '!' + src_dir + assets_dir + '**/*.spec.js'
                ]
            },

            /**
             * This is the same as `app_files`, except it contains patterns that
             * reference vendor code (`vendor/`) that we need to place into the build
             * process somewhere. While the `app_files` property ensures all
             * standardized files are collected for compilation, it is the user's job
             * to ensure non-standardized (i.e. vendor-related) files are handled
             * appropriately in `vendor_files.js`.
             *
             * The `vendor_files.js` property holds files to be automatically
             * concatenated and minified with our project source files.
             *
             * The `vendor_files.css` property holds any CSS files to be automatically
             * included in our app.
             *
             * The `vendor_files.assets` property holds any assets to be copied along
             * with our app's assets. This structure is flattened, so it is not
             * recommended that you use wildcards.
             */
            vendor: {
                js: [
                    vendor_dir + 'jquery/dist/jquery.js',
                    vendor_dir + 'angular/angular.js',
                    //'node_modules/' + 'angular-hint/dist/hint.js',
                    vendor_dir + 'angular-resource/angular-resource.js',
                    vendor_dir + 'angular-ui-router/release/angular-ui-router.js',
                    vendor_dir + 'bootstrap/dist/js/bootstrap.js',
                    vendor_dir + 'angular-bootstrap/ui-bootstrap-tpls.js',
                    vendor_dir + 'angular-messages/angular-messages.js',
                    vendor_dir + 'angular-sanitize/angular-sanitize.js',
                    vendor_dir + 'angular-animate/angular-animate.js',
                    vendor_dir + 'angular-local-storage/dist/angular-local-storage.js',
                    vendor_dir + 'angular-ui-utils/ui-utils.js',
                    vendor_dir + 'angular-ui-utils/modules/route/route.js',
                    vendor_dir + 'angular-loading-bar/build/loading-bar.js',
                    vendor_dir + 'extras.angular.plus/ngplus-overlay.js',
                    vendor_dir + 'placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
                    vendor_dir + 'lodash/dist/lodash.js',
                    vendor_dir + 'underscore/underscore.js',
                    vendor_dir + 'moment/moment.js',
                    vendor_dir + 'toastr/toastr.js',
                    vendor_dir + 'restangular/dist/restangular.js'
                ],
                css: [
                    vendor_dir + 'angular-loading-bar/build/loading-bar.css',
                    vendor_dir + 'bootstrap/dist/css/bootstrap.css',
                    vendor_dir + 'toastr/toastr.css',
                    vendor_dir + 'font-awesome/css/font-awesome.css'
                ],
                fonts: [
                    vendor_dir + 'font-awesome/fonts/**/*.*',
                    vendor_dir + 'bootstrap/dist/fonts/**/*.*'
                ],
                images: [

                ]
            },

            /**
             * This is a collection of files used during testing only.
             */
            test: {
                js: [
                    vendor_dir + 'angular-mocks/angular-mocks.js',
                    vendor_dir + 'bardjs/dist/bard.js',
                    vendor_dir + 'sinon/index.js'
                ]
            }
        },
        folders: {
            src: src_dir,
            temp: temp_dir,
            build: build_dir,
            fonts: fonts_dir,
            less: less_dir,
            images: images_dir,
            app: src_dir + app_dir,
            common: src_dir + common_dir,
            root: root_dir,
            report: report_dir,
            assets: assets_dir
        },

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: vendor_dir,
            ignorePath: '../..'
        },

        useWiredep: useWiredep,

        packages: [
            './package.json',
            './bower.json'
        ],

        /**
         * specs.html, our HTML spec runner
         */
        specRunner: src_dir + specs_html,
        specRunnerFile: specs_html,
        testlibraries: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],
        specs: [
            src_dir + app_dir + '**/*.spec.js',
            src_dir + common_dir + '**/*.spec.js'
        ],

        /**
         * Development server to run the app
         */
        server: {
            defaultPort: 7203,
            apiPath: 'http://localhost:1234/api/v1/'
        },

        /**
         * Karma and testing settings
         */
        specHelpers: [src_dir + 'test-helpers/*.js'],
        serverIntegrationSpecs: [src_dir + 'tests/server-integration/**/*.spec.js']
    };
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    config.karma = getKarmaOptions();

    return config;

    /////////////////////////////////////////////////
    function getKarmaOptions() {
        var options = {
            files: [].concat(
                useWiredep ? bowerFiles : config.files.vendor.js,
                !useWiredep ? config.files.test.js : [],
                config.specHelpers,
                config.files.appjs,
                config.folders.temp + config.files.templates_app_js,
                config.folders.temp + config.files.templates_common_js,
                config.serverIntegrationSpecs
            ),
            exclude: [
                src_dir + assets_dir + '**/*.js'
            ],
            coverage: {
                dir: report_dir + 'coverage',
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'}
                ]
            },
            preprocessors: {
                '**/*.ts': ['typescript']
            }
        };

        options.preprocessors[src_dir + '**/!(*.spec)+(.js)'] = ['coverage'];

        return options;
    }
};
