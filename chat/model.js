var model=function(){
	var arr3=0;
	this.senddata=function(msgs){
			$.ajax({
			url: 'http://datastore.asadmemon.com/bilal7/'+new Date().getTime(),
			type: 'POST',
			contentType: 'application/JSON',
			data: JSON.stringify(msgs),
			success:function(res){}
			});
		}
	this.getdata=function(){
		$.get('http://datastore.asadmemon.com/bilal7',function(res){
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