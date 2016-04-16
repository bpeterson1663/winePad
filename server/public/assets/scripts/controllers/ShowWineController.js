myApp.controller("ShowWineController", ["$scope", '$http', "$window", "WineCellarService", function($scope, $http, $window, WineCellarService){
  var wineCellar = WineCellarService;
  wineCellar.checkUserLoggedIn();
  $scope.wineList = wineCellar.wineList;

  angular.element(document).ready(function(){

    var totalCost = 0;
    var totalBottleCount = 0;
    //Check if user is logged in

     console.log("Winelist on the scope is: ", $scope.wineList);
  
  });

 }]);
