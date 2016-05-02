"use strict";

app.factory('labelService', [
    '$http',
    '$q',
    'authService',
    'BASE_URL',
    function ($http, $q, authService, BASE_URL) {
        return {
            getAllLabels: function () {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Labels/?filter=', {headers: authService.getAuthHeaders()})
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            }
        };
    }]);