"use strict";

app.controller('MainController', [
    '$scope',
    'authService',
    '$location',
    'notifyService',
    function ($scope, authService, $location, notifyService) {
        $scope.authService = authService;

        var currentUsername = authService.getCurrentUser().username;
        if (currentUsername) {
            $scope.user = currentUsername;
        }

        $scope.logout = function () {
            authService.logout();

            $location.path('/');

        };
    }]);