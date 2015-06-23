
	$(document).ready(function(){
	var arr={};
	var i;
	//var arr2=[];
		$('#sub').click(function(){
			var msg=$('#msg').val().replace(/(<([^>]+)>)/,"");
			var sendto=$('#sendto').val();
			var sendfrom='';
			var subject=$('#subject').val();
			$('#msg').val('');
			$('#sendto').val('');
			$('#sendfrom').val('');
			$('#subject').val('');
			var d=new Date();
			var ampm=d.getHours()>=12? 'pm' : 'am' ;
			arr.msg=msg;
			arr.sendto=sendto;
			arr.sendfrom=sendfrom;
			arr.subject=subject;
			arr.sendtime=d.getHours()+':'+d.getMinutes()+' '+ampm;
			cont.getfromview(arr);
			//cont.givemedata();
			
			
		});
		$('#sendreply').click(function(){
			var msg=$('#replymsg').val().replace(/(<([^>]+)>)/,"");
			var sendfrom='';
			var sendto=$('.text-left').attr('id');
			var subject='AS above';
			$('#sendfrom').val('');
			var d=new Date();
			var ampm=d.getHours()>=12? 'pm' : 'am' ;
			arr.msg=msg;
			arr.sendto=sendto;
			arr.sendfrom=sendfrom;
			arr.subject=subject;
			arr.sendtime=d.getHours()+':'+d.getMinutes()+' '+ampm;
			cont.getfromview(arr);
		});
	});
var v=new view();
function view(arr2){
	console.log("in view",arr2.msg);
	if (arr2.msg.length > 10){
		var text = arr2.msg;
text = text.substr(0,10) + '...';
arr2.msg=text;
	}
	//$('#showme').find('#eml').text(arr2.sendfrom);
	//$('#showme').find('#ntxt').text(arr2.msg);
	$('#loadimg').remove();
	$('#showme').append('<a href="/showemailonpage.html?prodId='+arr2._id+'" class="list-group-item read"><span class="name" style="min-width: 120px; display: inline-block;" id="eml">'+arr2.sendfrom+'</span><span class=""><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+arr2.subject+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i></span><span class="text-muted" style="font-size: 11px;" id="ntxt">'+arr2.msg+'</span><span class="badge">'+arr2.sendtime+'</span></a>');
}
function viewsent(arr2){
	console.log("in view",arr2.msg);
	if (arr2.msg.length > 10){
		var text = arr2.msg;
text = text.substr(0,10) + '...';
arr2.msg=text;
	}
	//$('#showme').find('#eml').text(arr2.sendfrom);
	//$('#showme').find('#ntxt').text(arr2.msg);
	$('#loadimgsent').remove();
	$('#showmesent').append('<a href="/showemailonpage.html?prodId='+arr2._id+'" class="list-group-item read"><span class="name" style="min-width: 120px; display: inline-block;" id="eml">'+arr2.sendto+'</span><span class=""><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+arr2.subject+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i></span><span class="text-muted" style="font-size: 11px;" id="ntxt">'+arr2.msg+'</span><span class="badge">'+arr2.sendtime+'</span></a>');
}
function viewsentonpage(arr2){
	console.log("in view",arr2.msg);
	//$('#showme').find('#eml').text(arr2.sendfrom);
	//$('#showme').find('#ntxt').text(arr2.msg);
	$('#loadimgemail').remove();
	$('#openselectedlink').append('<p class="text-left" id="'+arr2.sendfrom+'">'+arr2.sendfrom+'</p><p class="text-center">'+arr2.msg+'</p><p class="text-right">Right aligned text.</p>');
}
