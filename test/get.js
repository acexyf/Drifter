var redis=require('redis'),
	client=redis.createClient();

client.SELECT(1,function(){
	client.get('ace',function(err,result){
		client.end(true); 
		if(err){
			console.log(err);
			return;
		}
		console.log(typeof result);
	});
});


