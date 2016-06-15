
// Service created to push and get products into a favorites array stored in browser local storage
angular.module("whatapop").service("FavoritesService", [ "AppSettings", function (AppSettings) {

    var favoritesKey = AppSettings.favoritesStorage;

    // Add a product to the favorites array
    this.addFavorite = function(productId) {

        var favorites = getFavorites();

        if (favorites.indexOf(productId) == -1) {
            favorites.push(productId);
        }

        return saveFavorites(favorites);
    };

    // Remove a product from the favorites array
    this.removeFavorite = function (productId) {
        var favorites = getFavorites();

        if (favorites.indexOf(productId) != -1) {
            favorites.splice(favorites.indexOf(productId), 1);
        }

        return saveFavorites(favorites);
    };

    // Returns true or false depending if the product is stored as favorite or not
    this.isFavorite = function (productId) {
        return getFavorites().indexOf(productId) != -1;
    };

    function getFavorites() {

        // Check if local storage API is supported by the browser
        if (typeof(Storage) !== "undefined") {
            var favorites = localStorage.getItem(favoritesKey);
            return favorites ? JSON.parse(favorites) : [];
        } else {
            console.error("Local Storage not supported");
            return [];
        }
    }

    function saveFavorites(favorites) {

        // Check if local storage API is supported by the browser
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(favoritesKey, JSON.stringify(favorites));
            return true;
        }

        return false;
    }
}]);
