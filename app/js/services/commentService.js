"use strict";

app.factory('commentService', [
    '$http',
    '$q',
    'authService',
    'BASE_URL',
    function ($http, $q, authService, BASE_URL) {
        return {
            getCommentsById: function (id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + id +/comments/, {headers: authService.getAuthHeaders()})
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            },
            addCommentToIssue: function (issueId, comment) {
                var deferred = $q.defer();
                var data = {
                    Text: comment
                };
                $http.post(BASE_URL + 'Issues/' + issueId + '/comments', data, {headers: authService.getAuthHeaders()})
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            }
        };
    }]);