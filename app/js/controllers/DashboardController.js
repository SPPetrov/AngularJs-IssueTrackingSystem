"use strict";

app.controller('DashboardController', [
    '$scope',
    '$location',
    '$route',
    'issueService',
    'notifyService',
    'authService',
    'PAGE_SIZE',
    function ($scope, $location, $route, issueService, notifyService, authService, PAGE_SIZE) {

        $scope.issuesParams = {
            pageNumber: 1,
            pageSize: PAGE_SIZE
        };

        $scope.reloadIssuesToView = function () {
            issueService.getMyIssues($scope.issuesParams)
                .then(function (data) {
                    $scope.issues = data;
                    console.log(data);
                }, function (error) {
                    notifyService.showError('Cannot load issues', error);
                });
        };

        $scope.reloadIssuesToView();
        




    }


]);