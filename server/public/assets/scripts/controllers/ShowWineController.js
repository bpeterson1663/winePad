myApp.controller("ShowWineController", ["$scope", '$http', "$window", "WineCellarService", function($scope, $http, $window, WineCellarService){
  var wineCellar = WineCellarService;
  wineCellar.checkUserLoggedIn();//checks if user is logged in and grabs their wine list
  $scope.wineList = wineCellar.wineList;//displays users wine list

 }]);
