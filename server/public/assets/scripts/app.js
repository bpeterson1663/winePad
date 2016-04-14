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
    when('/reports', {
      templateUrl: "/assets/views/routes/reports.html"
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
      'default': '800', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '500', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '700', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': '900' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('grey', {
      'default': '900' // use shade 200 for default, and keep all other shades the same
    });
});
