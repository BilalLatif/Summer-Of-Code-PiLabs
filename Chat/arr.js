var networks =function(){
	this.arr2="";
	this.msg="";
	this.nick=""
	this.timestamp="";
	this.senddata=function(msgs){
			$.ajax({
			url: 'http://datastore.asadmemon.com/bilal5/'+ new Date().getTime(),
			type: 'POST',
			contentType: 'application/JSON',
			data: JSON.stringify(msgs),
			success:function(res){}
			});
		}
	this.getdata=function(){
		$.get('http://datastore.asadmemon.com/bilal5',function(res){
				arr2=res;
				$('.display').empty();
				for(i in arr2){
					$('.display').append(arr2[i].nick+' says: '+arr2[i].msg+' '+new Date(arr2[i].timestamp)+'<br>');
				}
				
			});
	}
}
var arr=new networks();