# generator-icengbp

> Yeoman Generator based on the popular ngBoilerplate AngularJS kickstarter. ngBoilerplate is a best-practice boilerplate for scalable Angular projects built on a highly modular, folder-by-feature structure.  You work in vertical slices on a daily basis (view, controller, service, etc), so why not organize your projects to optimize your workflow, maximize discoverability, and get copy-paste module reuse for free?
> This generator is in turn based on the great generator-ngbp from where all the basic code has its origin.

## Latest Updates
(03/28/15) Have done a lot to this generator including:
* Removed CoffeeScript support
* Added TypeScript support
* Added support for nested module names
* Added support for creating controllers, services and directives
* Added some example code as a starter (could be more verbose...pull requests are welcome)
* Added some automation for typescript in the gruntfile to support automatic builds
* Added support for having different file and folder structure than the module/controller/directive/service names.
  This support was added to enable teams to have their own file and folder structure (like hyphen based or
  camel case based structures)
* Replaced the "module" sub generator with "controller"

## Todo
* Fix tests for TypeScript. I havn't been able to fix that yet.
* I would like to add Gulp support for the build process.
* Enable automatic download of typed definition files for TypeScript (it works but because of some 
  breaking changes in the angular.d.ts file resently where ng was renamed to angular you have to 
  make som manual changes everytime they get updated. Check the gruntfile.js for enabling it again, 
  I just commented out the task in the build task)

## Quick Start
Install generator-icengbp from npm, run:

```
$ npm install -g generator-icengbp
```

Create a new directory for your project and cd into it:

```
$ mkdir my-new-project
$ cd my-new-project
```

Initiate the generator:

```
$ yo icengbp
```

### Sub-Generators
    icengbp:controller
    icengbp:service
    icengbp:directive

To create a new module...

```
$ yo icengbp:controller "controllerName"
$ yo icengbp:service "serviceName"
$ yo icengbp:directive "directiveName"

```

You can specify the root folder of the module via prompt - default is "app". DON'T include the controller/service/directive name in this path

You have to authorize the overwrite of app.js when the subgenerator adds a dependency for your new module (the default is Y, so you can just hit enter at the prompt).
There's also still a bug with grunt watch that doesn't always see new files in new folders - https://github.com/gruntjs/grunt-contrib-watch/issues/70. Stopping and
re-running grunt watch will always work though.

### ngBoilerplate Tips

When adding bower modules, always install with
```
$ bower install some-bower-module --save-dev
```
Then manually edit the vendor_files.js variable in Gruntfile.js to add the full path to the js files you need from the vendor folder.
This grunt variable is what is used to create the script tags in the header of your index.html in the build folder (dev site).
When you run "grunt compile", this same variable is used to add the vendor files to the single, minified js file in the bin folder (prod site).

### More Info

To learn more about ngBoilerplate, [click here](https://github.com/ngbp/ngbp)



## License

MIT
