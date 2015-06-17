	
	function savedata(arr){
		$.ajax({
	    url: 'http://datastore.asadmemon.com/bilal', 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify(arr),
	success:function(res){console.log(res);}
	});
	}
	