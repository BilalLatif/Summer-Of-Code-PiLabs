var model=function(){
	this.times="";
	var arr3=0;
	this.senddata=function(msgs){
			$.ajax({
			url: 'http://localhost:3030/compose',
			type: 'POST',
			contentType: 'application/JSON',
			data: JSON.stringify(msgs),
			success:function(res){
				window.location.href="http://localhost:3030/emails.html";
			}
			});
		}
	this.getdata=function(){
		$.get('http://localhost:3030/getcompose',function(res){
			console.log("in getdata",res);
			for(var i=0;i<res.length;i++){
				
					console.log(res[i]);
					cont.sendtoview(res[i]);
				
			}		
			});
	}
	this.getsentdata=function(){
		$.get('http://localhost:3030/sent',function(res){
			console.log("in getdata",res);
			for(var i=0;i<res.length;i++){
				
					console.log(res[i]);
					cont.sendtoviewsent(res[i]);
				
			}		
			});
	}
	this.openemaildata=function(arr){
		$.get('http://localhost:3030/showemail/'+arr,function(res){
			console.log("in getdata",res);
			for(var i=0;i<res.length;i++){
				
					console.log(res[i]);
					cont.sendtopage(res[i]);
				
			}		
			});
	}

}
var modl=new model();