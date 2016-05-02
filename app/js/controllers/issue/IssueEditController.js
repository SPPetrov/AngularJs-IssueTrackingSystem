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
        issueService.getIssueById(issueId)
            .then(function (data) {
                if ((authService.getCurrentUserData().id != data.Lead.Id) && (!authService.isAdmin())) {
                    $location.path('/');
                }
            }, function (error) {
                notifyService.showError('Load issue details failed');
            });

    }
]);