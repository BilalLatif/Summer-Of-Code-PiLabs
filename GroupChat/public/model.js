var model=function(){
	this.times="";
	var arr3=0;
	this.senddata=function(msgs){
			$.ajax({
			url: 'http://localhost:3030/user/'+new Date().getTime(),
			type: 'POST',
			contentType: 'application/JSON',
			data: JSON.stringify(msgs),
			success:function(res){}
			});
		}
	this.getdata=function(){
		$.get('http://localhost:3030/user123',function(res){
			for(i in res){
				if(res[i].timestamp>arr3){
					cont.sendtoview(res[i]);
				}
			}
			for(i in res){
				arr3=res[i].timestamp;
			}		
			});
	}
}
var modl=new model();