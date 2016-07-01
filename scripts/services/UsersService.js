
// Service created to perform http request to the server related with users
angular.module("whatapop").service("UsersService", ["$http", "AppSettings", "$q", "$filter", "$haversine",
    function ($http, AppSettings, $q, $filter, $haversine) {

        // Return all the users that are within a distance lower than the specified
        this.getNearUsers = function (coords, distance) {

            // A deferred object is created to simulate that the filtering procces is done on the server side
            var deferred = $q.defer();
            $http.get(AppSettings.urlAPIServer + AppSettings.usersMethod).then(function (result) {
                var filteredResult = $filter("filter")(result.data, function (user) {

                    var userCoords = {
                        "latitude": user.latitude,
                        "longitude": user.longitude
                    };

                    // Filtering users that are near current location
                    return (distance == 0 || $haversine.distance(coords, userCoords) <= distance)
                 });
                deferred.resolve({data:filteredResult});
            }, function (err) {
                deferred.reject(err);
            });

            // Promise returned
            return deferred.promise;
        }
    }
]);
