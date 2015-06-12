(function() {
    'use strict';

    angular.module('<%= projectName %>', [
        'templates-app',
        'templates-common',
        'ngAnimate',
        'ngSanitize',
        'blocks.exception',
        'blocks.logger',
        //'blocks.router',
        'ngplus',
        'ui.router.state',
        'ui.router',
        'ui.bootstrap',
        'ngMessages',
        'ngResource',
        '<%= projectName %>.app.home',
        '<%= projectName %>.app.about',
        '<%= projectName %>.app.index',
]).run(run);

    // Any code that needs to run when an application starts should be declared
    // in a factory, exposed via a function, and injected into the run block
    run.$inject = [/*'authenticator', 'translator'*/];

    /* @ngInject */
    function run(/* authenticator, translator */) {
        //authenticator.initialize();
        //translator.initialize();
    }
})();
