"use strict";

app.controller('LoginController', [
    '$scope',
    '$location',
    'authService',
    'notifyService',
    function ($scope, $location, authService, notifyService) {
        $scope.login = function (userData) {
            authService.login(userData)
                .then(function (data) {
                    authService.setCurrentUserData();
                    notifyService.showInfo('Login Successfully');
                    $location.path('/');
                }, function (error) {
                    notifyService.showError('Login error!', error);
                });
        };
    }]);