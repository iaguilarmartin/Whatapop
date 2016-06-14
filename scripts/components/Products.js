angular.module("whatapop").component("products", {
    templateUrl: "views/Products.html",
    controller: ["ProductsService", "$rootRouter", function(ProductsService, $rootRouter) {
        var ctrl = this;

        ctrl.products = [];

        ctrl.$routerOnActivate = function(next, previous) {
            ctrl.filterCategoty = next.params.catId ? parseInt(next.params.catId) : null;
            ctrl.categoryName = decodeURIComponent(next.params.catName);
            ctrl.filterText = next.params.search && next.params.search != "null" ? decodeURIComponent(next.params.search) : null;

            ProductsService.getProducts(ctrl.filterText, ctrl.filterCategoty).then(function (result) {
                ctrl.products = result.data;
            }, function (err) {
                alert(err.data);
                console.log(err);
            });
        };

        ctrl.deleteFilterCategory = function () {
            $rootRouter.navigate(['Products', {search: encodeURIComponent(ctrl.filterText), catId: "0", catName: ""}]);
        };

        ctrl.deleteFilterText = function () {
            $rootRouter.navigate(['Products', {search: "", catId: "" + ctrl.filterCategoty, catName: encodeURIComponent(ctrl.categoryName)}]);
        };
    }]
});
