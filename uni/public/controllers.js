angular.module('BlogApp.controllers', []).
controller('homeController', function($scope,ergastAPIservice,$location,$anchorScroll)
{
console.log("con");
  console.log("out scroll");
 

    
}).controller('SignUpController',function($scope,ergastAPIservice,$location,$route)
{
  console.log("in sc");
  $scope.submit = function()
  {
    ergastAPIservice.signupfunc($scope.username,$scope.email,$scope.password).success(function(res)
    {
      if(!res.error){
        
        console.log("signup succesful");
        alert("Registered Succesfully");
        $location.path('/login');
      }
      else{
        alert("Already Exist");
        $route.reload();
      }
    });
  }
}).controller('LoginController',function($scope,ergastAPIservice,$location,$route)
{
  ergastAPIservice.getuserfunc().success(function(res)
    {
      if(res!=""){
          $location.path('/rateit'); 
      }
    });

  $scope.submit = function()
  {
        console.log("in login");

    ergastAPIservice.loginfunc($scope.username,$scope.password).success(function(res)
    {
        console.log("in login func",$scope.username);

      if(!res.error)
      {
        console.log("about to redirect");
        $location.path('/rateit');
  
      }
      else
      {
        alert("Incorrect username or Password");
        console.log("login failed c");
        console.log("about to redirect");
        $route.reload();
      }
    });
  }
}).controller('rateitController',function($scope,ergastAPIservice,$location)
{

        $scope.tab = 1;

        $scope.setTab = function (tabId) {
            $scope.tab = tabId; 
    ergastAPIservice.personalitiesfunc($scope.tab).success(function(res)
    {
      $scope.images=res;
      console.log("skjdsku1",$scope.tab);
    });
        };

        $scope.isSet = function (tabId) {
            return $scope.tab === tabId;
        };
  console.log("in rate");
  ergastAPIservice.getuserfunc().success(function(res)
    {
      if(res==""){
          $location.path('/personalities'); 
      }
    });
  console.log("checking");
ergastAPIservice.personalitiesfunc($scope.tab).success(function(res)
    {
      $scope.images=res;
      console.log("skjdsku",$scope.tab);
    });
 

 
  $scope.like=function(id){
     console.log("in like",id);
      ergastAPIservice.personlikefunc(id).success(function(res)
      {
           console.log("Data Added",res);
    ergastAPIservice.personalitiesfunc($scope.tab).success(function(res)
    {
      $scope.images=res;
      console.log("abey aja",res);
    });
      });

  } 
   $scope.unlike=function(id){
     console.log("in unlike",id);
     ergastAPIservice.personunlikefunc(id).success(function(res)
      {
           console.log("Data Added",res);
           ergastAPIservice.personalitiesfunc($scope.tab).success(function(res)
    {
      $scope.images=res;
      console.log("abey aja",res);
    });
      });
  } 
   $scope.logout=function()
  {
    console.log("in logout");
    ergastAPIservice.logoutfunc().success(function(res)
    {
      if(!res.error)
      {
        $location.path('/personalities');  
      } 
    });
  }

}).controller('AdminController',function($scope,ergastAPIservice,$location,$route)
{
  $scope.submit=function(){
$scope.tlikes=0;
$scope.tdislikes=0;
   ergastAPIservice.personinsertfunc($scope.timage,$scope.tusername,$scope.tlikes,$scope.tdislikes,$scope.tdep).success(function(res)
  
  {
          console.log("Data Added",$scope.tusername);
          $route.reload();
  });
   }
});