'use strict';

angular.module('BlogApp', ['BlogApp.controllers','BlogApp.services','ngRoute']).config(['$routeProvider', function($routeProvider)
{
	$routeProvider.when("/Home", {templateUrl: "partials/home.html", controller: "HomeController"})
	.when("/Organization", {templateUrl: "partials/organization.html", controller: "HomeController"})
	.when("/Candidate", {templateUrl: "partials/candidate.html", controller: "HomeController"})
	.when("/CandidateProfile", {templateUrl: "partials/profile.html", controller: "HomeController"})
	.when("/OrganizationProfile",{templateUrl:"partials/orgprofile.html",controller:"AboutUsController"})
	.when("/Organization",{templateUrl:"partials/organization.html",controller:"HomeController"})
	.when("/JobSeekers",{templateUrl:"partials/jobseekers.html",controller:"AboutUsController"})
	.otherwise({redirectTo: '/Home'});
}]);