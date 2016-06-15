
// Component created to display a product list page
angular.module("whatapop").component("products", {
    templateUrl: "views/Products.html",
    controller: ["ProductsService", "UsersService", "$rootRouter", "LocationService",
        function(ProductsService, UsersService, $rootRouter, LocationService) {
            var ctrl = this;

            ctrl.products = [];

            function loadProducts(users) {
                ProductsService.getProducts(ctrl.filterText, ctrl.filterCategoty, users).then(function (result) {
                    ctrl.products = result.data;
                }, function (err) {
                    alert(err.data);
                    console.log(err);
                });
            };

            // On oage initializaton products are requested to the server
            // using the filters provided on the URL
            ctrl.$routerOnActivate = function(next, previous) {

                // Convert category id to int
                ctrl.filterCategoty = next.params.catId ? parseInt(next.params.catId) : null;

                // Decode the product category in case it has special characters
                ctrl.categoryName = decodeURIComponent(next.params.catName);

                // Decode the search text in case it has special characters
                ctrl.filterText = next.params.search && next.params.search != "null" ? decodeURIComponent(next.params.search) : null;

                // Convert distance value to int
                ctrl.filterDistance = next.params.distance ? parseInt(next.params.distance) : null;

                // Decode the distance description in case it has special characters
                ctrl.distanceName = decodeURIComponent(next.params.distName);

                if (ctrl.filterDistance != null && ctrl.filterDistance != 0) {
                    LocationService.getLocation().then(function (coords) {
                        if (coords != null) {
                            UsersService.getNearUsers(coords, ctrl.filterDistance).then(function (results) {
                                loadProducts(results.data);
                            }, function (err) {
                                alert(err.data);
                                console.log(err);
                            });
                        } else {
                            loadProducts([]);
                        }
                    });
                } else {
                    loadProducts(null);
                }
            };

            // Remove the category filter applied and reload the page
            ctrl.deleteFilterCategory = function () {
                $rootRouter.navigate(['Products', {search: encodeURIComponent(ctrl.filterText), catId: "0", catName: "", distance: "" + ctrl.filterDistance, distName: encodeURIComponent(ctrl.distanceName)}]);
            };

            // Remove the text filter applied and reload the page
            ctrl.deleteFilterText = function () {
                $rootRouter.navigate(['Products', {search: "", catId: "" + ctrl.filterCategoty, catName: encodeURIComponent(ctrl.categoryName), distance: "" + ctrl.filterDistance, distName: encodeURIComponent(ctrl.distanceName)}]);
            };

            // Remove the text filter applied and reload the page
            ctrl.deleteFilterDistance = function () {
                $rootRouter.navigate(['Products', {search: encodeURIComponent(ctrl.filterText), catId: "" + ctrl.filterCategoty, catName: encodeURIComponent(ctrl.categoryName), distance: "0", distName: ""}]);
            };
        }
    ]
});
