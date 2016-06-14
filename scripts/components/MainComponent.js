angular.module("whatapop").component("mainComponent", {
    templateUrl: "views/MainComponent.html",
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

        ctrl.$onInit = function(next, previous) {
            CategoriesService.getCategories().then(function (result) {
                ctrl.categories = result.data;
                ctrl.categories.unshift(emptyCategory);

            }, function (err) {
                alert(err.data);
                console.log(err);
            })
        }

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
