"use strict";

app.controller('InfoProjectController', [
    '$scope',
    '$routeParams',
    'projectService',
    'issueService',
    'notifyService',
    'PAGE_SIZE',
    function ($scope, $routeParams, projectService, issueService, notifyService, PAGE_SIZE) {

        projectService.getProjectById($routeParams.id)
            .then(function (projectData) {
                projectData.PrioritiesToString = projectData.Priorities.map(function(priority) {return priority.Name;}).join(', ');
                projectData.LabelsToString = projectData.Labels.map(function(label) {return label.Name;}).join(', ');
                $scope.project = projectData;

                var currentProjectId = projectData.Id;

                $scope.issuesParams = {
                    pageNumber: 1,
                    pageSize: PAGE_SIZE
                };

                $scope.reloadIssuesProjectToView = function () {
                    issueService.getIssuesByProjectId(currentProjectId, $scope.issuesParams)
                        .then(function (data) {
                            $scope.issues = data;
                        }, function (error) {
                            notifyService.showError('Cannot load project issues', error);
                        });
                };

                $scope.reloadIssuesProjectToView();

            }, function (error) {
                notifyService.showError('Load project failed!', error);
            });

    }
]);