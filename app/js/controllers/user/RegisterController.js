"use strict";

app.controller('RegisterController',[
    '$scope',
    '$location',
    'authService',
    'notifyService',
    function ($scope, $location, authService, notifyService) {
        $scope.register = function (userData) {
            authService.register(userData)
                .then(function (response) {
                    notifyService.showInfo('Register successfully');
                    userData.username = userData.email;
                    delete userData.email;

                    authService.login(userData)
                        .then(function (response) {
                            authService.setCurrentUserData();
                            $location.path('/');
                        });
                },function (error) {
                    notifyService.showError('Register error', error);
                });
        };
    }]);

