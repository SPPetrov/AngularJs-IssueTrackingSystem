"use strict";

app.directive('setInitialsKey', [
    '$parse',
    '$filter',
    function($parse, $filter) {
        return  {
            restrict: 'A',
            link: function(scope, element, attrs){

                element.bind("change", function (event) {
                    var projectKey = $filter('initialsKey')( event.target.value);
                    var getValueFromAttr = $parse(attrs.setInitialsKey);
                    getValueFromAttr.assign(scope, projectKey);
                    scope.$apply();
                });
            }
        };
}]);