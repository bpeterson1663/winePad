myApp.factory("WineCellarService", ["$http", "$window", function($http, $window){
    var wine = {};//wine object returned from API
    var wineList = {}; //wineList object returned from the database/cellar
    var wineSearch = "Argyle";//keyword search in API
    var userInfo = {}; //userInfo that is collected when they log in
    var wineListLength;
    //function that will check to make sure user is logged in on each page
    var checkUserLoggedIn = function(){
      $http.get("/user").then(function(response){
            if(response.data !== true){
              console.log("NOT LOGGED IN!");
            $window.location.href = '/assets/views/login.html';//redirect if not logged in
            } else {
              console.log("LOGGED IN! ", response.data);
              $http.get("/user/name").then(function(response){//go and grab user data if succesfully logged in
                // console.log("Response From Logged In:",response);
                userInfo = response; //store information into userInfo
                //wineListLength = userInfo.data.winelist.length;
                getWineList();
              });

            }
        });
    };

    var getWine = function(){
      var apiKey = "d92bbdc39ab169cf89da261bad304bed";
      $http.get('http://services.wine.com/api/beta2/service.svc/json/catalog?search='+wineSearch+'&size=10&apikey='+apiKey+'').then(function(response){
        //store the response from the api onto the data key of the wine object
        console.log("Wine Coming Back from API: ",response.data);
        wine.data = response.data;
        //return wine object
        return wine.data;
      });
    };

    var searchWine = function(data){
      wineSearch = data.name;
      getWine();
    };
    //Function to add wine to the winelist array on the user object
    var addWine = function(wine){
      wineListLength = userInfo.data.winelist.length;//sets the length of the array
      wine.id = wineListLength + 1;//create a specific id for each wine
      userInfo.data.winelist.push(wine);//push new wine to the array
      $http.put("/addWineToCellar/"+ userInfo.data._id, userInfo).then(getWineList());
    };
    //same setup as above function
    var manuallyAddWine = function(wine){
      wineListLength = userInfo.data.winelist.length;
      wine.id = wineListLength + 1;
      userInfo.data.winelist.push(wine);
      $http.put("/addWineToCellar/"+ userInfo.data._id, userInfo).then(getWineList());
    };
    //Function to collect wine list from the cellar/database
    var getWineList = function(){
      //gets wine list based on users specific Mongo ID
      $http.get("/getWineDatabase/"+userInfo.data._id).then(function(response){
          wineList.response = response.data;
      });
    };
    //delete wine function from array
    var deleteWine = function(wine){
      for(var i = 0; i < userInfo.data.winelist.length; i++){//loops through winelist array and matches the specific wine id to be deleted to the winelist array id
        if(wine.id == userInfo.data.winelist[i].id){
            userInfo.data.winelist.splice(i,1);//splices that wine out of the array
        }
      }
      //Updates the winelist with the new array after it has been removed
      $http.put("/deleteWine/"+ userInfo.data._id, userInfo).then(getWineList());
    };
    //same concept as delete wine function
    var editWine = function(wine){
      for(var i = 0; i < userInfo.data.winelist.length; i++){
        if(wine.id == userInfo.data.winelist[i].id){
          userInfo.data.winelist[i] = wine;
        }
      }
      $http.put("/updateWine/"+ userInfo.data._id, userInfo).then(getWineList());
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
        checkUserLoggedIn: checkUserLoggedIn,
        editWine: editWine,
        userInfo: userInfo
    }
}]);
