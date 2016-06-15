angular.module("whatapop", ["ngComponentRouter", "ngSanitize"]);

// Configuring $locationProvider
angular.module("whatapop").config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

// Set root component
angular.module("whatapop").value("$routerRootComponent","mainComponent");