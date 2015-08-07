angular.module('BlogApp.controllers', []).
controller('HomeController', function($scope,ergastAPIservice,$location,$anchorScroll)
{
  $scope.heading = "";
	$scope.title = "";
	$scope.post = "";
  $scope.username = "";
  $scope.CurrentSalary = "";
  $scope.DesiredSalary = "";
	$scope.user = [];
   IN.Event.on(IN, "auth", $scope.OnLinkedInAuth);
   console.log("in controller");

    $scope.OnLinkedInAuth =function ()
    {
        IN.API.Profile("me").result($scope.ShowProfileData);
    }

    $scope.ShowProfileData=function (profiles)
    {
        $scope.user = profiles.values[0];
        ergastAPIservice.GetLinkedinProfileData().success(function(response)
        {
          $scope.user.FullProfileData = response;
        });
        $location.path("/CandidateProfile");
//        $scope.$apply();
    }

    $scope.Post = function()
    {
        $scope.user.CurrentSalary = $scope.CurrentSalary;
        $scope.user.DesiredSalary = $scope.DesiredSalary;
        $scope.user.Hired = false;
        ergastAPIservice.Post($scope.user).success(function(response)
        {
          console.log(response);
//            $location.path("/Home");
        });
    }
    $scope.Scroll = function(id)
    {
      $location.hash(id);
      $anchorScroll();
    }

   

    ergastAPIservice.getUsername().success(function(response)
    {
      $scope.username = response;
    });
}).controller('ProfileController',function($scope,ergastAPIservice,$location)
{
  $scope.submit = function()
  {
    ergastAPIservice.signupfunc($scope.username,$scope.email,$scope.password).success(function(res)
    {
      $('#Modal1').modal('hide');
      $scope.username=null;
      $scope.email=null;
      $scope.password=null;
    });
  }
}).controller('SignUpController',function($scope,ergastAPIservice,$location)
{
  $scope.submit = function()
  {
    ergastAPIservice.signupfunc($scope.username,$scope.email,$scope.password).success(function(res)
    {
      $('#Modal1').modal('hide');
      $scope.username=null;
      $scope.email=null;
      $scope.password=null;
    });
  }
}).controller('LoginController',function($scope,ergastAPIservice,$location)
{
  $scope.submit = function()
  {
    ergastAPIservice.loginfunc($scope.username,$scope.password).success(function(res)
    {
      $('#Modal2').modal('hide');
      if(!res.error)
      {
        $("#Modal2").on('hidden.bs.modal', function()
        {
          $location.path("/OrganizationProfile");
          $scope.$apply();
        });
      }
      else
      {
        $scope.username=null;
        $scope.password=null; 
        $scope.$apply();
      }
    });
  }
}).controller('AboutUsController',function($scope,ergastAPIservice,$location)
{
  $scope.company={};
  $scope.users={};
  $scope.gotoBottom = function(id)
  {
    $location.hash(id);
    $anchorScroll();
  };
  $scope.senddata=function()
  {
    $scope.users={usermeta:$scope.formval};
  }
  ergastAPIservice.getuserfunc().success(function(res)
  {
    if(res=="")
    {
      $location.path("/Organization");
    }       
  });
  ergastAPIservice.aboutusfunc().success(function(res)
  {
    $scope.company=res;
  });
  $scope.logout=function()
  {
    ergastAPIservice.logoutfunc().success(function(res)
    {
      if(res)
      {
        $location.path("/Organization");
      } 
    });
  }
});