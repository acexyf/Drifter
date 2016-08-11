var redis=require('redis'),
	client=redis.createClient(),
	client1=redis.createClient(),
	client2=redis.createClient();

exports.throw=function(bottle,callback){

	client1.SELECT(0,function(){
		client1.GET('user_'+bottle.owner,function(err,result){
			var times=-1;
			if(result){
				times=parseInt(result);
				if(result>=10){
					return callback({code:0,msg:'今天扔瓶子的机会用完了'})
				}
				else{
					times++;
				}
			}
			else{
				times=1
			}

			client1.SET('user_'+bottle.owner, times,function(err,result){
				if(err){
					return callback({code:0,msg:err});
				}
				//client1.EXPIRE('user_'+bottle.owner,getLastTime());
				//client1.end(true);

				bottle.time=bottle.time || Date.now();
				//为每个漂流瓶随机生成一个id
				var bottleId=Math.random().toString(16);
				var type={male:0,female:1};
				//根据漂流瓶的类型的不同将漂流瓶保存到不同的数据库
				var libaryid=getRandom();
				client.SELECT(libaryid,function(){
					//以hash类型保存漂流瓶对象
					client.HMSET(bottleId,bottle,function(err,result){
						if(err)
							return callback({code:0,msg:'过会再试试吧'});
						callback({code:1,msg:result});
						client.EXPIRE(bottleId,86400);
						//client.end(true);
					});
				});

			});
		});
	});

	
}

exports.pick=function(info,callback){
	var flag=false;
	client2.SELECT(1,function(){
		client2.GET('user_'+info.user,function(err,result){
			var times=-1;
			if(result){
				times=parseInt(result);
				if(result>=10){
					flag=true;
					return callback({code:0,msg:'今天捡瓶子的机会用完了'});
				}
				else{
					times++;
				}
			}
			else{
				times=1;
			}
			client2.SET('user_'+info.user, times,function(err,result){
				if(err){
					return callback({code:0,msg:err});
				}
				

				var lasttime=getLastTime();
				client2.EXPIRE('user_'+info.user,lasttime);
				//client2.end(true);

				var type={all:Math.round(Math.random()),male:0,female:1};
				info.type=info.type || 'all';
				//根据请求的瓶子类型的不同到不同的数据库中获取
				var libaryid=getRandom();
				client.SELECT(libaryid,function(){
					client.RANDOMKEY(function(err,bottleId){
						//client.end(true);
						flag=false;
						if(!bottleId)
							return callback({code:0,msg:'恭喜你捡到海星了'});
						client.HGETALL(bottleId,function(err,bottle){
							if(err)
								return callback({code:0,msg:'漂流瓶破了...'});
							callback({code:1,msg:bottle});
							client.DEL(bottleId);
							client.end(true);
						});
					});
				});

			});
		});
	});
}

exports.throwBack=function(bottle,callback){
	var bottleId=Math.random().toString(16),
		libaryid=getRandom();;
	client.SELECT(libaryid,function(){
		client.HMSET(bottleId,bottle,function(err,result){
			if(err)
				return callback({code:0,msg:'过会再试试吧'});
			callback({code:1,msg:result});
			client.PEXPIRE(bottleId,bottle.time + 8640000 - Date.now());
		});
	});
}


/**
 * 返回0-15的随机整数
 * @return {int} [void]
 */
function getRandom(){
	return Math.round(Math.random()*16);
}

/**
 * 返回从现在开始到今天23:59:59前的秒数
 * @return {int} [void]
 */
function getLastTime(){
	var date=new Date(),
	    endDate=new Date();
	endDate.setHours(23,59,59,59);
	var lasttime=(endDate.getTime()-date.getTime())/1000;

	return parseInt(lasttime);
}