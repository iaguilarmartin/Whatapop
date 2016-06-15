
// Main component of the application
angular.module("whatapop").component("mainComponent", {
    templateUrl: "views/MainComponent.html",

    // Defining routing configuration
    $routeConfig: [{
        name: "Products",
        path: "/products",
        component: "products",
        useAsDefault: true
    }, {
        name: "Detail",
        path: "/product-detail/:id",
        component: "detail"
    }],

    controller: ["CategoriesService", "$rootRouter", function (CategoriesService, $rootRouter) {
        ctrl = this;

        var emptyCategory = {name:"Cualquier categoria", id:0, label: "Categoria"};

        ctrl.text = "";
        ctrl.selectedCategory = emptyCategory;
        ctrl.categories = [];

        // Get the categories stored in the server to display them into the dropdown filter
        ctrl.$onInit = function() {
            CategoriesService.getCategories().then(function (result) {
                ctrl.categories = result.data;

                // Push the empty category into the first position of the array
                ctrl.categories.unshift(emptyCategory);

            }, function (err) {
                alert(err.data);
                console.log(err);
            })
        }

        // Once the user clicks on the search button the Product List page is displayed
        // applying the filters selected on the form
        ctrl.search = function () {
            var search = encodeURIComponent(ctrl.text);
            var catId = "" + ctrl.selectedCategory.id;
            var catName = encodeURIComponent(ctrl.selectedCategory.name);

            ctrl.selectedCategory = emptyCategory;
            ctrl.text = "";

            $rootRouter.navigate(['Products', {search: search, catId: catId, catName: catName}]);
        }
    }]
});
