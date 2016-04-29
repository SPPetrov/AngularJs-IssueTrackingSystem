app.directive('dashboard', function () {
    return{
        restrict: 'A',
        replace: true,
        templateUrl: 'templates/directives/dashboard.html',
        controller: 'DashboardController'
    };
});