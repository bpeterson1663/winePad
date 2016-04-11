myApp.controller("ShowWineController", ["$scope", '$http', "$window", "WineCellarService", function($scope, $http, $window, WineCellarService){
  //store the factory object in wineCellar
    var wineCellar = WineCellarService;
    //Check if user is logged in
    wineCellar.checkUserLoggedIn();
    //wineCellar.getWineList();

    $scope.wineList = wineCellar.wineList;
}]);
