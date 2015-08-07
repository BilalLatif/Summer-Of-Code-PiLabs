angular.module('StoreCornerApp.services', []).factory('ergastAPIservice', function($http)
{
  var ergastAPI = {};

  ergastAPI.GetUser = function(a,b)
  {
    return $http.post('/Login', {username:a,password:b});
  }
  ergastAPI.GetPublicRoom = function()
  {
    return $http.get('/GetPublicRoom', {});
  }
  ergastAPI.GetFullName = function()
  {
    return $http.get('/GetUser', {});
  }
  ergastAPI.GetRoom = function()
  {
    return $http.get('/GetRoom', {});
  }
  ergastAPI.GetComment = function()
  {
    return $http.get('/GetComment', {});
  }
  ergastAPI.GetStory = function(id)
  {
    return $http.post('/GetStory', {id:id});
  }
  ergastAPI.GetGroupName = function(id)
  {
    return $http.post('/GetGroupName', {id:id});
  }
  ergastAPI.Logout = function()
  {
    return $http.get('/Logout', {});
  }
  ergastAPI.PostUser = function(a,b,c,d)
  {
    return $http.post('/Register', {fullname:a,username:b,email:c,password:d});
  }
  ergastAPI.PostStory = function(a,b,c,d)
  {
    return $http.post('/PostStory', {title:a,post:b,groupid:c,groupname:d});
  }
  ergastAPI.PostRoom = function(a)
  {
    return $http.post('/PostRoom', {title:a});
  }
  ergastAPI.PostComment = function(a,b)
  {
    return $http.post('/PostComment', {comment:a,postid:b});
  }
  return ergastAPI;
});