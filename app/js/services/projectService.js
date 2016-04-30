"use strict";

app.factory('projectService', [
    '$http',
    '$q',
    'authService',
    'BASE_URL',
    function ($http, $q, authService, BASE_URL) {

        return {
            //getMyProjectAndAssignedProjects: getMyProjectAndAssignedProjects
            getMyProjectAndAssignedProjects: function (allIssuesProjectId, params) {
                var deferred = $q.defer();

                var currentUserId = authService.getCurrentUserData().id;
                var filterUrl = 'filter=Lead.Id="' + currentUserId + '"';

                for (var i = 0; i < allIssuesProjectId.length; i++) {
                    filterUrl += ' or Id==' + allIssuesProjectId[i];
                }

                filterUrl += '&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber;

                $http.get(BASE_URL + 'Projects/?' + filterUrl, {headers: authService.getAuthHeaders()})
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            },
            getProjectById: function (id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id, {headers: authService.getAuthHeaders()})
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            }
        };
    }]);