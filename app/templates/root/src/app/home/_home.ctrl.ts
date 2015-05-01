///<reference path="../../../typings/angularjs/angular.d.ts"/>

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
module <%= projectName %>.app.home
{
    "use strict";

    export class HomeViewModel {
        someVar:string = "blue";
        someList:Array<string> = ["one", "two", "three"];

        someFunctionUsedByTheHomePage():void {
            alert("Congratulations");
        }
    }

    export class HomeController {
        someObject:HomeViewModel;

        static $inject = ["logger"];

        constructor(private logger: any) {
            logger.info("Navigated to Home");

            this.someObject = new HomeViewModel(); // Controller As syntax...preferred way

            this.init();
        }

        /**
         * A definitive place to put everything that needs to run when the controller starts.
         * Avoid writing any code outside of this function that executes immediately.
         */
        private init():void { }
    }

    angular.module("<%= projectName %>.app.home")
        .controller("<%= projectName %>.app.home.HomeController", HomeController);
}
