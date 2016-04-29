app.factory('authService', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, BASE_URL) {
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
                delete sessionStorage['currentUser'];
            },
            setCurrentUserData: function () {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'users/me',{headers :this.getAuthHeaders()})
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