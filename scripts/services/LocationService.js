angular.module("whatapop").service("LocationService", ["$q", function ($q) {
    var currentLocation = null;
    var requestingLocation = false;

    var returnLocation = function () {
        if (requestingLocation) {
            var deferred = $q.defer();
            waitForResponse(deferred);
            return deferred.promise;
        } else {
            return $q.when(currentLocation);
        }
    };

    var updateLocation = function () {
        requestingLocation = true;

        // Check if geolocation is supported by the browser
        if (navigator.geolocation) {
            // Request user location
            navigator.geolocation.getCurrentPosition(
                function (data) {
                    currentLocation = data.coords;
                    requestingLocation = false;
                },
                // User denied using his location
                function () {
                    currentLocation = null;
                    requestingLocation = false;
                    console.error("User denied access to his location");
                });
        }
        // API not supported
        else {
            currentLocation = null;
            console.error("Geolocation API not supported");
            requestingLocation = false;
        }
    };

    return {
        getLocation: returnLocation,
        requestLocation: updateLocation
    };

    function waitForResponse(deferred) {
        setTimeout(function () {
            if (requestingLocation) {
                waitForResponse(deferred);
            } else {
                deferred.resolve(currentLocation);
            }
        }, 500);
    }
}]);
