"use strict";

app.controller('IssueEditController', [
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

        var issueId = $routeParams.id;


        issueService.getIssueById($routeParams.id)
            .then(function (issueData) {

                var currentProjectId = issueData.Project.Id;

                projectService.getProjectById(currentProjectId)
                    .then(function (projectData) {

                        var currentUserId = authService.getCurrentUserData().id;

                        if ((currentUserId != projectData.Lead.Id) && (currentUserId != issueData.Assignee.Id) && (!authService.isAdmin())) {
                            $location.path('/');
                        }

                        $scope.priorities = projectData.Priorities;

                        $scope.isEditAllow = (projectData.Lead.Id == currentUserId || authService.isAdmin());

                        issueData.Labels = issueData.Labels.map(function (label) {
                            return label.Name;
                        }).join(', ');

                        var date = issueData.DueDate.slice(0, 10).split("-");
                        var dateReformat = date[2] + '-' + date[1] + '-' + date[0];
                        issueData.DueDate = dateReformat;

                        $scope.issue = issueData;

                    }, function (error) {
                        notifyService.showError('Load project info for this issue failed', error);
                    });
            }, function (error) {
                notifyService.showError('Load issue failed!', error);
            });


        $scope.changeIssueStatus = function (issueId, statusId) {
            issueService.changeStatusIssue(issueId, statusId)
                .then(function (statusData) {
                    $scope.issue.AvailableStatuses = statusData;

                }, function (error) {
                    notifyService.showError('Cannot change status', error);
                });
        };

        $scope.editIssue = function (issueData) {

            userService.getUserIdFromUsername(issueData.Assignee.Username)
                .then(function (data) {
                    var assigneeId = data[0].Id;

                    var issue = {};

                    issue.Title = issueData.Title;
                    issue.Description = issueData.Description;

                    var date = issueData.DueDate.split("-");
                    var dateReformat = date[2] + '/' + date[1] + '/' + date[0];
                    issue.DueDate = dateReformat;

                    issue.AssigneeId = assigneeId;
                    issue.PriorityId = issueData.Priority.Id;

                    var labels = issueData.Labels.trim().split(/\s*,\s*/);
                    issue.Labels = [];
                    labels.forEach(function (label) {
                        issue.Labels.push({Name:label});
                    });

                    issueService.editIssue(issueId, issue)
                        .then(function (data) {
                            notifyService.showInfo('Edit issue successfully');
                            $location.path('/issues/' + issueId);
                        }, function (error) {
                            notifyService.showError('Edit issue failed', error);
                        });




                }, function (error) {
                    notifyService.showError('Load current assignee data failed');
                });






        };
    }
]);