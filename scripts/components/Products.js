angular.module("whatapop").component("products", {
    templateUrl: "views/Products.html",
    controller: ["ProductsService", function(ProductsService) {
        var ctrl = this;
        ctrl.products = [];

        ctrl.$onInit = function () {
            ProductsService.getProducts().then(function (result) {
                ctrl.products = result.data;
            }, function (err) {
                alert(err.data);
                console.log(err);
            });
        };
    }]
});
