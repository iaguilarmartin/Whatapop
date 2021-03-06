// Module creation with ngComponentRouter for Single page application design
// and ngSanitize to be able to bind html code into views elements
angular.module("whatapop", ["ngComponentRouter", "ngSanitize", "dahr.ng-haversine"]);

// Configuring $locationProvider
angular.module("whatapop").config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

// Set root component
angular.module("whatapop").value("$routerRootComponent","mainComponent");