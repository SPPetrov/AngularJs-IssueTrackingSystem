"use strict";

app.controller('InfoIssueController', [
    '$scope',
    '$routeParams',
    'projectService',
    'issueService',
    'commentService',
    'notifyService',
    'PAGE_SIZE',
    function ($scope, $routeParams, projectService, issueService, commentService, notifyService, PAGE_SIZE) {


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

                            var currentIssueId = issueData.Id;

                            commentService.getCommentsById(currentIssueId)
                                .then(function (commentData) {
                                    console.log(commentData);
                                    $scope.comments = commentData;
                                }, function (error) {
                                    notifyService.showError('Cannot load comments');
                                });

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