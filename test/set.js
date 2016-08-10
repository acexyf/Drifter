var redis=require('redis'),
	client=redis.createClient();

client.SELECT(0,function(){
	client.set("userace", "2",function(err,result){
		client.end(true);
		if(err){
			console.log(err);
			return;
		}
		console.log(result);
	});
});




