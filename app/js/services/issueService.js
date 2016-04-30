"use strict";

app.factory('issueService', [
    '$http',
    '$q',
    'authService',
    'BASE_URL',
    function ($http, $q, authService, BASE_URL) {
         return {
            getMyIssues: function (params) {
                var deferred = $q.defer();
                var filterUrl = 'orderBy=DueDate desc, IssueKey' + '&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber;

                $http.get(BASE_URL + 'Issues/me?' + filterUrl, {headers: authService.getAuthHeaders()})
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            },
            //getIssueById: function (id) {
            //    var deferred = $q.defer();
            //
            //    $http.get(BASE_URL + 'Issues/' + id, {headers: authService.getAuthHeaders()})
            //        .then(function (response) {
            //            deferred.resolve(response.data);
            //        }, function (error) {
            //            deferred.reject(error.data);
            //        });
            //
            //    return deferred.promise;
            //},
            getIssuesByProjectId: function (projectId, params ) {
                var deferred = $q.defer();
                var filterUrl = 'filter=ProjectId=='+ projectId + '&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber;

                $http.get(BASE_URL + 'Issues/?' + filterUrl, {headers: authService.getAuthHeaders()})
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            }


        };
    }]);