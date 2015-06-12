///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../vendor/angular-ui-router/api/angular-ui-router.d.ts"/>
module <%= projectName %>.app {
    "use strict";

    // Any code that needs to run when an application starts should be declared
    // in a factory, exposed via a function, and injected into the run block
    export class AppRun {
        foo:string;

        static $inject: Array<string> = [];
        //static $inject: Array<string> = ['authenticator', 'translator'];

        /* @ngInject */
        constructor(/* authenticator: IAuthenticator, translator: ITranslator */) {
            //authenticator.initialize();
            //translator.initialize();

            this.foo = "Yada";
        }
    }

    angular.module("<%= projectName %>", [
        "templates-app",
        "templates-common",
        "ui.router.state",
        "ui.router",
        "ui.bootstrap",
        "blocks.logger",
        "blocks.exception",
        "ngMessages",
        "ngResource",
        "<%= projectName %>.app.home",
        "<%= projectName %>.app.about",
        "<%= projectName %>.app.index",
]).run(() => {
        return new AppRun();
    });
}
