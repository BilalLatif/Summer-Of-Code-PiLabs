function pulldata2(num){
		$.get('http://datastore.asadmemon.com/bilal',function(res){
		arr=res;
		arr[num].state=true;
		savedata(arr);
		
	});
	}
	function pulldata3(num){
		$.get('http://datastore.asadmemon.com/bilal',function(res){
		arr=res;
		arr[num].state=false;
		savedata(arr);
		
	});
	}
	function pulldata(){
		 $.get('http://datastore.asadmemon.com/bilal',function(res){
		newstate(res);
		
	});
	}