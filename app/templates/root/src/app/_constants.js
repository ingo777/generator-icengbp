/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular.module('<%= projectName %>')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
