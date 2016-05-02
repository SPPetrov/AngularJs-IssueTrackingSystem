"use strict";

app.factory('authService', [
    '$http',
    '$q',
    '$location',
    'BASE_URL',
    function ($http, $q, $location, BASE_URL) {
        return {
            setCurrentUserData: function () {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'users/me', {headers: this.getAuthHeaders()})
                    .then(function (response) {
                        var currentUser = JSON.parse(sessionStorage['currentUser']);
                        currentUser['isAdmin'] = response.data.isAdmin;
                        currentUser['id'] = response.data.Id;
                        currentUser['username'] = response.data.Username;
                        sessionStorage['currentUser'] = JSON.stringify(currentUser);
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            },
            getCurrentUserData: function () {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    return JSON.parse(sessionStorage['currentUser']);
                }
            },
            isAnonymous: function () {
                return sessionStorage['currentUser'] == undefined;
            },
            isLoggedIn: function () {
                return sessionStorage['currentUser'] != undefined;
            },
            isNormalUser: function () {
                var currentUser = this.getCurrentUserData();

                return (currentUser != undefined) && (!currentUser.isAdmin);
            },
            rejectNotAdminUser: function () {
                if (!this.isAdmin()){
                    $location.path('/');
                }
            },
            rejectNotLoginUser: function () {
                if (!this.isLoggedIn()){
                    $location.path('/');
                }
            },
            isAdmin: function () {
                var currentUser = this.getCurrentUserData();

                return (currentUser != undefined) && (currentUser.isAdmin);
            },
            getAuthHeaders: function () {
                var headers = {};
                var currentUser = this.getCurrentUserData();
                if (currentUser) {
                    headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                }

                return headers;
            }
        };
    }
]);