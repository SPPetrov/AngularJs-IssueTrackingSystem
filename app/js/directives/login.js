app.directive('login', function () {
    return{
        restrict: 'A',
        replace: true,
        templateUrl: 'templates/directives/login.html',
        controller: 'UserController.Login'
    }
});