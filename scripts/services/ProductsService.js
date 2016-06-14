angular.module("whatapop").service("ProductsService", ["$http", "AppSettings", "$q", function ($http, AppSettings, $q) {
    this.getProducts = function (text, category) {
        var deferred = $q.defer();
        $http.get(AppSettings.urlAPIServer + AppSettings.productsMethod).then(function (result) {
             var filteredResult = result.data.filter(function (product) {

                if (text && product.name.toUpperCase().indexOf(text.toUpperCase()) == -1) {
                    return false;
                }

                if (category == 0 || product.category.id == category) {
                    return true;
                } else {
                    return false;
                }
            });

            deferred.resolve({data:filteredResult});
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);
