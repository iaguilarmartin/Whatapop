angular.module("whatapop").filter("StateFilter", function () {
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
