"use strict";

app.controller('MainController', [
    '$scope',
    'authService',
    function ($scope, authService) {
        $scope.authService = authService;
    }]);