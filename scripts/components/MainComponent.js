
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

    controller: ["CategoriesService", "$rootRouter","LocationService",
        function (CategoriesService, $rootRouter, LocationService) {
            ctrl = this;

            ctrl.text = "";

            var emptyCategory = {name:"Cualquier categoria", id:0, label: "Categoria"};
            ctrl.selectedCategory = emptyCategory;
            ctrl.categories = [];

            // Initialized default distances
            ctrl.distances = [
                {name:"Cualquier distancia", value:0, label: "Distancia"},
                {name:"1Km - Cerca", value:1000, label: "Cerca"},
                {name:"5Km - Mi zona", value:5000, label: "Mi zona"},
                {name:"15Km - Mi ciudad", value:320000, label: "Mi ciudad"}
            ];
            ctrl.selectedDistance = ctrl.distances[0];

            // Get the categories stored in the server to display them into the dropdown filter
            ctrl.$onInit = function() {
                LocationService.requestLocation();

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
                var distance = "" + ctrl.selectedDistance.value;
                var distName = encodeURIComponent(ctrl.selectedDistance.name);

                ctrl.selectedCategory = emptyCategory;
                ctrl.text = "";
                ctrl.selectedDistance = ctrl.distances[0];

                $rootRouter.navigate(['Products', {search: search, catId: catId, catName: catName, distance: distance, distName: distName}]);
            }
        }
    ]
});
