"use strict";

app.controller('RegisterController', [
    '$scope',
    '$location',
    'authService',
    'userService',
    'notifyService',
    function ($scope, $location, authService, userService, notifyService) {
        $scope.register = function (userData) {
            userService.register(userData)
                .then(function (data) {
                    notifyService.showInfo('Register successfully');
                    userData.username = userData.email;
                    delete userData.email;

                    userService.login(userData)
                        .then(function (data) {
                            authService.setCurrentUserData();
                            $location.path('/');

                        });
                }, function (error) {
                    notifyService.showError('Register error', error);
                });
        };
    }]);

