angular.module("whatapop").directive("productResume", function () {
    return {
        templateUrl: "views/ProductResume.html",
        scope: {
            product: "<"
        }
    }
});
