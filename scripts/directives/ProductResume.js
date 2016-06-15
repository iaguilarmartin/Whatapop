
// Directive created to display a resume of each product got from the server inside Product List page
angular.module("whatapop").directive("productResume", function () {
    return {
        templateUrl: "views/ProductResume.html",
        scope: {

            // One Time Binding
            product: "<"
        }
    }
});
