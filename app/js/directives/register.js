app.directive('register', function () {
    return{
        restrict: 'A',
        replace: true,
        templateUrl: 'templates/directives/register.html',
        controller: 'RegisterController'
    };
});