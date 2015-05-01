///<reference path="../../../typings/angularjs/angular.d.ts"/>

module <%= projectName %>.app.index
{
    "use strict";

    export class IndexViewModel {
        testValue: string = "Testing value!";

        test(): void {
            alert("Testing!");
        }
    }

    export class IndexController {
        indexViewModel = new IndexViewModel();

        constructor() {

        }

        init() : void {

        }
    }
    angular.module("<%= projectName %>.app.index")
        .controller("<%= projectName %>.app.index.IndexController", IndexController);
}
