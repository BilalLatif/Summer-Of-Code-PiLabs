var arr=[];
$(document).ready(function(){
		$('#nbtn').click(function(){
			var a=document.getElementById('sub');
			$.get('http://datastore.asadmemon.com/bilal',function(res){
				arr=res;
				var todoval='<li class="ch" id="'+arr.length+'" onchange="show(this)"><input type="checkbox"> '+a.value+'</li><br>';
			$('#todo').append(todoval);
			arr.push({text:a.value,state:true});
			savedata(arr);
			});

		});
	});