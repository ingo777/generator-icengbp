/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * 'src/app/home', however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a 'note' section could have the submodules 'note.create',
 * 'note.delete', 'note.edit', etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 */
(function() {
    'use strict';

    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    // Let each module grow organically, adding appropriate organization and sub-folders as needed.
    angular.module('<%= projectName %>.app.home')
        .controller('<%= projectName %>.app.home.HomeController', Home);

    var HomeViewModel = {
        someVar: 'blue',
        someList: ['one', 'two', 'three'],

        someFunctionUsedByTheHomePage: congrats
    };

    function congrats() {
        alert('Congratulations');
    }

    /* @ngInject */
    function Home() {
        var vm = this;

        // The top section of a controller should be lean and make it easy to see the "signature" of the controller
        // at a glance.  All function definitions should be contained lower down.
        vm.someObject = HomeViewModel;

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
    // The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
})();
