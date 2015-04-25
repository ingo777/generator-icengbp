(function (module) {
    'use strict';

    module.controller('<%= fullModuleName %>.<%= capitalModuleName %>Controller', function () {
        var <%= camelModuleName %> = this;

        init();

        function init() {

        }
    });

}(angular.module('<%= fullModuleName %>')));
