'use strict';

angular.module('BlogApp', ['BlogApp.controllers','BlogApp.services','ngAnimate','ngRoute']).config(['$routeProvider', function($routeProvider)
{
	$routeProvider.when("/rateit", {templateUrl: "partials/rateit.html", controller: "rateitController"}).
	when("/signup", {templateUrl: "partials/signup.html", controller: "SignUpController"}).
	when("/login", {templateUrl: "partials/login.html", controller: "LoginController"}).
	when("/personalities", {templateUrl: "partials/personalities.html", controller: "rateitController"}).
	when("/about", {templateUrl: "partials/about.html", controller: "homeController"}).
	when("/home", {templateUrl: "partials/home.html", controller: "homeController"}).
	when("/", {templateUrl: "partials/home.html", controller: "homeController"}).
	when("/MyAdminPanelForAngularJsRatingSite", {templateUrl: "partials/MyAdminPanelForAngularJsRatingSite.html", controller: "AdminController"}).
	otherwise({redirectTo: '/'});
}])
.animation('.reveal-animation', function() {
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      element.fadeIn(2000, done);
      return function() {
        element.stop();
      }
    },
    leave: function(element, done) {
      element.fadeOut(2000, done)
      return function() {
        element.stop();
      }
    }
  }
});