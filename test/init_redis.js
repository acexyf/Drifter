var request=require('request');





for(var i=0;i<=10;i++){
	(function(i){
			request.post({url:'http://127.0.0.1:3000', form: {'owner':'bottle'+i,'type':'male','content':'content'+i}}, function(err,httpResponse,body){ 
			if (err) {
			   return console.error('upload failed:', err);
			}
		  	//console.log('Upload successful!  Server responded with:', body);
		});
		//request.post('http://127.0.0.1:3000',{'owner':'bottle'+i,'type':'male','content':'content'+i});
	})(i);
}

for(var i=11;i<20;i++){
	(function(i){
		request.post({url:'http://127.0.0.1:3000', form: {'owner':'bottle'+i,'type':'female','content':'content'+i}}, function(err,httpResponse,body){ 
			if (err) {
			   return console.error('upload failed:', err);
			}
		  	console.log('Upload successful!  Server responded with:', body);
		});
		//request.post('http://127.0.0.1:3000',{'owner':'bottle'+i,'type':'female','content':'content'+i});
	})(i);
}












