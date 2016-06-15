
// Service created to perform http request to the server related with categories
angular.module("whatapop").service("CategoriesService", ["$http", "AppSettings", function ($http, AppSettings) {

    // Return all the categories defined on the server
    this.getCategories = function () {
        return $http.get(AppSettings.urlAPIServer + AppSettings.categoriesMethod);
    }
}]);
