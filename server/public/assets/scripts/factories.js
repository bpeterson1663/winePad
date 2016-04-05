myApp.factory("WineCellarService", ["$http", function($http){
    var wine = {};
    var wineList = {};
    var wineSearch = "";

    var searchWine = function(data){
      wineSearch = data.name;
    };
    //function to create a get requtest to the API
    var getWine = function(){
      var apiKey = "d92bbdc39ab169cf89da261bad304bed";
      $http.get('http://services.wine.com/api/beta2/service.svc/json/catalog?search='+wineSearch+'&size=10&apikey='+apiKey+'').then(function(response){
        //store the response from the api onto the data key of the wine object
        wine.data = response.data
        //return wine object
        return wine.data;
      });
    };

    var addWine = function(addWine){
      $http.post("/addWineToCellar", addWine).then(function(response){
          getWineList();
      });
    };

    var getWIneList = function(){
      $http.get("/getWineDatabase").then(function(response){
          wineList.response = response.data;
      });
    };
    return {
        wine : wine,
        searchWine : searchWine,
        getWine : getWine,
        getWineList : getWineList,
        wineList : wineList,
        addWine : addWine
    }
}]);
