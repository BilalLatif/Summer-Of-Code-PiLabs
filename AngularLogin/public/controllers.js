angular.module('F1FeederApp.controllers', []).
controller('loginController', function($scope,ergastAPIservice,$location) {
  console.log("in login contr");
    $scope.submit=function(){
       ergastAPIservice.loginfunc($scope.username,$scope.password).success(function(res){
        console.log("list");
        if(!res.error){
          $location.path("/listtoadd");
        }
            
      });
    }
    ergastAPIservice.getuserfunc().success(function(res){
      if(res!=""){
         $location.path("/listtoadd");
      }
           
      });
    
}).
controller('signupController', function($scope,ergastAPIservice,$location) {
   $scope.submit=function(){

      ergastAPIservice.signupfunc($scope.username,$scope.email,$scope.password).success(function(res){
            $location.path("/login");
      });
    }
    ergastAPIservice.getuserfunc().success(function(res){
      if(res!=""){
         $location.path("/list");
      }
           
      });
     
}).controller('listController', function($scope,ergastAPIservice,$location) {
  console.log("in controller");
    $scope.blogsdata=[];
      setInterval(function(){
        ergastAPIservice.showlistfunc().success(function(res){
          console.log(res[0].txt);
            $scope.blogsdata=res;
      });  
      },3000);
      $scope.logout=function(){
        ergastAPIservice.logoutfunc().success(function(res){
           if(res){
            $location.path("/list");
           } 
      });
      }
      ergastAPIservice.getuserfunc().success(function(res){
      if(res==""){
         $location.path("/list");
      }
           
      });
          
}).controller('blogController', function($scope,ergastAPIservice,$location) {
    $scope.usrname="";
    var d=new Date();
    $scope.submit=function(){
        ergastAPIservice.blogupdatefunc($scope.title1,$scope.txt,$scope.usrname,d).success(function(res){
            $location.path("/list");
      });  
          }
          ergastAPIservice.getuserfunc().success(function(res){
      if(!res){
         $location.path("/list");
      }
           
      });
}).controller('imgcontroller', function($scope,ergastAPIservice,$location) {
  console.log("in c");
  $scope.uploadFile = function(element) {
  console.log("in c in");
  $scope.files=element.files;
   console.log(element[0].name);
   var file=element[0].name;
   console.log("hjggdjh",file);

}
$scope.addFile = function() {
  console.log($scope.files);
   var fso  = new ActiveXObject("Scripting.FileSystemObject");
   var fh = fso.CreateTextFile("c:\\Test.bmp", true);
   fh.WriteLine("Some text goes here...");
   fh.Close();
}
});