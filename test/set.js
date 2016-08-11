var redis=require('redis'),
	client=redis.createClient();

client.SELECT(0,function(){
	client.set("ace", "xyf",function(err,result){
		client.EXPIRE("ace",30);
		client.end(true);
		if(err){
			console.log(err);
			return;
		}

		console.log(result);
	});
});




