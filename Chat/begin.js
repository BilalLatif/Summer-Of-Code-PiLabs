$(document).ready(function(){
		$('#sub').click(function(){
			var a=$('#msg').val().replace(/(<([^>]+)>)/,"");
			$('#msg').val('');
			arr.msg=a;
			arr.nick="Bilal";
			arr.timestamp=new Date().getTime();
			arr.senddata(arr);
		});
	});