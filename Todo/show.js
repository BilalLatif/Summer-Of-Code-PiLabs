function show(myli){
		if(myli.className=='bh'){
			
			myli.style.setProperty("text-decoration", "none");
			myli.className='ch';
			var num=myli.id;
			pulldata2(num);
		}
		else{
			myli.style.setProperty("text-decoration", "line-through");
			myli.className='bh';
			var num=myli.id;
			pulldata3(num);			
		}
			
	}