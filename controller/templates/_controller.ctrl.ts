/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * 'src/app/home', however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a 'note' section could have the submodules 'note.create',
 * 'note.delete', 'note.edit', etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 */
///<reference path="<%= pathBackToRoot %>typings/angularjs/angular.d.ts"/>

module <%= fullModuleName %> {
    "use strict";

    export interface I<%= capitalModuleName %>Controller {
        testText: string;
        testFunction(): void;
    }

    /* @ngInject */
    export class <%= capitalModuleName %>Controller implements I<%= capitalModuleName %>Controller {
        testText: string;

        static $inject: Array<string> = [];
        //static $inject: Array<string> = ["service1"];

        /**
         * Constructor to initialize everything
         */
        /* @ngInject */
        constructor(/*service1: <%= camelModuleName %>.common.services.service1.IService1*/) {
            this.testText = "Test text";

            this.init();
        }

        /**
         * A definitive place to put everything that needs to run when the controller starts.
         * Avoid writing any code outside of this function that executes immediately like
         * loading initial data, setting everything up, etc.
         * NOTE: If you need to conditionally cancel the route before you start use the controller
         * or you need to have some data BEFORE the controller starts, then you should use a route
         * resolve instead (see the <%= camelModuleName %>.module.js file for a simple example
         */
        private init(): void {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            // writing any code outside of this function that executes immediately.
        }

        /**
         * Here are the functions for this class
         */
        testFunction(): void {
            this.testText = "New test text";
        }
    }

    angular.module("<%= fullModuleName %>")
        .controller("<%= fullModuleName %>.<%= capitalModuleName %>Controller", <%= capitalModuleName %>Controller);
}
