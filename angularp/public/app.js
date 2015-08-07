'use strict';

angular.module('organizationview',['organizationview.controllers','organizationview.services','ngRoute']).config([
	'$routeProvider',function($routeProvider){
		$routeProvider.when("/home",{templateUrl:"partials/home.html",controller:"homeController"}).
		when("/aboutus",{templateUrl:"partials/orgprofile.html",controller:"aboutusController"}).
		when("/Organization",{templateUrl:"partials/organization.html",controller:"homeController"}).
		when("/jobseekers",{templateUrl:"partials/jobseekers.html",controller:"aboutusController"}).
		otherwise({redirectTo:'/home'});
	}]);