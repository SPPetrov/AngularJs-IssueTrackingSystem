"use strict";

app.controller('ChangePasswordController',[
    '$scope',
    '$location',
    'userService',
    'notifyService',
    function ($scope, $location, userService, notifyService) {
        $scope.changePassword = function (userData) {
            userService.changePassword(userData)
                .then(function (data) {
                    $location.path('/');
                    notifyService.showInfo('Change password successfully!');
                }, function (error) {
                    notifyService.showError('Change password failed!', error);
                });
        };
    }
]);
