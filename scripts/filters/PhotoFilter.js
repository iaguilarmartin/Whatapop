angular.module("whatapop").filter("PhotoFilter",["AppSettings", function (AppSettings) {

    // This filter converts the relative URL stored in the model to an absolute URL to download the
    // photos from the server when they are requested.
    // value: can be an array of photos or directly the URL of one photo

    return function (value) {
        if (value && value.length > 0) {

            // Check if it is a single photo or an array
            if (typeof value === 'string' ) {
                return AppSettings.urlAPIServer + value;
            } else {

                // Return the first photo of the array
                return AppSettings.urlAPIServer + value[0];
            }
        } else {
            return "";
        }
    }
}]);
