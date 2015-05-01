///<reference path="../../typings/angularjs/angular.d.ts"/>
module <%= projectName %>.app
{
    "use strict";

    export class AppController {
        static $inject = ["$scope"];
        vm = this;

        constructor($scope:angular.IScope) {

        }

    }
    angular.module("<%= projectName %>")
        .controller("<%= projectName %>.app.AppController", AppController);
}

