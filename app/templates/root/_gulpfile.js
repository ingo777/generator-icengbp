var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    args        = require('yargs').argv, // Get gulp commandline arguments
    $           = require('gulp-load-plugins')({ lazy: true, camelize: true }),// Load all gulp-{plugin} plugins automatically
    stylish     = require('jshint-stylish'), // Get a nice output from jshint
    merge       = require('merge-stream'),
    del         = require('del'), // Delete files or folders
    fs          = require('fs'),
    streamqueue = require('streamqueue'),
    http        = require('http'), // Used for the basic web server used when loading the app in the browser
    ecstatic    = require('ecstatic'),
    runSequence = require('run-sequence'); // Run tasks in a specific sequence
    lodash      = require('lodash');
    path        = require('path');

var config      = require('./gulp.config.js')(), // Load the config object
    pkg         = require('./package.json'); // Load the NPM package file

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('install', function(cb) {
    $.run('npm install').exec('', function(){
        $.run('tsd reinstall -so').exec('', function(){
            $.run('bower install').exec('', cb);
        });
    });
});

gulp.task('jshint', function() {
    log('Analyzing JavsScript JSHint and JSCS');
    var files = [].concat(config.files.alljs,
        // Don't run JSCS or JSHint on generated template files
        '!**/templates-*.js',
        // Don't run JSCS or JSHint on 3:rd party assets
        '!' + config.folders.src + config.folders.assets + '**/*.js');

    return gulp.src(files)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish, { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('tslint', function() {
    log('Analyzing TypeScript with TSLint');
    return gulp.src(config.files.allts)
        .pipe($.tslint())
        .pipe($.tslint.report('verbose', {emitError: false}));
});

gulp.task('jsonlint', function() {
    log('Analyzing JSON with JSONLint');
    return gulp.src(config.files.alljson)
        .pipe($.jsonlint())
        .pipe($.jsonlint.reporter());
});

gulp.task('analyze-code', ['jshint', 'tslint', 'jsonlint'], function() {
});

gulp.task('less', ['clean-styles'], function() {
    log('Compiling Less --> CSS');
    return gulp.src(config.files.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 versions', '> 5%']}))
        .pipe($.rename(function (path) {
            path.basename = config.files.css;
        }))
        .pipe(gulp.dest(config.folders.temp));
});

gulp.task('sass', ['clean-styles'], function () {
    log('Compiling Sass --> CSS');
    return gulp.src(config.files.scss)
        .pipe($.plumber())
        .pipe($.rubySass({ noCache: true }))
        .pipe($.rename(function (path) {
            path.basename = config.files.css;
        }))
        .pipe(gulp.dest(config.folders.temp));
});

gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts');
    return gulp.src(config.files.vendor.fonts)
        .pipe(gulp.dest(config.folders.build + config.folders.fonts));
});

gulp.task('images', ['clean-images'], function() {
    log('Copying images');
    return gulp.src(config.files.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.folders.build + config.folders.images));
});

gulp.task('clean', function(done) {
    var delconfig = [].concat(config.folders.build, config.folders.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

gulp.task('clean-fonts', function(done) {
    log('Cleaning fonts');
    clean(config.folders.build + config.files.fonts, done);
});

gulp.task('clean-images', function(done) {
    log('Cleaning images');
    clean(config.folders.build + config.files.images, done);
});

gulp.task('clean-styles', function(done) {
    log('Cleaning styles');
    var files = [].concat(
        config.folders.temp + '**/*.css',
        config.folders.build + 'styles/**/*.css'
    );
    clean(files, done);
});

gulp.task('clean-code', function(done) {
    log('Cleaning code');
    var files = [].concat(
        config.folders.temp + '**/*.js',
        config.folders.temp + '**/*.html',
        config.folders.root + config.files.index_html,
        config.folders.root + config.specRunnerFile,
        config.folders.build + '**/*.html',
        config.folders.build + 'js/**/*.js',
        config.folders.build + '**/*.map'
    );
    clean(files, done);
});

gulp.task('typescript', ['tslint'], function() {
    log('Compiling TypeScript');
    var tsResult = gulp.src(config.files.allts)
        .pipe($.sourcemaps.init())
        .pipe($.typescript({
            target: 'ES5',
            declarationFiles: true,
            noExternalResolve: false,
            noImplicitAny: true,
            module: 'amd'
        }));

    tsResult.dts.pipe(gulp.dest(config.folders.src));

    return tsResult.js
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.folders.src));
});

gulp.task('svgstore', function() {
    log('Compiling SVG');
    var svgs = gulp.src(config.files.svg)
        .pipe($.svgstore({ prefix: pkg.name + '-', inlineSvg: true }));
    var fileContents = function(filePath, file) {
        return file.contents.toString('utf8');
    };

    return gulp.src(config.folders.src + config.files.index_html, {read: false})
        .pipe($.inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest(config.folders.src));
});

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function() {
    var msg = 'Bumping versions';
    var type = args.type;
    var version = args.version;
    var options = {};

    if (version) {
        options.version = version;
        msg += ' to ' + version;
    }
    else {
        options.type = type;
        msg += ' for a ' + type;
    }

    log(msg);

    return gulp.src(config.packages)
        .pipe($.bump(options))
        .pipe($.print())
        .pipe(gulp.dest(config.folders.root))

});

gulp.task('build', ['optimize', 'fonts', 'images'], function() {
    log('Building everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running gulp serve-build'
    };

    del(config.folders.temp);
    log(msg);
    notify(msg);
});

gulp.task('serve-specs', ['build-specs'], function(done) {
    log('Run the spec runner');

    startBrowserSync(true /* isDev */, true /* specRunner */);
    done();
});

gulp.task('build-specs', ['templatecache'], function() {
    log('Building the spec runner');

    // If we want to use Wiredep
    var wiredep = require('wiredep');
    var options = config.getWiredepDefaultOptions();
    options.devDependencies = true;

    return gulp.src(config.specRunner)
        .pipe($.plumber())
        //.pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.files.vendor.js),
            {name: 'inject:vendor', read: false}))
        .pipe($.inject(gulp.src(config.files.test.js),
            {name: 'inject:test', read: false}))
        .pipe($.inject(gulp.src(config.testlibraries),
            {name: 'inject:testlibraries', read: false}))
        .pipe($.inject(gulp.src(config.files.appjs)))
        .pipe($.inject(gulp.src(config.specHelpers),
            {name: 'inject:spechelpers', read: false}))
        .pipe($.inject(gulp.src(config.specs),
            {name: 'inject:specs', read: false}))
        .pipe($.inject(gulp.src(config.files.templates),
            {name: 'inject:templates', read: false}))
        .pipe($.inject(gulp.src(config.files.assets.js, {read:false}),
            {name: 'inject:assets'}))
        .pipe(gulp.dest(config.folders.root));
});

