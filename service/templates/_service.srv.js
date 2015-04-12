(function(module) {
    'use strict';

    module.factory('<%= camelModuleName %>', function () {
        var noOfTests = 0;

        return {
            test: 'Never tested',
            testing: function() {
                this.test = 'Tested ' + (++noOfTests) + '' times!'';
            }
        };
    });

}(angular.module('<%= fullModuleName %>')));
