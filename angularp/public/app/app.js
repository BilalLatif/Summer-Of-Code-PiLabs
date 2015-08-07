'use strict';

angular.module('organizationview',['organizationview.controllers','organizationview.services','ngRoute']).config([
	'$routeProvider',function($routeProvider){
		$routeProvider.when("/frontpage",{templateUrl:"partials/frontpage.html"}).
		when("/aboutus",{templateUrl:"partials/aboutus.html",controller:"aboutusController"}).
		otherwise({redirectTo:'/frontpage'});
	}]);