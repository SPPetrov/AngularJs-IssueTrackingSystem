"use strict";

app.controller('LoginController', [
    '$scope',
    '$location',
    'userService',
    'authService',
    'notifyService',
    function ($scope, $location, userService, authService, notifyService) {

        $scope.login = function (userData) {
            userService.login(userData)
                .then(function (data) {
                    authService.setCurrentUserData();
                    notifyService.showInfo('Login Successfully');
                    $location.path('/');
                }, function (error) {
                    notifyService.showError('Login error!', error);
                });
        };
    }]);