myApp.controller('MoreInfoController', function($scope,$animate, $mdDialog, WineCellarService) {
  var wineCellar = WineCellarService;
  wineCellar.checkUserLoggedIn();
  //function that is called when the wine is clicked on the homepage
  $scope.showMore = function(ev, wine) {

   $scope.wine = wine;

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
