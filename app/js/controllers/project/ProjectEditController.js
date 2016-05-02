"use strict";

app.controller('ProjectEditController', [
    '$scope',
    '$routeParams',
    'projectService',
    'issueService',
    'commentService',
    'notifyService',
    'PAGE_SIZE',
    function ($scope, $routeParams, projectService, issueService, commentService, notifyService, PAGE_SIZE) {
        var projectId = $routeParams.id;
        console.log(projectId);

    }
]);