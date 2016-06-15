angular.module("whatapop").filter("StateFilter", function () {

    // This filter is used to translate the state stored in English inside the model to Spanish
    return function (state) {
       if (state) {
           if (state == "selling") {
               return "Disponible";
           } else {
               return "Vendido";
           }
       } else {
           return "";
       }
    }
});
