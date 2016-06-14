angular.module("whatapop").service("CategoriesService", ["$http", "AppSettings", function ($http, AppSettings) {
    this.getCategories = function () {
        return $http.get(AppSettings.urlAPIServer + AppSettings.categoriesMethod);
    }
}]);
