"use strict";

app.controller('ProjectAllController', [
    '$scope',
    'issueService',
    'projectService',
    'authService',
    'notifyService',
    'PAGE_SIZE',
    function ($scope, issueService, projectService, authService, notifyService, PAGE_SIZE) {
        authService.rejectNotAdminUser();

        $scope.projectsParams = {
            pageNumber: 1,
            pageSize: PAGE_SIZE
        };

        $scope.reloadProjectsToView = function () {
            projectService.getAllProjects($scope.projectsParams)
                .then(function (data) {
                    $scope.projects = data;
                    console.log(data);
                }, function (error) {
                    notifyService.showError('Cannot load projects', error);
                });
        };

        $scope.reloadProjectsToView();


    }


]);