var control=function(){
	this.getfromview=function(arr2){
		modl.senddata(arr2);
	}
	this.givemedata=function(){
		modl.getdata();
	}
	this.sendtoview=function(arr2){
		view(arr2);
	}
}
var cont=new control();