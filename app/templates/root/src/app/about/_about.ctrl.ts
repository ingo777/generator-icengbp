///<reference path="../../../typings/angularjs/angular.d.ts"/>

module <%= projectName %>.app.about
{
    "use strict";

    export interface IAboutScope extends angular.IScope {
        foobar: string;
    }

    export class AboutViewModel {
        test:string = "Test string from AboutViewModel";
    }

    export class AboutController {
        static $injector = ["$scope"];
        time:string;
        someObject:AboutViewModel;

        constructor(private $scope:IAboutScope) {
            this.time = new Date().toTimeString(); // Should not work to bind to view
            this.someObject = new AboutViewModel(); // Controller As syntax...preferred way

            this.init();
        }

        private init():void {
            this.$scope.foobar = "Yada yada";

            // A definitive place to put everything that needs to run when the controller starts. Avoid
            // writing any code outside of this function that executes immediately.
        }
    }

    angular.module("<%= projectName %>.app.about")
        .controller("<%= projectName %>.app.about.AboutController", AboutController);
}
