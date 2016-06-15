angular.module("whatapop").component("detail", {
   templateUrl: "views/Detail.html",
   controller: ["ProductsService", function (ProductsService) {
      var ctrl = this;

      ctrl.product = null;

      ctrl.$routerOnActivate = function(next, previous) {
         var productId = next.params.id;
         ProductsService.getProductById(productId).then(function (result) {

            if (result.data && result.data.length > 0) {
               ctrl.product = result.data[0];
            }

         }, function (err) {
            console.log(err);
            alert(err.data);
         })
      }
   }]
});
