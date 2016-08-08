var redis=require('redis'),
	client=redis.createClient();

export.throw=function(bottle,callback){
	bottle.time=bottle.time || Date.now();
	//为每个漂流瓶随机生成一个id
	var bottleId=Math.random().toString(16);
	var type={male:0,female:1};
	//根据漂流瓶的类型的不同将漂流瓶保存到不同的数据库
	client.SELECT(type[bottle.type],function(){
		//以hash类型保存漂流瓶对象
		client.HMSET(bottleId,bottle,function(err,result){
			if(err)
				return callback({code:0,msg:'过会再试试吧'});
			callback({code:1,msg:result});
			client.EXPIRE(bottleId,86400);
		});
	});
}

export.pick=function(info,callback){
	var type={all:Math.round(Math.random()),male:0,female:1};
	info.type=info.type || 'all';
	//根据请求的瓶子类型的不同到不同的数据库中获取
	client.SELECT(type[info.type],function(){
		client.RANDOMKEY(function(err,bottleId){
			if(!bottleId)
				return callback({code:0,msg:'大海空空如也....'});
			client.HGETALL(bottleId,function(err,bottle){
				if(err)
					return callback({code:0,msg:'漂流瓶破了...'});
				callback({code:1,msg:bottle});
				client.DEL(bottleId);
			});
		});
	});
}
