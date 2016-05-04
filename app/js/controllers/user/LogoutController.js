"use strict";

app.controller('LogoutController', [
    '$scope',
    '$location',
    'userService',
    'notifyService',
    function ($scope, $location, userService, notifyService) {

        userService.logout()
            .then(function (data) {
                notifyService.showInfo('Logout successfully');
                $location.path('/');
            }, function (error) {
                notifyService.showError('Logout failed', error);
            });
    }]);