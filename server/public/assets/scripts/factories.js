myApp.factory("WineCellarService", ["$http", function($http){
    var wine = {};//wine object returned from API
    var wineList = {}; //wineList object returned from the database/cellar
    var wineSearch = "Argyle";//keyword search in API
    var userInfo = {};
    //function called on client side to collect search word

    //function to create a get requtest to the API
    var checkUserLoggedIn = function(){
      $http.get("/user").then(function(response){
            if(response.data !== true){
              console.log("NOT LOGGED IN!");
            $window.location.href = '/assets/views/login.html';
            } else {
              console.log("LOGGED IN! ", response.data);
              $http.get("/user/name").then(function(response){
                console.log("Response From Logged In:",response);
                userInfo = response;
              });
            }
        });
    };

    var getWine = function(){
      var apiKey = "d92bbdc39ab169cf89da261bad304bed";
      $http.get('http://services.wine.com/api/beta2/service.svc/json/catalog?search='+wineSearch+'&size=10&apikey='+apiKey+'').then(function(response){
        //store the response from the api onto the data key of the wine object
        wine.data = response.data;
        console.log("Wine Info from WINE API: ", wine.data);
        //return wine object
        return wine.data;
      });
    };

    var searchWine = function(data){
      wineSearch = data.name;
      getWine();
    };
    //Function to add wine to the cellar/database
    var addWine = function(addWine){
      userInfo.data.winelist.push(addWine);
      console.log("UserInfo ID =", userInfo.data);
      $http.put("/addWineToCellar/"+ userInfo.data._id, userInfo).then(getWineList());

    };

    var manuallyAddWine = function(addWine){
      userInfo.data.winelist.push(addWine);
      $http.post("/addWineManually", userInfo).then(function(response){
        getWineList();
      });
    };
    //Function to collect wine list from the cellar/database
    var getWineList = function(){
      $http.get("/getWineDatabase").then(function(response){
          wineList.response = response.data;
          console.log("Wine List From Database", wineList);
      });
    };

    var deleteWine = function(wine){
      $http.delete("/wine/"+ wine._id).then(function(response){
        getWineList();
      });
    };



    return {
        wine : wine,
        searchWine : searchWine,
        getWine : getWine,
        getWineList : getWineList,
        wineList : wineList,
        addWine : addWine,
        manuallyAddWine : manuallyAddWine,
        deleteWine : deleteWine,
        checkUserLoggedIn: checkUserLoggedIn
    }
}]);
