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
    }]
});
