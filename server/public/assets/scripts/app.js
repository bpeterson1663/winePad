var myApp = angular.module("myApp", ["ngRoute", "ngMaterial", "ngAnimate"]);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
    when('/home', {
      templateUrl: "/assets/views/routes/home.html",
      controller: "ShowWineController"
    }).
    when('/add', {
      templateUrl: "/assets/views/routes/add.html",
      controller: "AddWineController"
    }).
    when('/deleteUpdate', {
      templateUrl: "/assets/views/routes/deleteUpdate.html",
      controller: "DeleteUpdateController"
    }).
    when('/wineDisplay', {
      templateUrl: "/assets/views/routes/wineDisplay.html",
      controller: "WineDisplayController"
    }).
    otherwise({
      redirect:'/home'
    });
}]);

myApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red', {
      'default': '800',
      'hue-1': '500',
      'hue-2': '700',
      'hue-3': '900'
    })
    .accentPalette('grey', {
      'default': '900'
    });
});
