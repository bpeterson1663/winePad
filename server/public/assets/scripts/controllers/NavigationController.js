myApp.controller('NavigationController', function ($scope, $http, $timeout, $mdSidenav, $mdDialog, $mdMedia, $log, WineCellarService) {
    var wineCellar = WineCellarService;
    wineCellar.checkUserLoggedIn();
    $scope.userInfo = wineCellar;
    //logOutUswer function not working
    $scope.logOutUser = function(){
        $http.get('/logout').then(function(response){
              console.log("LOGGED OUT");
              res.redirect('/assets/views/login.html');
          });
    };
    //Angular Material for side-nav
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }

    $scope.wineList = wineCellar.wineList;

      $scope.isFullscreen = false;
      $scope.toggleFullScreen = function() {
          $scope.isFullscreen = !$scope.isFullscreen;
      }
    //function that is called when the wine is clicked on the homepage

    $scope.showWineList = function(ev) {
      wineCellar.getWineList();
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
        console.log("Wine inventory before being sold", sellWine.inventory);
        sellWine.inventory--;//subtract one bottle from inventory
        console.log("New Wine inventory after being sold: ",sellWine.inventory);
        wineCellar.editWine(sellWine);
        $scope.status = $scope.showWineList();
      }, function() {
        $scope.status = $scope.showWineList();//reload list
      });
  };




  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });
