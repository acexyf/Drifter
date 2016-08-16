var express=require('express');
var redis=require('./models/redis.js');
var bodyParser = require('body-parser');
var mongodb=require('./models/mongodb.js');
var app=express();
var mongodb=require('./models/mongodb.js');
app.use(bodyParser.urlencoded({
  extended: false
}));

/**
 * 扔一个漂流瓶
 */
app.post('/',function(req,res){

	if(!(req.body.owner && req.body.type && req.body.content)){
		return res.json({code:0,msg:"信息不完整"});
	}
	if(["male","female"].indexOf(req.body.type)===-1){
		return res.json({code:0,msg:"类型错误"});
	}
	redis.throw(req.body,function(result){
		res.json(result);
	});
});


/**
 * 捡一个漂流瓶                                                         [description]
 */
app.get('/',function(req,res){
	//console.log(req.query);
	if(!req.query.user){
		return res.json({code:0,msg:"信息不完整"});
	}
	if(["male","female"].indexOf(req.query.type)===-1){
		return res.json({code:0,msg:"类型错误"});
	}
	redis.pick(req.query,function(result){
		if(result.code==1){
			mongodb.save(req.query.user,result.msg,function(){
				if(err){
<<<<<<< HEAD
					return res.json({code:0,msg:"获取漂流瓶失败，请重试"});
=======
					return res.json({code:0,msg:"漂流瓶获取失败，请重试！"});
>>>>>>> 3550c76ffbdd0d5861c4abb331d430ac8a8141ac
				}
				return res.json(result);
			});
		}
		res.json(result);
	});
});

/**
 * 漂亮瓶扔回海里
 */
app.post('/back',function(req,res){
	redis.throwBack(req.body,function(result){
		res.json(result);
	});
});

/**
 * 获取一个用户所有的漂流瓶
 * @param  {json} ){	mongodb.getAll(req.params.user,function(result){		res.json(result);	});} [description]
 * @return {[type]}                                                                                 [description]
 */
app.get('/user/:user',function(req,res){
	mongodb.getAll(req.params.user,function(result){
		res.json(result);
	});
});

/**
 * 获取特定id的漂流瓶
 * @param  {[type]} req                                                                               [description]
 * @param  {[type]} res){	mongodb.getOne(req.params._id,function(result){		res.json(result);	});} [description]
 * @return {[type]}                                                                                   [description]
 */
app.get('/bottle/:_id',function(req,res){
	mongodb.getOne(req.params._id,function(result){
		res.json(result);
	});
});

/**
 * 回复特定id的漂流瓶
 * @param  {[type]} req                                                     [description]
 * @param  {[type]} res){	if(!(req.body.user&&req.body.content)){		return callback({code:0,msg:'回复信息不完整'});	}	mongodb.reply(req.params._id,req.body,function(result){		res.json(result);	});} [description]
 * @return {[type]}                                                         [description]
 */
app.post('/reply/:_id',function(req,res){
	if(!(req.body.user&&req.body.content)){
		return callback({code:0,msg:'回复信息不完整'});
	}
	mongodb.reply(req.params._id,req.body,function(result){
		res.json(result);
	});
});

/**
 * 删除特定id的漂流瓶
 * @param  {[type]} req      [description]
 * @param  {[type]} res){} [description]
 * @return {[type]}          [description]
 */
app.get('/delete/:id',function(req,res){
	mongodb.delete(req.params._id,function(result){
		res.json(result);
	});
});

app.listen(3000);
console.log('listening at port 3000');



