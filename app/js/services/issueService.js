app.factory('issueService',[
    '$http',
    '$q',
    'authService',
    'BASE_URL',
    function ($http, $q, authService, BASE_URL) {



        function getMyIssues(params) {
            var deferred = $q.defer();
            var filter = 'orderBy=DueDate desc, IssueKey' + '&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber;

            $http.get(BASE_URL + 'Issues/me?' + filter, {headers :authService.getAuthHeaders()})
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
        }

        function getIssueById(id) {
            var deferred = $q.defer();

            $http.get(BASE_URL + 'Issues/' + id, {headers :authService.getAuthHeaders()})
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
        }

        return{
            getMyIssues:getMyIssues,
            getIssueById: getIssueById

        };
}]);