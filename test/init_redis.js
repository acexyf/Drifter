var request=require('request');





for(var i=0;i<=4;i++){
	(function(i){
		setTimeout(function(){
			request.post({url:'http://127.0.0.1:3000', form: {'owner':'bottle'+i,'type':'male','content':'content'+i}}, function(err,httpResponse,body){ 
				if (err) {
				   return console.error('upload failed:', err);
				}
				console.log('Upload successful!  Server responded with:', body);
			},i*1000);
		});
	})(i);
}




// for(var i=5;i<9;i++){
// 	(function(i){
// 		request.post({url:'http://127.0.0.1:3000', form: {'owner':'bottle'+i,'type':'female','content':'content'+i}}, function(err,httpResponse,body){ 
// 			if (err) {
// 			   return console.error('upload failed:', err);
// 			}
// 		  	console.log('Upload successful!  Server responded with:', body);
// 		});
// 	})(i);
// }












