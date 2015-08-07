angular.module('organizationview.services',[]).
factory('organizationservices',function($http){
  var myAPI={};

  myAPI.signupfunc = function(username,email,password){
    return $http.post('/Signup',{username:username,email:email,password:password});
  }
  myAPI.loginfunc = function(username,password){
    console.log("in services",username);
    return $http.post('/Login',{username:username,password:password});
  }
  myAPI.aboutusfunc = function() {
      return $http({
        method: 'GET', 
        url: '/aboutus'
      });
    }

  return myAPI;
});