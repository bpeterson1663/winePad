//controller with the name WineController with paramaters of $scope $http and a factory of WineCellar
myApp.controller("AddWineController", ['$scope', '$http', 'WineCellarService', function($scope, $http, WineCellarService){
  //store the factory object in wineCellar
    var wineCellar = WineCellarService;
    wineCellar.getWineList();
    //information collected from the dom and then passed into the searchWine function
    $scope.search = function(winery){
        wineCellar.searchWine(winery);
        wineCellar.getWine();
    };
    //set a variable on the scope that is equal to the wineCellar object to be displayed on the dom
    $scope.wineSelection = wineCellar;
    wineList = wineCellar;
    console.log("Wine Cellar.data is : ", $scope.wineSelection);
    //when addWine button is clicked on client side
    $scope.addWine = function(addWine){
      wineCellar.addWine(addWine);
      wineCellar.getWineList();
    };

    $scope.manuallyAdd = function(addWine){
      wineCellar.manuallyAddWine(addWine);
      wineCellar.getWineList();
    };
}]);

myApp.controller("ShowWineController", ["$scope", '$http', "WineCellarService", function($scope, $http, WineCellarService){

    WineCellarService.getWineList();

    $scope.wineList = WineCellarService.wineList;
}]);
