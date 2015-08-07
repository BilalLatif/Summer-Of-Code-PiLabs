'use strict';

angular.module('StoreCornerApp', ['StoreCornerApp.controllers','StoreCornerApp.services','ngRoute']).config(['$routeProvider', function($routeProvider)
{
	$routeProvider.when("/SignIn", {templateUrl: "partials/signin.html", controller: "SignInController"}).when("/SignUp", {templateUrl: "partials/signup.html", controller: "SignUpController"}).when("/Rooms", {templateUrl: "partials/rooms.html", controller: "RoomController"}).when("/PublicRooms", {templateUrl: "partials/publicrooms.html", controller: "PublicRoomController"}).when("/Story/:id", {templateUrl: "partials/story.html", controller: "StoryController"}).when("/PublicStory/:id", {templateUrl: "partials/publicstory.html", controller: "PublicStoryController"}).when("/Contact", {templateUrl: "partials/contact.html", controller: "PublicRoomController"}).when("/Logout", {templateUrl: "partials/signin.html", controller: "RoomController"}).otherwise({redirectTo: '/PublicRooms'});
}]);