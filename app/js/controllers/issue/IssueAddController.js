"use strict";

app.controller('IssueAddController', [
    '$scope',
    '$routeParams',
    '$location',
    'projectService',
    'issueService',
    'userService',
    'authService',
    'labelService',
    'notifyService',
    function ($scope, $routeParams, $location, projectService, issueService, userService, authService, labelService, notifyService) {
        var projectId = $routeParams.id;

        projectService.getProjectById(projectId)
            .then(function (data) {

                if ((authService.getCurrentUserData().id != data.Lead.Id) && (!authService.isAdmin())) {
                    $location.path('/');
                }

                $scope.project = data;
            }, function (error) {
                notifyService.showError('Load project data failed', error);
            });

        userService.getAllUsers()
            .then(function (data) {
                $scope.users = data;
            }, function (error) {
                notifyService.showError('Load users data failed', error);
            });

        labelService.getAllLabels()
            .then(function (data) {
                $scope.labels = data;
            }, function (error) {
                notifyService.showError('Load labels failed');
            });


        $scope.addIssue = function (issueData) {
            userService.getUserIdFromUsername(issueData.username)
                .then(function (data) {
                    var issue = {};

                    var assigneeId = data[0].Id;
                    issue.assigneeId = assigneeId;

                    var date = issueData.dueDate.split("-");
                    var dateReformat = date[2] + '/' + date[1] + '/' + date[0];
                    issue.dueDate = dateReformat;

                    var labels = issueData.labels.trim().split(/\s*,\s*/);
                    issue.labels = [];
                    labels.forEach(function (label) {
                        issue.labels.push({Name:label});
                    });

                    issue.projectId = projectId;
                    issue.title = issueData.title;
                    issue.description = issueData.description;
                    issue.priorityId = issueData.priorityId;

                    issueService.addIssue(issue)
                        .then(function (data) {
                            notifyService.showInfo('New issue added');
                            $location.path('/projects/' + projectId);
                        }, function (error) {
                            notifyService.showError('Add issue failed');
                        });

                }, function (error) {
                    notifyService.showError('Load current assignee data failed');
                })
        };
    }
]);