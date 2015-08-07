angular.module('organizationview.controllers',[]).
controller('signupController',function($scope,organizationservices,$location){
console.log("signup begin2");
    $scope.submit = function(){
      console.log("signup begin");
      organizationservices.signupfunc($scope.username,$scope.email,$scope.password).success(function(res){
        console.log("signup");
        $('#myModal').modal('hide');
        $scope.$apply();
        $scope.username=null;
        $scope.email=null;
        $scope.password=null;
      });
    }
}).
controller('loginController',function($scope,organizationservices,$location){
  console.log("logged in begin");
  $scope.submit = function(){
    console.log("logged in begin2",$scope.username);
    console.log("logged in begin2 password",$scope.password);
    organizationservices.loginfunc($scope.username,$scope.password).success(function(res){
      console.log("logged in");
      $('#myModal2').modal('hide');
     // $('#myModal2').close();
     // modal.close();
      if(!res.error){
        $("#myModal2").on('hidden.bs.modal', function () {
    $location.path("/aboutus");
    $scope.$apply();
});
      }
      else{
        $scope.username=null;
        $scope.password=null; 
        $scope.$apply();
      }
      
    });
  }
}).
controller('aboutusController',function($scope,organizationservices,$location){
  $scope.company={};
    organizationservices.aboutusfunc().success(function(res){
      $scope.company=res;
      console.log("Compay name",$scope.company.username);
    });
});
