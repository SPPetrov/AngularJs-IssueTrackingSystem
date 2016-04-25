"use strict";

var app = angular.module('IssueTracker',[])
    .controller('MainCtrl', [
        '$scope',
        function ($scope) {
            $scope.name = 'Baj Ivan';
        }
    ]);