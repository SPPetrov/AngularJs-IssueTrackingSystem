"use strict";

app.controller('MainController', [
    '$scope',
    'authService',
    '$location',
    'notifyService',
    function ($scope, authService, $location, notifyService) {
        $scope.authService = authService;

        $scope.logout = function () {
            authService.logout();

            $location.path('/');

        };
    }]);