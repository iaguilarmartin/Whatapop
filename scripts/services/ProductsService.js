angular.module("whatapop").service("ProductsService", ["$http", "AppSettings", function ($http, AppSettings) {
    this.getProducts = function () {
        return $http.get(AppSettings.urlAPIServer + AppSettings.productsMethod);
    }
}]);
