var myApp = angular.module("myApp", ["ngRoute"]);

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
      templateUrl: "/assets/views/routes/deleteUpdate.html"
    }).
    when('/reports', {
      templateUrl: "/assets/views/routes/reports.html"
    }).
    otherwise({
      redirect:'/home'
    });
}]);
