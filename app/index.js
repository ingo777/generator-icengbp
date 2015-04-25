'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

function isTestFile(file) {
    var specSuffix = '.spec.js';
    var isSpec = file.indexOf(specSuffix, file.length - specSuffix.length) !== -1;

    if (isSpec) {
        return true;
    }

    var testHelpersSuffix = 'test-helpers';
    var folder = path.dirname(file);
    var isTestHelpers = folder.indexOf(testHelpersSuffix, folder.length - testHelpersSuffix.length) !== -1;

    if (isTestHelpers) {
        return true;
    }

    return false;
}

var IceNgbpGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        // It's always something you need to answer during the installation of dependencies
        this.options['skip-install'] = true;

        this.on('end', function () {
            if (!this.options['skip-install']) {

                this.installDependencies({
                    callback: function () {
                        // Emit a new event - dependencies installed
                        this.emit('dependenciesInstalled');
                    }.bind(this)
                });
            }
            else {
                this.log(chalk.green(
                        '\nSoon you\'re good to go!!!!\n' +
                        'You need to run ') + chalk.cyan.bold("bower install") + chalk.green(' and ') + chalk.cyan.bold("npm install") +
                    chalk.green(' to get the dependencies.\n' +
                    'You might also need to get the typed definition files from the tsd.json file if you\'re using TypeScript.' +
                    'Simply running ') + chalk.cyan.bold("gulp serve-build") + chalk.green(' will do the following:\n' +
                    ' - Build everything (concat, create js templates of html, etc) and place it into a "build" folder\n' +
                    ' - Run all your tests\n' +
                    ' - Watch your files for changes to do the above without any intervention\n' +
                    ' - Launch express server to host your app at http://localhost:3000/index.html\n' +
                    ' - Setup Browser Sync so you immediately see changes in your browser\n')
                );
            }
        });

        // Now we can bind to the dependencies installed event
        this.on('dependenciesInstalled', function() {
            this.log(chalk.green(
                '\nSoon you\'re good to go!!!!\n' +
                'You need to run ') + chalk.cyan.bold("bower install") + chalk.green(' and ') + chalk.cyan.bold("npm install") +
                chalk.green(' to get the dependencies.\n' +
                'You might also need to get the typed definition files from the tsd.json file if you\'re using TypeScript.' +
                'Simply running ') + chalk.cyan.bold("gulp serve-build") + chalk.green(' will do the following:\n' +
                ' - Build everything (concat, create js templates of html, etc) and place it into a "build" folder\n' +
                ' - Run all your tests\n' +
                ' - Watch your files for changes to do the above without any intervention\n' +
                ' - Launch express server to host your app at http://localhost:3000/index.html\n' +
                ' - Setup Browser Sync so you immediately see changes in your browser\n')
            );
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        this.log(chalk.magenta('You\'re using the ngbp (AngularBoilerplate) generator, a best-practice boilerplate\n for any scale Angular project built on a highly modular, folder-by-feature structure.'));

        var prompts = [
            {
                name: 'projectName',
                message: 'What do you want to name your project?\n e.g. angular.module(\'exactlyWhatYouTypeBelow\', [])\n ?',
                default: 'myProject'
            },
            {
                name: 'author',
                message: 'What is the author or company name?\n Used for copyright\'s in html, banners in code, and author prop in package.json\n ?',
                default: 'Somebody Special'
            },
            {
                type: 'confirm',
                name: 'useTypeScript',
                message: 'Would you like to use TypeScript (YES default)?',
                default: true
            }
        ];

        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;
            this.author = props.author;
            this.useTypeScript = props.useTypeScript;

            done();
        }.bind(this));
    },

    config: function() {
        this.config.set('projectName', this.projectName);
        this.config.set('useTypeScript', this.useTypeScript);
        this.config.set('author', this.author);
        this.config.save();
    },

    _processDirectory: function (source, destination) {
        var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
        var files = this.expandFiles('**', { dot: true, cwd: root });
        var useTypeScript = this.config.get('useTypeScript');

        for (var i = 0; i < files.length; i++) {
            var f = files[i];
            var fExt = f.split('.').pop().toLowerCase();
            //var specSuffix = '.spec.js';
            //var isSpec = f.indexOf(specSuffix, f.length - specSuffix.length) !== -1;
            var isTest = isTestFile(f);
            var fIsSource = path.dirname(f).split('/').shift() == 'src';
            var isExcluded = false;

            if (fIsSource) {
                // Exclude if Typescript and it is a Javascript file AND it's not a spec file
                // (we run all tests in Javascript) or if we use Javascript and it's a Typescript file
                if ((useTypeScript && fExt == 'js' && !isTest) || (!useTypeScript && fExt == 'ts')) {
                    isExcluded = true;
                }
            }

            var src = path.join(root, f);
            if (!isExcluded) {
                if (path.basename(f).indexOf('_') == 0) {
                    var dest = path.join(destination, path.dirname(f), path.basename(f).replace(/^_/, ''));
                    this.template(src, dest);
                }
                else {
                    var dest = path.join(destination, f);
                    this.copy(src, dest);
                }
            }
        }
    },

    app: function () {
        this._processDirectory('root', '');
//        this.mkdir('app');
//        this.mkdir('app/templates');
//
//        this.copy('_package.json', 'package.json');
//        this.copy('_bower.json', 'bower.json');
    }

});

module.exports = IceNgbpGenerator;
