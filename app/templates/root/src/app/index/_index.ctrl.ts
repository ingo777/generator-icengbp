///<reference path="../../../typings/angularjs/angular.d.ts"/>

module <%= projectName %>.app.index
{
    "use strict";

    export interface IIndexController {
        year: number;
    }

    export class IndexController implements IIndexController {
        year: number;

        /* @ngInject */
        constructor() {
            this.year = new Date().getFullYear();

            this.init();
        }

        init(): void { }
    }
    angular.module("<%= projectName %>.app.index")
        .controller("<%= projectName %>.app.index.IndexController", IndexController);
}
