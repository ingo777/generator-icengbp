(function(module) {
    'use strict';

    module.controller('<%= projectName %>.app.index.IndexController', function ($scope) {
        var indexViewModel = this;

        indexViewModel.testValue = 'Testing value!';

        init();

        function init() {

        }

        indexViewModel.test = function() {
            alert('Testing!');
        };
    });

}(angular.module('<%= projectName %>.app.index')));
