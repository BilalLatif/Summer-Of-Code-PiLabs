function newstate(res){
		var arr2;
		arr2=res;
		//arr2=JSON.parse(localStorage.named);
		for(var i=0;i<arr2.length;i++){
			if(i==0){
				if(arr2[i].state==true){
					document.getElementById('todo').innerHTML='<li class="ch" id="'+i+'" onchange="show(this)"><input class="inp" type="checkbox">'+arr2[i].text+'</li><br>';
				}
				else{
					document.getElementById('todo').innerHTML='<li class="bh" id="'+i+'" onchange="show(this)" style="text-decoration:line-through"><input class="inp" type="checkbox">'+arr2[i].text+'</li><br>';					
				}
				
			}
			else{
					if(arr2[i].state==true){
						document.getElementById('todo').innerHTML+='<li class="ch" id="'+i+'" onchange="show(this)"><input class="inp" type="checkbox">'+arr2[i].text+'</li><br>';
					}
					else{
					document.getElementById('todo').innerHTML+='<li class="bh" id="'+i+'" onchange="show(this)" style="text-decoration:line-through"><input class="inp" type="checkbox">'+arr2[i].text+'</li><br>';
					
					}
				}
			
		}
		$(".bh").find(".inp").prop("checked",true);
		
	}
	