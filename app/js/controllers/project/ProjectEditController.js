"use strict";

app.controller('ProjectEditController', [
    '$filter',
    '$scope',
    '$routeParams',
    '$location',
    'projectService',
    'issueService',
    'userService',
    'authService',
    'labelService',
    'notifyService',
    function ($filter, $scope, $routeParams, $location, projectService, issueService, userService, authService, labelService, notifyService) {

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
                notifyService.showError('Load labels failed', error);
            });

        var projectId = $routeParams.id;

        if (isNaN(projectId)) {
            $location.path('/');
        }

        projectService.getProjectById(projectId)
            .then(function (projectData) {

                var currentUserId = authService.getCurrentUserData().id;

                if ((currentUserId != projectData.Lead.Id) && (!authService.isAdmin())) {
                    $location.path('/');
                }

                projectData.Labels = projectData.Labels.map(function (label) {
                    return label.Name;
                }).join(', ');

                projectData.Priorities = projectData.Priorities.map(function (priority) {
                    return priority.Name;
                }).join(', ');

                $scope.project = projectData;

            }, function (error) {
                notifyService.showError('Load project data failed', error);
            });

        $scope.editProject = function (projectData) {

            userService.getUserIdFromUsername(projectData.Lead.Username)
                .then(function (data) {
                    var leadId = data[0].Id;

                    var project = {};

                    project.Name = projectData.Name;
                    project.Description = projectData.Description;
                    project.LeadId = leadId;

                    var labels = projectData.Labels.trim().split(/\s*,\s*/);
                    project.Labels = [];
                    labels.forEach(function (label) {
                        project.Labels.push({Name: label});
                    });

                    var priorities = projectData.Priorities.trim().split(/\s*,\s*/);
                    project.Priorities = [];
                    priorities.forEach(function (priority) {
                        project.Priorities.push({Name: priority});
                    });

                    projectService.editProject(projectId, project)
                        .then(function (data) {
                            notifyService.showInfo('Edit project successfully');
                            $location.path('/projects/' + projectId);
                        }, function (error) {
                            notifyService.showError('Edit project failed', error);
                        });

                }, function (error) {
                    notifyService.showError('Load current assignee data failed', error);
                });
        };
    }
]);