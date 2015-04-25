///<reference path="<%= pathBackToRoot %>typings/angularjs/angular.d.ts"/>
///<reference path="<%= pathBackToRoot %>vendor/angular-ui-router/api/angular-ui-router.d.ts"/>
///<reference path="<%= folderAndFileName %>.srv.ts"/>

module <%= fullModuleName %>
{
    "use strict";

    export class <%= capitalModuleName %>Module
    {
        static $injector /* angular.auto.IInjectorService */ = [];

        constructor()
        {
            this.init();
        }

        private init(): void
        {

        }
    }
    angular.module("<%= fullModuleName %>", [])
        .config(() => {
            return new <%= capitalModuleName %>Module();
        });
}
