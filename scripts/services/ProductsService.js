angular.module("whatapop").service("ProductsService", ["$http", "AppSettings", "$q", "$filter",
    function ($http, AppSettings, $q, $filter) {
        this.getProducts = function (text, category) {
            var deferred = $q.defer();
            $http.get(AppSettings.urlAPIServer + AppSettings.productsMethod).then(function (result) {
                var filteredResult = $filter("filter")(result.data, function (product) {
                     if (text && product.name.toUpperCase().indexOf(text.toUpperCase()) == -1) {
                        return false;
                     }

                     if (!category || product.category.id == category) {
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

        this.getProductById = function (id) {
            var deferred = $q.defer();
            $http.get(AppSettings.urlAPIServer + AppSettings.productsMethod).then(function (result) {
                var filteredResult = $filter("filter")(result.data, {"id": id});
                deferred.resolve({data:filteredResult});
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
]);
