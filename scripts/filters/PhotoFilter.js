angular.module("whatapop").filter("PhotoFilter",["AppSettings", function (AppSettings) {

    return function (images) {
        console.log(images);
        if (images && images.length > 0) {
            return AppSettings.urlAPIServer + images[0];
        } else {
            return "";
        }
    }
}]);
