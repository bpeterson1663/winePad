//controller with the name WineController with paramaters of $scope $http and a factory of WineCellar
myApp.controller("AddWineController", ["$scope", "$location", "$mdDialog", "$mdMedia", "WineCellarService", function($scope, $location, $mdDialog, $mdMedia, WineCellarService){
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

    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showAddConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Would you like to add another wine?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

      $mdDialog.show(confirm).then(function() {
        $scope.status = 'Add Another Wine';
      }, function() {
        $scope.status = $location.path("/index.html");
      });
    };

    function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

}]);

myApp.controller("ShowWineController", ["$scope", '$http', "WineCellarService", function($scope, $http, WineCellarService){
  //store the factory object in wineCellar
    var wineCellar = WineCellarService;
    wineCellar.getWineList();

    $scope.wineList = wineCellar.wineList;
}]);

myApp.controller("DeleteUpdateController", ["$scope", "$mdDialog","$mdMedia", "WineCellarService", function($scope, $mdDialog, $mdMedia, WineCellarService){
  //store the factory object in wineCellar
    var wineCellar = WineCellarService;
    wineCellar.getWineList();
    $scope.wineList = wineCellar.wineList;


  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  $scope.showConfirm = function(ev, wine) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this?')
          .textContent('This will remove the wine and all of its information from your cellar.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

    $mdDialog.show(confirm).then(function() {
      $scope.status = wineCellar.deleteWine(wine);
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };

  function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
}]);
