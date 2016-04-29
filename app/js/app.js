"use strict";

var app = angular.module('IssueTracker',[
    'ngRoute',
    'ui.bootstrap.pagination'])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('PAGE_SIZE', 7)
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/home.html'
            });

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }]
    )