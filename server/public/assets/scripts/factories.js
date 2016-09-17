myApp.factory("WineCellarService", ["$http", "$window","$mdToast", function($http, $window, $mdToast){
    var wine = {};//wine object returned from API
    var wineList = {}; //wineList object returned from the database/cellar
    var wineSearch = "Argyle";//keyword search in API
    var userInfo = {}; //userInfo that is collected when they log in
    var wineListLength;

    //function that will check to make sure user is logged in on each page
    var checkUserLoggedIn = function(){
      $http.get("/user").then(function(response){
          console.log("Response is ", response);
            if(response.data !== true){
              console.log("NOT LOGGED IN!");
            $window.location.href = '/assets/views/login.html';//redirect if not logged in
            } else {
              console.log("LOGGED IN! ", response.data);
              $http.get("/user/name").then(function(response){//go and grab user data if succesfully logged in
                userInfo = response; //store information into userInfo
                getWineList();
              });
            }
        });
    };

    var getWine = function(data){
      wineSearch = data.name;
      var apiKey = "d92bbdc39ab169cf89da261bad304bed";
      $http.get('https://services.wine.com/api/beta2/service.svc/json/catalog?search='+wineSearch+'&size=10&apikey='+apiKey+'').then(function(response){
        //store the response from the api onto the data key of the wine objec
          wine.data = response.data;
          //return wine object
      });
    };

    var getLiquor = function(){
      $http.get('http://www.barnivore.com/liquor.json').then(function(response){
        console.log("Response from Barnivore", response);
      });

    };
    //Function to add wine to the winelist array on the user object
    var addWine = function(wine){
      wineListLength = userInfo.data.winelist.length;//sets the length of the array
      wine.id = wineListLength + 1;//create a specific id for each wine
      userInfo.data.winelist.push(wine);//push new wine to the array
      $http.put("/addWineToCellar/"+ userInfo.data._id, userInfo).then(function(response){
        console.log("response is ", response);
        //display a message stating successfully added wine
        $mdToast.show(
                 $mdToast.simple()
                    .textContent('Wine Successfully Added!')
                    .hideDelay(3000).position('bottom left')
            );
        getWineList()
      });
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
      }).then(function(){
        var totalCost = 0;
        //Go through the wine list array to calculate totalCost of inventory
        //Check if cost is null and inventory is null
        for(var i = 0; i < wineList.response.winelist.length; i++){
          if(wineList.response.winelist[i].cost != null && wineList.response.winelist[i].inventory != null){
            totalCost += (wineList.response.winelist[i].cost * wineList.response.winelist[i].inventory);
          }
        }
        wineList.response.totalCost = totalCost;
        //Go through the wine list array to calculate total bottles in inventory
        //Check if inventory is null
        var totalBottles = 0;
        for(var i = 0; i < wineList.response.winelist.length; i++){
          if(wineList.response.winelist[i].inventory != null){
            totalBottles += parseInt(wineList.response.winelist[i].inventory);
          }
        }
        wineList.response.totalBottles = totalBottles;

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

    var createReport = function(filterOne, filterTwo, filterThree){
      var filterOne = filterOne;
      var filterTwo = filterTwo;
      var filterThre = filterThree;
        console.log("Working In The Report Factory " + filterOne + filterTwo + filterThree);
        console.log("WIne data is in Filter",wineList.response.winelist);
        var wineList = wineList.response.winelist;
        for(var i = 0; i < wineList.length; i++){
          
        }
    }

    return {
        wine : wine,
        getWine : getWine,
        getWineList : getWineList,
        wineList : wineList,
        addWine : addWine,
        manuallyAddWine : manuallyAddWine,
        deleteWine : deleteWine,
        checkUserLoggedIn: checkUserLoggedIn,
        editWine: editWine,
        userInfo: userInfo,
        getLiquor: getLiquor,
        createReport: createReport
    }
}]);
