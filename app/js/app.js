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

            $routeProvider.when('/projects', {
                templateUrl: 'templates/project/project-all.html',
                controller: 'ProjectAllController'
            });

            $routeProvider.when('/projects/add', {
                templateUrl: 'templates/project/project-add.html',
                controller: 'ProjectAddController'
            });

            $routeProvider.when('/projects/:id', {
                templateUrl: 'templates/project/project-details.html',
                controller: 'ProjectDetailsController'
            });

            $routeProvider.when('/projects/:id/edit', {
                templateUrl: 'templates/project/project-edit.html',
                controller: 'ProjectEditController'
            });

            $routeProvider.when('/projects/:id/add-issue', {
                templateUrl: 'templates/issue/issue-add.html',
                controller: 'IssueAddController'
            });


            $routeProvider.when('/issues/:id/edit', {
                templateUrl: 'templates/issue/issue-edit.html',
                controller: 'IssueEditController'
            });



            $routeProvider.when('/issues/:id', {
                templateUrl: 'templates/issue/issue-details.html',
                controller: 'IssueDetailsController'
            });

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }]
    );