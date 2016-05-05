"use strict";

app.controller('IssueDetailsController', [
    '$scope',
    '$routeParams',
    '$location',
    'authService',
    'projectService',
    'issueService',
    'commentService',
    'notifyService',
    'PAGE_SIZE',
    function ($scope, $routeParams, $location, authService, projectService, issueService, commentService, notifyService, PAGE_SIZE) {

        var issueId = $routeParams.id;

        if (isNaN(issueId)) {
            $location.path('/');
        }

        function loadIssueToView() {
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
                                    commentData = commentData.reverse();

                                    $scope.commentsParams = {
                                        pageNumber: 1,
                                        pageSize: 3,
                                        totalItem: commentData.length
                                    };

                                    $scope.reloadCommentsToView = function () {
                                        $scope.comments = commentData.slice(
                                            ($scope.commentsParams.pageNumber - 1) * $scope.commentsParams.pageSize,
                                            $scope.commentsParams.pageNumber * $scope.commentsParams.pageSize
                                        );
                                    };

                                    $scope.reloadCommentsToView();

                                }, function (error) {
                                    notifyService.showError('Cannot load comments', error);
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

        $scope.addComment = function (issueId, comment) {
            var data = {
                Text: comment
            };
            commentService.addCommentToIssue(issueId, data)
                .then(function (commentData) {
                    loadIssueToView();
                }, function (error) {
                    notifyService.showError('Cannot add comment to issue!', error);
                });
        };
    }
]);