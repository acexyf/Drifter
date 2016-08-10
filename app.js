var express=require('express');
var redis=require('./models/redis.js');
var bodyParser = require('body-parser');
var app=express();
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
		res.json(result);
	});
});

/**
 * 漂亮瓶扔回海里
 */
app.post('/back',function(erq,res){
	redis.throwBack(req.body,function(result){
		res.json(result);
	});
});


app.listen(3000);
console.log('listening at port 3000');



