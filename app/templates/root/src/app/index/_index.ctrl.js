(function(module) {
    'use strict';

    module.controller('<%= projectName %>.app.index.IndexController', Index);

    /* @ngInject */
    function Index() {
        var vm = this;
        var date = new Date();

        // The top section of a controller should be lean and make it easy to see the "signature" of the controller
        //  at a glance.  All function definitions should be contained lower down.
        vm.testValue = 'Testing value!';
        vm.year = date.getFullYear();
        vm.test = test;

        init();

        /**
         * A definitive place to put everything that needs to run when the controller starts.
         * Avoid writing any code outside of this function that executes immediately.
         */
        function init() { }

        /**
         * Here comes the function definitions
         */
        function test() {
            alert('Testing!');
        }
    }

}(angular.module('<%= projectName %>.app.index')));
