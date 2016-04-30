"use strict";

app.controller('InfoProjectController', [
    '$scope',
    '$routeParams',
    'projectService',
    'issueService',
    'notifyService',
    function ($scope, $routeParams, projectService, issueService, notifyService) {

        projectService.getProjectById($routeParams.id)
            .then(function (projectData) {
                $scope.project = projectData;
                issueService.getIssuesByProjectId(projectData.Id)
                    .then(function (issuesData) {
                        console.log(issuesData);
                        $scope.issues = issuesData;



                    }, function (error) {
                        notifyService.showError('Load issues failed!', error);
                    });

            }, function (error) {
                notifyService.showError('Load project failed!', error);
            });

    }
]);