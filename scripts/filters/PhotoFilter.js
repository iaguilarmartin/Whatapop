angular.module("whatapop").filter("PhotoFilter",["AppSettings", function (AppSettings) {

    return function (images) {
        if (images && images.length > 0) {
            if (typeof images === 'string' ) {
                return AppSettings.urlAPIServer + images;
            } else {
                return AppSettings.urlAPIServer + images[0];
            }
        } else {
            return "";
        }
    }
}]);
