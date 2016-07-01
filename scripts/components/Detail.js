
// Component created to display all the details of a product
angular.module("whatapop").component("detail", {
   templateUrl: "views/Detail.html",
   controller: ["ProductsService", "FavoritesService", function (ProductsService, FavoritesService) {
      var ctrl = this;

      ctrl.product = null;
      ctrl.isFavorite = false;

      // On oage initializaton the complete product details are gotten
      // from the server using the identifier provided

      ctrl.$routerOnActivate = function(next, previous) {
         var productId = next.params.id;
         ProductsService.getProductById(productId).then(function (result) {

            if (result.data) {
               ctrl.product = result.data;
               ctrl.isFavorite = FavoritesService.isFavorite(ctrl.product.id);
            }

         }, function (err) {
            console.log(err);
            alert(err.data);
         })
      };

      // Use FavoritesService to remember this product as favorite
      ctrl.addFavorites = function (id) {
         if (FavoritesService.addFavorite(id)) {
            ctrl.isFavorite = true;
         }
      }

      // Use FavoritesService to remove this product from favorites
      ctrl.removeFavorites = function (id) {
         if (FavoritesService.removeFavorite(id)) {
            ctrl.isFavorite = false;
         }
      }
   }]
});
