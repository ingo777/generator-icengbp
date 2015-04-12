///<reference path="<%= pathBackToRoot %>typings/angularjs/angular.d.ts"/>
///<reference path="<%= pathBackToRoot %>vendor/angular-ui-router/api/angular-ui-router.d.ts"/>
///<reference path="<%= folderAndFileName %>.srv.ts"/>

module <%= fullModuleName %>
{
    "use strict";

    export class <%= capitalModuleName %>Module
    {
        static $injector = ["$stateProvider", "$parse"];

            constructor(private $stateProvider: angular.ui.IStateProvider, $parse: angular.IParseProvider)
            {
                this.init();
            }

        private init(): void
        {

        }
    }
    angular.module("<%= fullModuleName %>", ["ui.router"])
        .config(["$stateProvider", ($stateProvider: angular.ui.IStateProvider, $parse: angular.IParseProvider) => {
            return new <%= capitalModuleName %>Module($stateProvider, $parse);
        }]);
}
