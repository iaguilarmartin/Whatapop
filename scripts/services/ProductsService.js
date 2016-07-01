
// Service created to perform http request to the server related with products
angular.module("whatapop").service("ProductsService", ["$http", "AppSettings", "$q", "$filter",
    function ($http, AppSettings, $q, $filter) {

        // Return all the products that matches the category and name provided
        // if no category or no name is passed by parameter then all products are returned
        this.getProducts = function (text, category, users) {

            var arrayUsersIds = [];

            if (users) {
                angular.forEach(users, function (user) {
                    arrayUsersIds.push(user.id);
                });
            }

            // A deferred object is created to simulate that the filtering procces is done on the server side
            var deferred = $q.defer();
            $http.get(AppSettings.urlAPIServer + AppSettings.productsMethod).then(function (result) {
                var filteredResult = $filter("filter")(result.data, function (product) {

                    // Filtering products that are near current user
                    if (users && arrayUsersIds.indexOf(product.seller.id) == -1) {
                        return false;
                    }

                     // Filtering products witch name contains the text provided
                     if (text && product.name.toUpperCase().indexOf(text.toUpperCase()) == -1) {
                        return false;
                     }

                     // Filtering products witch category id is equals the category identifier provided
                     return (!category || product.category.id == category)
                 });
                deferred.resolve({data:filteredResult});
            }, function (err) {
                deferred.reject(err);
            });

            // Promise returned
            return deferred.promise;
        }

        // Return all the products that match the identifier provided by param. It should be just one
        this.getProductById = function (id) {

            // A deferred object is created to simulate that the filtering procces is done on the server side
            var deferred = $q.defer();
            $http.get(AppSettings.urlAPIServer + AppSettings.productsMethod + "/" + id).then(function (result) {
                deferred.resolve({data:result.data});
            }, function (err) {
                deferred.reject(err);
            });

            // Promise returned
            return deferred.promise;
        }
    }
]);
