
var view=function(){
	$(document).ready(function(){
	var arr={};
	var i;
	//var arr2=[];
		$('#sub').click(function(){
			var a=$('#msg').val().replace(/(<([^>]+)>)/,"");
			$('#msg').val('');
			arr.msg=a;
			arr.nick="Bilal";
			arr.timestamp=new Date().getTime();
			cont.getfromview(arr);
			
			
		});
	});
this.view=function(arr2){
	$('.display').append(arr2.nick+' says: '+arr2.msg+' '+new Date(arr2.timestamp)+'<br>');
}
}
var v=new view();
