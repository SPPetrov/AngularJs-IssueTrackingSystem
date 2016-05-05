"use strict";

app.directive('datePicker', [function () {
    return {
        restrict: 'A',
        link: function ($scope, element) {
            element.datepicker({dateFormat: 'dd-mm-yy'}).val();
        }
    }
}]);