'use strict';


angular.module('F1FeederApp', [
  'F1FeederApp.controllers','F1FeederApp.services','ngRoute'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/login", {templateUrl: "partials/login.html", controller: "loginController"}).
 when("/signup", {templateUrl: "partials/signup.html", controller: "signupController"}).
  when("/list", {templateUrl: "partials/list.html", controller: "listController"}).
  when("/logout", {templateUrl: "partials/list.html", controller: "logoutController"}).
   when("/listtoadd", {templateUrl: "partials/listtoadd.html"}).
 otherwise({redirectTo: '/list'});
}]);