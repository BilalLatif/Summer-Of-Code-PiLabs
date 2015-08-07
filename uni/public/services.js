angular.module('BlogApp.services', []).factory('ergastAPIservice', function($http)
{
  var ergastAPI = {};
  ergastAPI.signupfunc = function(username,email,password)
  {
    return $http.post('/Signup',{username:username,email:email,password:password});
  }
  ergastAPI.loginfunc = function(username,password)
  {
    return $http.post('/Login',{username:username,password:password});
  }
  ergastAPI.personinsertfunc = function(timage,tusername,tlikes,tdislikes,tdep)
  {
    return $http.post('/personinsert',{timage:timage,tusername:tusername,tlikes:tlikes,tdislikes:tdislikes,tdep:tdep});
  }
  ergastAPI.personalitiesfunc = function(dep)
  {
    console.log("dep",dep);
    return $http.post('/person',{dep:dep});
     /* return $http({
        method: 'GET', 
        url: '/person'
      });*/
  }
  ergastAPI.logoutfunc = function()
     {
      return $http({
        method: 'GET', 
        url: '/logout'
      });
    }
    ergastAPI.getuserfunc = function() {
     return $http({
        method: 'GET', 
        url: '/getuser'
      });
    }
  ergastAPI.personlikefunc = function(tid)
  {
    return $http.post('/personlike',{tid:tid});
  }
  ergastAPI.personunlikefunc = function(tid)
  {
    return $http.post('/personunlike',{tid:tid});
  }
  return ergastAPI;
});