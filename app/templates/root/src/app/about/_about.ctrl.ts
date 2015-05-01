///<reference path="../../../typings/angularjs/angular.d.ts"/>

module <%= projectName %>.app.about
{
    "use strict";

    export class AboutViewModel {
        test:string = "Test string from AboutViewModel";
    }

    /* @ngInject */
    export class AboutController {
        time:string;
        someObject:AboutViewModel;

        constructor() {
            this.time = new Date().toTimeString(); // Should not work to bind to view
            this.someObject = new AboutViewModel(); // Controller As syntax...preferred way

            this.init();
        }

        private init():void {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            // writing any code outside of this function that executes immediately.
        }
    }

    angular.module("<%= projectName %>.app.about")
        .controller("<%= projectName %>.app.about.AboutController", AboutController);
}
