
// Service created to perform http request to the server related with users
angular.module("whatapop").service("UsersService", ["$http", "AppSettings", "$q", "$filter", "$haversine",
    function ($http, AppSettings, $q, $filter, $haversine) {

        // Return all the users that are within a distance lower than the specified
        this.getNearUsers = function (latitude, longitude, distance) {

            var coordOrigin = {
                "latitude": latitude,
                "longitude": longitude
            };

            // A deferred object is created to simulate that the filtering procces is done on the server side
            var deferred = $q.defer();
            $http.get(AppSettings.urlAPIServer + AppSettings.usersMethod).then(function (result) {
                var filteredResult = $filter("filter")(result.data, function (user) {

                    var coordDestination = {
                        "latitude": user.latitude,
                        "longitude": user.longitude
                    };

                    // Filtering users that are near current location
                     if ($haversine.distance(coordOrigin, coordDestination) <= distance) {
                        return true;
                     } else {
                         return false;
                     }
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