gulp.task('optimize', ['inject-build', 'test'], function() {
    log('Optimize javascript, html and css');

    var assets = $.useref.assets({searchPath: './'});
    var cssFilter = $.filter('**/*.css');
    var jsLibFilter = $.filter('**/' + config.files.optimized.lib);
    var jsAppFilter = $.filter('**/' + config.files.optimized.app);

    // Here we will minify, annotate and hash the file names
    // We will use the index.html file in the build folder that
    // the 'inject-build' task created before this task
    return gulp.src(config.folders.build + 'index.html')
        .pipe($.plumber())
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())                         // Optimize CSS
        .pipe(cssFilter.restore())              // Restore it to the pipeline
        .pipe(jsLibFilter)
        .pipe($.uglify())                       // Minify all the 3:d party Javascript in the filter
        .pipe(jsLibFilter.restore())            // Restore it to the pipeline
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate())                   // Annotate Angular Dependecy Injection so it will work when minified
        .pipe($.uglify())                       // Minify all our Javascript files according to the filter
        .pipe(jsAppFilter.restore())            // Restore it to the pipeline
        .pipe($.rev())                          // Rename the file names of the minified files with a hash
        .pipe(assets.restore())                 // Restore it to the pipeline
        .pipe($.useref())                       // Update index.html with the minified file names
        .pipe($.revReplace())                   // Alter index.html to point to the hashed file
        .pipe(gulp.dest(config.folders.build))
        .pipe($.rev.manifest())                 // Write a manifest file which original file responds to which hashed file
        .pipe(gulp.dest(config.folders.build)); // Write the manifest file to the build folder
});

gulp.task('templatecache', ['clean-code'], function() {
    log('Creating AngularJS $templateCache');

    createDummyTemplateFiles();

    var templates = [
        { files: config.files.app_templates, type: 'app'},
        { files: config.files.common_templates, type: 'common'}
    ];

    return templates.map(function(template) {
        var options = {
            module: 'templates-' + template.type,
            standalone: true,
            root: '.'
        };

        return gulp.src(template.files)
            .pipe($.minifyHtml({
                empty: true,
                loose: true
            }))
            .pipe($.angularTemplatecache(
                'templates-' + template.type + '.js',
                options
            ))
            .pipe(gulp.dest(config.folders.temp));
    });
});

gulp.task('wiredep', ['templatecache'], function() {
    log('Running wiredep');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp.src(config.folders.src + config.files.index_html)
        .pipe($.plumber())
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.files.appjs, {read: false})))
        .pipe(gulp.dest(config.folders.src));
});

gulp.task('inject-build', ['less', 'typescript', 'templatecache'], function() {
    return injectTask(config.folders.build, false);
});

