"use strict";

app.controller('LogoutController', [
    '$scope',
    '$location',
    'authService',
    'notifyService',
    function ($scope, $location, authService, notifyService) {
        authService.logout()
            .then(function (data) {
                notifyService.showInfo('Logout successfully');
                $location.path('/');
            }, function (error) {
                notifyService.showError('Logout failed', error);
            });
    }]);