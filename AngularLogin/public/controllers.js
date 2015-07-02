angular.module('F1FeederApp.controllers', []).
controller('loginController', function($scope,ergastAPIservice,$location) {
  console.log("in login contr");
    $scope.submit=function(){
       ergastAPIservice.loginfunc($scope.username,$scope.password).success(function(res){
        console.log("list");
        if(!res.error)
            $location.path("/listtoadd");
      });
    }
    
}).
controller('signupController', function($scope,ergastAPIservice,$location) {
   $scope.submit=function(){

      ergastAPIservice.signupfunc($scope.username,$scope.email,$scope.password).success(function(res){
            $location.path("/login");
      });
    }
     
}).controller('listController', function($scope,ergastAPIservice,$location) {
  console.log("in controller");
    $scope.blogsdata=[];
      setInterval(function(){
        ergastAPIservice.showlistfunc().success(function(res){
          console.log(res[0].txt);
            $scope.blogsdata=res;
      });  
      },3000);
          
}).controller('blogController', function($scope,ergastAPIservice,$location) {
    $scope.usrname="";
    var d=new Date();
    $scope.submit=function(){
        ergastAPIservice.blogupdatefunc($scope.title1,$scope.txt,$scope.usrname,d).success(function(res){
            $location.path("/list")
      });  
          }
}).
controller('logoutController', function($scope,ergastAPIservice,$location) {

      ergastAPIservice.logoutfunc().success(function(res){
            
      });
     
});