"use strict";

var app = angular.module('IssueTracker',['ngRoute'])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            });

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }]
    )