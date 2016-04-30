"use strict";

app.controller('InfoIssueController', [
    '$scope',
    '$routeParams',
    'projectService',
    'issueService',
    'notifyService',
    'PAGE_SIZE',
    function ($scope, $routeParams, projectService, issueService, notifyService, PAGE_SIZE) {


        function loadIssueToView () {
            issueService.getIssueById($routeParams.id)
                .then(function (issueData) {
                    issueData.LabelsToString = issueData.Labels.map(function (label) {
                        return label.Name;
                    }).join(', ');

                    var currentProjectId = issueData.Project.Id;

                    projectService.getProjectById(currentProjectId)
                        .then(function (projectData) {
                            issueData.issueProjectLeaderId = projectData.Lead.Id;
                            $scope.issue = issueData;
                        }, function (error) {
                            notifyService.showError('Cannot load project info for this issue', error);
                        });


                }, function (error) {
                    notifyService.showError('Load issue failed!', error);
                });
        }

        loadIssueToView();

        $scope.changeIssueStatus = function (issueId, statusId) {
            issueService.changeStatusIssue(issueId, statusId)
                .then(function (statusData) {
                    $scope.issue.AvailableStatuses = statusData;
                    loadIssueToView();
                }, function (error) {
                    notifyService.showError('Cannot change status', error);
                });
        };



    }
]);