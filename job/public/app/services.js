angular.module('BlogApp.services', []).factory('ergastAPIservice', function($http)
{
  var ergastAPI = {};
  ergastAPI.Post = function(CandidateProfile)
  {
    return $http.post('/Post', {CandidateProfile});
  }
  ergastAPI.getUser = function(a,b)
  {
    return $http.post('/login', {username:a,password:b});
  }
  ergastAPI.postUser = function(a,b,c)
  {
    return $http.post('/register', {username:a,email:b,password:c});
  }
  ergastAPI.postBlog = function(a,b,c)
  {
    return $http.post('/postblog', {heading:a,title:b,post:c});
  }
  ergastAPI.getBlogs = function()
  {
    return $http.get('/getblog', {});
  }
  ergastAPI.GetLinkedinProfileData = function()
  {
    return $http.get('/GetLinkedinProfileData', {});
  }
  ergastAPI.getUsername = function()
  {
    return $http.get('/getuser', {});
  }
  ergastAPI.logout = function()
  {
    return $http.get('/logout', {});
  }
  ergastAPI.signupfunc = function(username,email,password)
  {
    return $http.post('/Signup',{username:username,email:email,password:password});
  }
  ergastAPI.loginfunc = function(username,password)
  {
    return $http.post('/Login',{username:username,password:password});
  }
  ergastAPI.aboutusfunc = function()
  {
      return $http({
        method: 'GET', 
        url: '/aboutus'
      });
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

  return ergastAPI;
});