//controller with the name WineController with paramaters of $scope $http and a factory of WineCellar
myApp.controller("AddWineController", ["$scope", "$window", "$location", "$mdDialog","$http", "$mdMedia", "WineCellarService", function($scope, $window, $location, $mdDialog, $http, $mdMedia, WineCellarService){
  //store the factory object in wineCellar
    var wineCellar = WineCellarService;
    wineCellar.checkUserLoggedIn();
    wineCellar.getWineList();
    //information collected from the dom and then passed into the searchWine function
    $scope.search = function(ev, winery){
        wineCellar.searchWine(winery);
        wineCellar.getWine();
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: DialogControllerSearch,
          templateUrl: 'dialogs/searchResults.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen,
          scope: $scope,
          preserveScope: true
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    //set a variable on the scope that is equal to the wineCellar object to be displayed on the dom
      $scope.wineSelection = wineCellar;
      wineList = wineCellar;
      console.log("Wine Cellar.data is : ", $scope.wineSelection);
    };
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
    $scope.showAddConfirm = function(ev, addWine) {
      wineCellar.addWine(addWine);
      wineCellar.getWineList();
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Would you like to add another wine?')
            .ariaLabel('Add Wine')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $scope.status = 'Add Another Wine';
      }, function() {
        $scope.status = $location.url("home");
      });
  };
  function DialogControllerSearch($scope, $mdDialog) {
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

myApp.controller('MoreInfoController', function($scope, $sce, $mdDialog) {
  $scope.showMore = function(ev, wine) {
   $scope.wine = wine;

   $scope.trustSrc = function(src){
     console.log(src);
     return $sce.trustAsResourceUrl(src);
   };

   $mdDialog.show({
     controller: ShowMoreDialogController,
     templateUrl: 'dialogs/moreInfoWindow.html',
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
       };
       $scope.answer = function(answer) {
         $mdDialog.hide(answer);
       };
  }
});

myApp.controller('ProgressWheel', ['$interval',
    function($interval) {
      var self = this;
      self.activated = false;
      self.determinateValue = 30;
      // Iterate every 100ms, non-stop and increment
      // the Determinate loader.
      $interval(function() {
        self.determinateValue += 1;
        if (self.determinateValue > 100) {
          self.determinateValue = 30;
        }
      }, 100);
    }
  ]);

myApp.controller("ShowWineController", ["$scope", '$http', "$window", "WineCellarService", function($scope, $http, $window, WineCellarService){
  //store the factory object in wineCellar
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
    var wineCellar = WineCellarService;
    wineCellar.getWineList();

    $scope.wineList = wineCellar.wineList;
}]);

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


myApp.controller('NavigationController', function ($scope, $http, $timeout, $mdSidenav, $log) {
    $scope.logOutUser = function(){
        $http.get('/logout').then(function(response){
              console.log("LOGGED OUT");
              res.redirect('/assets/views/login.html');
          });
    };

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
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
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
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
