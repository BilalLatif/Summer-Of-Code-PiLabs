

angular.module('F1FeederApp.services', []).
  factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.signupfunc = function(usr,email,pass) {
     return  $http.post('/Signup',{username:usr,email:email,password:pass});
    }
    ergastAPI.loginfunc = function(usr,pass) {
     return  $http.post('/Login',{username:usr,password:pass});
    }
    ergastAPI.showlistfunc = function() {
      return $http({
        method: 'GET', 
        url: '/showlist'
      });
    }
    ergastAPI.logoutfunc = function() {
      return $http({
        method: 'GET', 
        url: '/logout'
      });
    }
    ergastAPI.blogupdatefunc = function(title1,txt,usrname,d) {
     return  $http.post('/blogupdate',{title1:title1,txt:txt,username:usrname,time:d});
    }
    return ergastAPI;
  });