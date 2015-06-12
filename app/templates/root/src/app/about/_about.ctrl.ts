///<reference path="../../../typings/angularjs/angular.d.ts"/>

module <%= projectName %>.app.about {
    "use strict";

    // The top section of a controller should be lean and make it easy to see the "signature" of the controller
    // at a glance.  All function definitions should be contained lower down.
    export interface IAboutController {
        time: string;
        test(): void;
    }

    export interface ISomeClass {
        someVariable: string;
        someFunction(): void;
    }

    /**
     * Here comes the implementations
     */
    export class SomeClass implements ISomeClass {
        someVariable: string = "Test string";
        someFunction(): void {
            this.someVariable = "Updated string";
        }
    }

    export class AboutController implements IAboutController {
        // Here we declare the variables for the class
        public time: string;
        private someObject: SomeClass;

        static $inject: Array<string> = [];

        /**
         * Constructor to initialize everything
         */
        /* @ngInject */
        constructor() {
            this.time = new Date().toTimeString(); // Should not work to bind to view
            this.someObject = new SomeClass(); // Controller As syntax...preferred way

            this.init();
        }

        /**
         * A definitive place to put everything that needs to run when the controller starts. Avoid
         * writing any code outside of this function that executes immediately.
         */
        private init():void { }

        /**
         * Here are the functions for this class
         */
        public test(): void {
            this.time = new Date().toTimeString();
        }
    }

    angular.module("<%= projectName %>.app.about")
        .controller("<%= projectName %>.app.about.AboutController", AboutController);
}
