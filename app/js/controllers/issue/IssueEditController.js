"use strict";

app.controller('IssueEditController', [
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





                function loadIssueToEdit () {
                    issueService.getIssueById($routeParams.id)
                        .then(function (issueData) {
                            if ((authService.getCurrentUserData().id != issueData.Author.Id)
                                && (authService.getCurrentUserData().id != issueData.Assignee.Id)
                                && (!authService.isAdmin())) {
                                $location.path('/');
                            }




                            issueData.labels = issueData.Labels.map(function (label) {
                                return label.Name;
                            }).join(', ');

                            var currentProjectId = issueData.Project.Id;

                            projectService.getProjectById(currentProjectId)
                                .then(function (projectData) {
                                    issueData.issueProjectLeaderId = projectData.Lead.Id;
                                    issueData.dueDate = new Date(issueData.DueDate)
                                    $scope.issue = issueData;




                                }, function (error) {
                                    notifyService.showError('Cannot load project info for this issue', error);
                                });


                        }, function (error) {
                            notifyService.showError('Load issue failed!', error);
                        });
                }

                loadIssueToEdit();

                $scope.changeIssueStatus = function (issueId, statusId) {
                    issueService.changeStatusIssue(issueId, statusId)
                        .then(function (statusData) {
                            $scope.issue.AvailableStatuses = statusData;
                            loadIssueToEdit();
                        }, function (error) {
                            notifyService.showError('Cannot change status', error);
                        });
                };






    }
]);