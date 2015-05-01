/* global toastr:false, moment:false */
module <%= projectName %>.app {
    "use strict";

    declare var toastr: any;
    declare var moment: any;

    angular.module("<%= projectName %>")
        .constant("toastr", toastr)
        .constant("moment", moment);
}
