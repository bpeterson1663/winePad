myApp.controller("DeleteUpdateController", ["$scope", "$http", "$window", "$mdDialog","$mdMedia", "WineCellarService", function($scope, $http, $window, $mdDialog, $mdMedia, WineCellarService){

  $http.get("/user").then(function(response){
        if(response.data !== true){
          console.log("NOT LOGGED IN!");
        $window.location.href = '/assets/views/login.html';
        } else {
          console.log("LOGGED IN! ", response.data);
          $http.get("/user/name").then(function(response){
              console.log(response.data);
          });
        }
    });
  //store the factory object in wineCellar
    var wineCellar = WineCellarService;
    wineCellar.getWineList();
    $scope.wineList = wineCellar.wineList;
  $scope.showConfirm = function(ev, wine) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this?')
          .textContent('This will remove the wine and all of its information from your cellar.')
          .ariaLabel('Delete Wine')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

    $mdDialog.show(confirm).then(function() {
      $scope.status = wineCellar.deleteWine(wine);
    }, function() {
      $scope.status = 'Deleted Nothing';
    });
  };
//Edit
$scope.edit = function(ev, wine) {
    $scope.wine = wine;
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialogs/editWine.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      scope: $scope,
      preserveScope: true
    })
    .then(function(answer) {
      $scope.status = wineCellar.getWineList();;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  function DialogController($scope, $http, $mdDialog, WineCellarService) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(response, wine) {
      $mdDialog.hide(response);
      $http.put("/updateWine"+ wine._id, wine).then(WineCellarService.getWineList());
    };
  }
}]);
