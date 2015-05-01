(function () {
    'use strict';

    angular.module('<%= fullModuleName %>')
        .controller('<%= fullModuleName %>.<%= capitalModuleName %>Controller', <%= capitalModuleName %>);

    <%= capitalModuleName %>.$inject = ['$location'];

    /* @ngInject */
    function <%= capitalModuleName %>($location) {
        var vm = this;

        // The top section of a controller should be lean and make it easy to see the "signature" of the controller
        // at a glance.  All function definitions should be contained lower down.

        // Call the initialize function for the controller
        init();

        /**
         * A definitive place to put everything that needs to run when the controller starts.
         * Avoid writing any code outside of this function that executes immediately like
         * loading initial data, setting everything up, etc.
         * NOTE: If you need to conditionally cancel the route before you start use the controller
         * or you need to have some data BEFORE the controller starts, then you should use a route
         * resolve instead (see the <%= camelModuleName %>.module.js file for a simple example
         */
        function init() { }

        /**
         * Here comes the function definitions
         */
    }

})();
