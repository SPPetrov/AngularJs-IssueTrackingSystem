"use strict";

app.controller('DashboardController', [
    '$scope',
    '$location',
    '$route',
    'issueService',
    'projectService',
    'notifyService',
    'authService',
    'PAGE_SIZE',
    function ($scope, $location, $route, issueService, projectService, notifyService, authService, PAGE_SIZE) {

        $scope.issuesParams = {
            pageNumber: 1,
            pageSize: PAGE_SIZE
        };

        $scope.reloadIssuesToView = function () {
            issueService.getMyIssues($scope.issuesParams)
                .then(function (data) {
                    console.log(data);
                    $scope.issues = data;
                }, function (error) {
                    notifyService.showError('Cannot load my issues', error);
                });
        };

        $scope.reloadIssuesToView();

        issueService.getMyIssues($scope.issuesParams)
            .then(function (data) {
                var allIssues = data.Issues;
                var allIssuesProjectId = [];

                allIssues.forEach(function (issue) {
                    var currentIssueProjectId = issue.Project.Id;
                    if (allIssuesProjectId.indexOf(currentIssueProjectId)<0) {
                        allIssuesProjectId.push(currentIssueProjectId);
                    }
                });

                $scope.projectsParams = {
                    pageNumber: 1,
                    pageSize: PAGE_SIZE
                };

                $scope.reloadProjectsToView = function () {
                    projectService.getMyProjectAndAssignedProjects(allIssuesProjectId, $scope.projectsParams)
                        .then(function (data) {
                            $scope.projects = data;
                        }, function (error) {
                            notifyService.showError('Cannot load my and assigned projects', error);
                        });
                };

                $scope.reloadProjectsToView();


            }, function (error) {
                notifyService.showError('Cannot load my issues', error);
            });




    }


]);