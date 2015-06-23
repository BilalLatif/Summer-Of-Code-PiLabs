var control=function(){
	this.getfromview=function(arr2){
		modl.senddata(arr2);
	}
	this.givemedata=function(){
		modl.getdata();
	}
	this.givemesentdata=function(){
		modl.getsentdata();
	}
	this.showemaildata=function(arr){
		modl.openemaildata(arr);
	}
	this.sendtoview=function(arr2){
		console.log("please",arr2);
		//$('#showme').append(arr2.sendfrom+'                      '+arr2.msg+'<br/>');
		view(arr2);
	}
	this.sendtoviewsent=function(arr2){
		console.log("please",arr2);
		//$('#showme').append(arr2.sendfrom+'                      '+arr2.msg+'<br/>');
		viewsent(arr2);
	}
	this.sendtopage=function(arr2){
		console.log("please",arr2);
		//$('#showme').append(arr2.sendfrom+'                      '+arr2.msg+'<br/>');
		viewsentonpage(arr2);
	}
}
var cont=new control();
