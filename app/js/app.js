"use strict";

var app = angular.module('IssueTracker',[
    'ngRoute',
    'ui.bootstrap.pagination'])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('PAGE_SIZE', 10)
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/home.html'
            });

            $routeProvider.when('/logout', {
                templateUrl: 'templates/user/logout.html',
                controller: 'LogoutController'
            });

            $routeProvider.when('/profile/password', {
                templateUrl: 'templates/user/change-password.html',
                controller: 'ChangePasswordController'
            });

            $routeProvider.when('/projects/:id', {
                templateUrl: 'templates/project/info-project.html',
                controller: 'InfoProjectController'
            });

            $routeProvider.when('/issues/:id', {
                templateUrl: 'templates/issue/info-issue.html',
                controller: 'InfoIssueController'
            });

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }]
    );