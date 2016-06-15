
// Value class used to store general application settings as server URL

angular.module("whatapop").value("AppSettings", {
    "urlAPIServer": "http://localhost:8000/",
    "productsMethod": "api/products",
    "categoriesMethod": "api/categories",
    "favoritesStorage": "favorites_products"
});
