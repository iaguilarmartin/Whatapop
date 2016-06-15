
// Component created to display a product list page
angular.module("whatapop").component("products", {
    templateUrl: "views/Products.html",
    controller: ["ProductsService", "$rootRouter", function(ProductsService, $rootRouter) {
        var ctrl = this;

        ctrl.products = [];

        // On oage initializaton products are requested to the server
        // using the filters provided on the URL
        ctrl.$routerOnActivate = function(next, previous) {

            // Convert category id to int
            ctrl.filterCategoty = next.params.catId ? parseInt(next.params.catId) : null;

            // Decode the product category in case it has special characters
            ctrl.categoryName = decodeURIComponent(next.params.catName);

            // Decode the search text in case it has special characters
            ctrl.filterText = next.params.search && next.params.search != "null" ? decodeURIComponent(next.params.search) : null;

            ProductsService.getProducts(ctrl.filterText, ctrl.filterCategoty).then(function (result) {
                ctrl.products = result.data;
            }, function (err) {
                alert(err.data);
                console.log(err);
            });
        };

        // Remove the category filter applied and reload the page
        ctrl.deleteFilterCategory = function () {
            $rootRouter.navigate(['Products', {search: encodeURIComponent(ctrl.filterText), catId: "0", catName: ""}]);
        };

        // Remove the text filter applied and reload the page
        ctrl.deleteFilterText = function () {
            $rootRouter.navigate(['Products', {search: "", catId: "" + ctrl.filterCategoty, catName: encodeURIComponent(ctrl.categoryName)}]);
        };
    }]
});
