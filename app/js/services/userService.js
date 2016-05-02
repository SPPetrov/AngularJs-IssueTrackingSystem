"use strict";

app.factory('userService', [
    '$http',
    '$q',
    'authService',
    'BASE_URL',
    function ($http, $q, authService, BASE_URL) {
        return {
            login: function login(user) {
                var deferred = $q.defer();

                var data = "grant_type=password&username=" + user.username + "&password=" + user.password;

                $http.defaults.headers.ContentType = 'application/x-www-form-urlencoded';

                $http.post(BASE_URL + 'api/Token', data)
                    .then(function (response) {
                        sessionStorage['currentUser'] = JSON.stringify({access_token: response.data['access_token']});
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            },
            register: function (userData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', userData)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            },
            logout: function () {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Logout', null, {headers: authService.getAuthHeaders()})
                    .then(function (response) {
                        delete sessionStorage['currentUser'];
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            },
            changePassword: function (userData) {
            var deferred = $q.defer();

            $http.post(BASE_URL + 'api/Account/ChangePassword', userData, {headers: authService.getAuthHeaders()})
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
            },
            makeAdmin: function (userData) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Users/makeadmin', userData)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            }

        };
    }
]);
