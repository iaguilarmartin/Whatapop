
// Directive created to display a resume of each product got from the server inside Product List page
angular.module("whatapop").directive("productResume", ["FavoritesService", function (FavoritesService) {
    return {
        templateUrl: "views/ProductResume.html",
        scope: {
            // One Time Binding
            product: "<"
        },
        link: function (scope) {
            scope.isFavorite = FavoritesService.isFavorite(scope.product.id);
        }
    }
}]);
