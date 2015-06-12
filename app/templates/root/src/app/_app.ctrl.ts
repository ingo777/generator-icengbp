///<reference path="../../typings/angularjs/angular.d.ts"/>
module <%= projectName %>.app {
    "use strict";

    export class AppController {
        vm = this;

        static $inject: Array<string> = [];

        /* @ngInject */
        constructor() {

        }

    }
    angular.module("<%= projectName %>")
        .controller("<%= projectName %>.app.AppController", AppController);
}