gulp.task('inject-dev', ['less', 'typescript'], function() {
    createDummyTemplateFiles();

    // We will put the injected index.html file in the root
    // so we don't accidentally fill the original index.html
    // in the src folder with, for example, null if we
    // change the build process
    return injectTask(config.folders.root, true);
});

gulp.task('serve-dev', ['inject-dev', 'typescript'], function() {
    startBrowserSync(true /* isDev */, false /* specRunner */);
});

gulp.task('serve-build', ['build'], function() {
    startBrowserSync(false /* isDev */, false /* specRunner */);
});

gulp.task('less-watch', ['less'], browserSync.reload);
gulp.task('js-watch', ['jshint'], browserSync.reload);
gulp.task('typescript-watch', ['tslint', 'typescript'], browserSync.reload);
gulp.task('templatecache-watch', ['templatecache'], browserSync.reload);
gulp.task('inject-watch', ['inject-dev'], browserSync.reload);
gulp.task('svgstore-watch', ['svgstore'], browserSync.reload);

gulp.task('test', ['analyze-code', 'templatecache'], function(done) {
    startTests(true /* singleRun */, done);
});

gulp.task('autotest', ['analyze-code', 'templatecache'], function(done) {
    startTests(false /* singleRun */, done);
});

//////////////////////////////////////////////////////////
function injectTask(dest) {
    log('Wire up the app css and javascript into the html');

    return gulp.src(config.folders.src + config.files.index_html)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(config.files.templates),
            {name: 'inject:templates', read: false}))
        .pipe($.inject(gulp.src(config.folders.temp + config.files.css + '.css', {read:false})))
        .pipe($.inject(gulp.src(config.files.appjs, {read:false})))
        .pipe($.inject(gulp.src(config.files.vendor.js, {read:false}),
            {name: 'inject:vendor'}))
        .pipe($.inject(gulp.src(config.files.assets.js, {read:false}),
            {name: 'inject:assets'}))
        .pipe($.inject(gulp.src(config.files.vendor.css, {read:false}),
            {name: 'inject:vendor'}))
        .pipe(gulp.dest(dest));
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.folders.src + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        icon: path.join(__dirname, 'gulp.png')
    };
    lodash.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}

function addWatches() {
    gulp.watch([config.files.allless], ['less-watch'])
        .on('change', function(event) { changeEvent(event); });
    gulp.watch([config.files.alljs], ['js-watch'])
        .on('change', function(event) { changeEvent(event); });
    gulp.watch([config.files.appts], ['typescript-watch'])
        .on('change', function(event) { changeEvent(event); });
    gulp.watch([config.folders.root + config.files.index_html, config.files.gulp], ['inject-watch'])
        .on('change', function(event) { changeEvent(event); });
    gulp.watch([config.files.svg], ['svgstore-watch'])
        .on('change', function(event) { changeEvent(event); });
}

function startBrowserSync(isDev, specRunner) {
    var port = args.port ? args.port : config.server.defaultPort;

    log('Starting browser-sync on port ' + port);

    if (args.nosync || browserSync.active) {
        log('startBrowserSync: args.nosync || browserSync.active');
        return;
    }

    var options = {
        server: {
            baseDir: './'
        },
        startPath: isDev ? config.folders.root + config.files.index_html :
            config.folders.build + config.files.index_html,
        port: 3000,
        files: isDev ? [
            config.folders.src + '**/*.*',
            '!' + config.files.allless,
            config.folders.temp + '**/*.css'
        ] : [],
        ghostmode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    if (specRunner) {
        options.startPath = config.folders.root + config.specRunnerFile;
    }

    browserSync(options);

    // Only add watches if we're in dev mode
    if (isDev) {
        addWatches();
    }
}

function startTests(singleRun, done) {
    var karma = require('karma').server;
    var excludeFiles = [];
    var serverSpecs = config.serverIntegrationSpecs;

    excludeFiles = serverSpecs;

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    function karmaCompleted(karmaResult) {
        log('Karma completed');

        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        }
        else {
            done();
        }
    }
}

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}

/**
 * Used to create a templates-common.js file with an empty module
 * in case nothing exists in the common directory. This is a
 * workaround in the Gulp build process.
 */
function createDummyTemplateFiles() {
    try {
        if (!fs.existsSync(config.folders.temp)){
            fs.mkdirSync(config.folders.temp);
        }

        fs.writeFile(config.folders.temp + config.files.templates_common_js,
            'angular.module(\'templates-common\', []);',
            function(err) {
                if (err) {
                    return log('Failed to create file ' + config.folders.temp + config.files.templates_common_js + '. ' + err);
                }
            }
        );

        fs.writeFile(config.folders.temp + config.files.templates_app_js,
            'angular.module(\'templates-app\', []);',
            function(err) {
                if (err) {
                    return log('Failed to create file ' + config.folders.temp + config.files.templates_app_js + '. ' + err);
                }
            }
        );
    }
    catch (err) {
        return  log('Cannot create file. ' + err);
    }
}
