angular.module('StoreCornerApp.controllers', []).
controller('SignInController', function($scope,ergastAPIservice,$location)
{
    $scope.username = "";
    $scope.password = "";
    $scope.error = false;
	ergastAPIservice.GetFullName().success(function(response)
    {
    	if(response != "")
    		$location.path("/Rooms");
    });
    
	$scope.GetUser = function()
	{
        $scope.error = false;
        ergastAPIservice.GetUser($scope.username.toLowerCase(),$scope.password).success(function(response)
        {
            if(response.error)
            {
                $scope.username = "";
                $scope.password = "";
                $scope.error = true;
            }
            else
                $location.path("/Rooms");
        });
    }
}).controller('SignUpController', function($scope,ergastAPIservice,$location)
{
    $scope.fullname = "";
	$scope.username = "";
	$scope.email = "";
	$scope.password = "";
    $scope.error= false;
    $scope.message= "";
	ergastAPIservice.GetFullName().success(function(response)
    {
    	$scope.username = response;
    	if($scope.username != "")
    		$location.path("/Rooms");
    });
	$scope.PostUser = function()
	{
    	ergastAPIservice.PostUser($scope.fullname,$scope.username.toLowerCase(),$scope.email,$scope.password).success(function(response)
    	{
            if(response.msg == "username")
            {
                $scope.error = true;
                $scope.message = "Username Already Exists";
                $scope.fullname = "";
                $scope.username = "";
                $scope.email = "";
                $scope.password = "";
            }
            else if(response.msg == "email")
            {
                $scope.error = true;
                $scope.message = "Email Address Already Exists";
                $scope.fullname = "";
                $scope.username = "";
                $scope.email = "";
                $scope.password = "";
            }
            else
    		  $location.path("/SignIn");
    	});
	}
}).controller('RoomController', function($scope,ergastAPIservice,$location,$route,$routeParams)
{
    $scope.fullname = "";
	$scope.title = "";
    $scope.post = "";
	$scope.rooms = [];
	ergastAPIservice.GetRoom().success(function(response)
    {
    	$scope.rooms = response;
    	for (var i in response)
    	{
    		$scope.rooms[i].timestamp = new Date($scope.rooms[i].timestamp).toGMTString();
    	}
    });
	ergastAPIservice.GetFullName().success(function(response)
    {
    	$scope.fullname = response;
    	if($scope.fullname =="")
    		$location.path("/SignIn");
    });
	$scope.Logout = function()
	{
    	ergastAPIservice.Logout().success(function(response)
    	{
    		$location.path("/SignIn");
    	});
	}
    $scope.PostRoom = function()
    {
        ergastAPIservice.PostRoom($scope.title).success(function(response)
        {
            $('#myModal').modal('hide');
            $scope.title = "";
            $route.reload();
        });
    }
}).controller('StoryController', function($scope,ergastAPIservice,$location,$route,$routeParams)
{
    $scope.fullname = "";
    $scope.story = [];
    $scope.comments = [];
    $scope.groupid=$routeParams.id;
    $scope.groupname = "";
    $scope.title="";
    $scope.post="";
    $scope.comment="";
    ergastAPIservice.GetGroupName($scope.groupid).success(function(response)
    {
        $scope.groupname = response;
    });
    ergastAPIservice.GetStory($scope.groupid).success(function(response)
    {
        $scope.story = response;
        for (var i in response)
        {
            $scope.story[i].timestamp = new Date($scope.story[i].timestamp).toGMTString();
        }
    });
    ergastAPIservice.GetFullName().success(function(response)
    {
        $scope.fullname = response;
        if($scope.fullname =="")
            $location.path("/SignIn");
    });
    $scope.Logout = function()
    {
        ergastAPIservice.Logout().success(function(response)
        {
            $location.path("/SignIn");
        });
    }
    $scope.PostStory = function()
    {
        ergastAPIservice.PostStory($scope.title,$scope.post,$scope.groupid).success(function(response)
        {
            $('#myModal').modal('hide');
            $scope.title = "";
            $scope.post = "";
            $route.reload();
        });
    };
    $scope.PostComment = function(postid,object)
    {
        ergastAPIservice.PostComment(object.comment,postid).success(function(response)
        {
            object.comment="";
        });
        ergastAPIservice.GetComment().success(function(response)
        {
            $scope.comments = response;
            for (var i in response)
            {
                $scope.comments[i].timestamp = new Date($scope.comments[i].timestamp).toGMTString();
            }
        });
    }
    ergastAPIservice.GetComment().success(function(response)
    {
        $scope.comments = response;
        for (var i in response)
        {
            $scope.comments[i].timestamp = new Date($scope.comments[i].timestamp).toGMTString();
        }
    });
}).controller('PublicRoomController', function($scope,ergastAPIservice,$location)
{
    $scope.username = "";
    $scope.rooms = [];
    ergastAPIservice.GetPublicRoom().success(function(response)
    {
        $scope.rooms = response;
        for (var i in response)
        {
            $scope.rooms[i].timestamp = new Date($scope.rooms[i].timestamp).toGMTString();
        }
    });
    ergastAPIservice.GetFullName().success(function(response)
    {
        $scope.fullname = response;
        if($scope.fullname != "")
            $location.path("/Rooms");
    });
}).controller('PublicStoryController', function($scope,ergastAPIservice,$location,$route,$routeParams)
{
    $scope.story = [];
    $scope.comments = [];
    $scope.groupid=$routeParams.id;
    $scope.groupname = "";
    ergastAPIservice.GetGroupName($scope.groupid).success(function(response)
    {
        $scope.groupname = response;
    });
    ergastAPIservice.GetStory($scope.groupid).success(function(response)
    {
        $scope.story = response;
        for (var i in response)
        {
            $scope.story[i].timestamp = new Date($scope.story[i].timestamp).toGMTString();
        }
    });
    ergastAPIservice.GetComment().success(function(response)
    {
        $scope.comments = response;
        for (var i in response)
        {
            $scope.comments[i].timestamp = new Date($scope.comments[i].timestamp).toGMTString();
        }
    });
    ergastAPIservice.GetFullName().success(function(response)
    {
        $scope.fullname = response;
        if($scope.fullname != "")
            $location.path("/Rooms");
    });
});