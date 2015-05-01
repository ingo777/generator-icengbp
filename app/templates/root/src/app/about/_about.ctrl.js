(function() {
    'use strict';

    angular.module('<%= projectName %>.app.about')
        .controller('<%= projectName %>.app.about.AboutController', About);

    var AboutViewModel = {
        test: 'Test string from AboutViewModel'
    };

    /* @ngInject */
    function About() {
        var vm = this;

        // The top section of a controller should be lean and make it easy to see the "signature" of the controller
        // at a glance.  All function definitions should be contained lower down.
        vm.time = new Date().toTimeString();
        vm.someObject = AboutViewModel;

        init();

        /**
         * A definitive place to put everything that needs to run when the controller starts.
         * Avoid writing any code outside of this function that executes immediately.
         */
        function init() { }

        /**
         * Here comes the function definitions
         */
    }
})();
