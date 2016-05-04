"use strict";

app.controller('ProjectAddController', [
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
        authService.rejectNotAdminUser();

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

        $scope.createProject = function (projectData) {
            console.log(projectData);


            userService.getUserIdFromUsername(projectData.username)
                .then(function (data) {
                    var project = {};

                    var leadId = data[0].Id;
                    project.leadId = leadId;

                    var labels = projectData.labels.trim().split(/\s*,\s*/);
                    project.labels = [];
                    labels.forEach(function (label) {
                        project.labels.push({Name:label});
                    });

                    var priorities = projectData.priorities.trim().split(/\s*,\s*/);
                    project.priorities = [];
                    labels.forEach(function (priority) {
                        project.priorities.push({Name:priority});
                    });

                    project.name = projectData.name;
                    project.projectKey = projectData.projectKey;
                    project.description = projectData.description;


                    projectService.addProject(project)
                        .then(function (data) {
                            notifyService.showInfo('New project created');
                            $location.path('/');
                        }, function (error) {
                            notifyService.showError('Create project failed',error);
                        });

                }, function (error) {
                    notifyService.showError('Load current user data failed');
                })
        }
    }
]);