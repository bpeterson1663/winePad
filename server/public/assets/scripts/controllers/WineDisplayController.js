myApp.controller('WineDisplayController', function($scope, $mdDialog, WineCellarService, $location) {
  var wineCellar = WineCellarService;
  wineCellar.checkUserLoggedIn();
  wineCellar.getWineList();
  $scope.wineList = wineCellar.wineList;

    $scope.isFullscreen = false;
    $scope.toggleFullScreen = function() {
        $scope.isFullscreen = !$scope.isFullscreen;
    }
  //function that is called when the wine is clicked on the homepage
  $scope.showWineList = function(ev) {
   $mdDialog.show({
     controller: ShowWineListDialog,
     templateUrl: 'dialogs/wineList.html',//redirects to the wine list dialog fullscreen view
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true,
     scope: $scope,
     preserveScope: true
   }).then(function(answer) {
         $scope.status = 'You said the information was "' + answer + '".';
       }, function() {
         $scope.status = 'You cancelled the dialog.';
       });
     };

  function ShowWineListDialog($scope, $mdDialog) {
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
//show More function on the Wine List Fullscreen Display
  $scope.showMore = function(ev, wine) {

   $scope.wine = wine;

   $mdDialog.show({
     controller: ShowMoreDialogController,
     templateUrl: 'dialogs/moreInfoWineList.html',//redirects to the moreInfoWinelist dialog
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true,
     scope: $scope,
     preserveScope: true
   }).then(function(answer) {
         $scope.status = 'You said the information was "' + answer + '".';
       }, function() {
         $scope.status = 'You cancelled the dialog.';
       });
     };

  function ShowMoreDialogController($scope, $mdDialog) {
       $scope.hide = function() {
         $mdDialog.hide();
       };
       $scope.cancel = function() {
         $mdDialog.cancel();
         $scope.status = $scope.showWineList();//when canceled out of moreInfoWineList re show the wine list fullscreen
       };
       $scope.answer = function(answer) {
         $mdDialog.hide(answer);
       };
  }

  $scope.confirmSold = function(ev, sellWine) {//when hidden button is pressed pass in the wine to be sold
    //confirmation message
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete one of these bottles from inventory?')
          .ariaLabel('Sell Wine')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');
    $mdDialog.show(confirm).then(function() {
      //NOT WORKING CURRENTLY
      sellWine.inventory = parseInt(sellWine.inventory) - 1;//subtract one bottle from inventory
      console.log("New Wine inventory after being sold: ",sellWine.inventory);
      if(sellWine.inventory == 0){//if last bottle is sold remove from list
        wineCellar.deleteWine(sellWine);
      }
      wineCellar.editWine(sellWine);
      $scope.status = $scope.showWineList();//reload list
    }, function() {
      $scope.status = $scope.showWineList();;//redirect back to listif they press no
    });
};

});
