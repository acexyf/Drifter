var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/data');
/**
 * 定义漂流瓶模型，并设置数据存储到Bottles集合
 * @type {[type]}
 */
var bottleModel=mongoose.model('Bottle',new mongoose.Schema({
	bottle:Array,
	message:Array
}, {
	collection:'bottles'
}));

/**
 * 将用户捡到的漂流瓶改变格式保存
 * @param  {[type]}   picker   [description]
 * @param  {[type]}   _bottle  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.save=function(picker,_bottle,callback){
	var bottle={bottle:[],message:[]};
	bottle.bottle.push(picker);
	bottle.message.push.push([_bottle.owner,_bottle.time,_bottle.content]);
	bottle=new bottleModel(bottle);
	bottle.save(function(err){
		callback(err);
	});
};

/**
 * 获取用户捡到的所有的漂流瓶
 * @param  {[type]}   user     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.getAll=function(user,callback){
	bottleModel.find({'bottle':user},function(err,bottles){
		if(err){
			return callback({code:0,msg:'获取漂流瓶失败'});
		}
		callback({code:1,msg:bottles});
	});
}

/**
 * 获取特定ID的漂流瓶
 * @param  {[type]}   _id      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.getOne=function(_id,callback){
	bottleModel.findById(_id,function(err,bottle){
		if(err){
			return callback({code:0,msg:'漂流瓶获取失败'});
		}
		callback({code:1,msg:bottle});
	});
}

/**
 * 回复特定id的漂流瓶
 * @param  {[type]}   _id      [description]
 * @param  {[type]}   reply    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.reply=function(_id,reply,callback){
	reply.time=reply.time||Date.now();
	bottleModel.findById(_id,function(err,_bottle){
		if(err){
			return callback({code,msg:'回复漂流瓶失败'});
		}
		var newBottle={};
		newBottle.bottle=_bottle.bottle;
		newBottle.message=_bottle.message;
		if(newBottle.bottle.length===1){
			newBottle.bottle.push(_bottle.message[0][0]);
		}
		newBottle.message.push([reply.user,reply.time,reply.content]);
		bottleModel.findByIdAndUpdate(_id,newBottle,function(err,bottle){
			if(err){
				return callback({code:0,msg:'回复漂流瓶失败'});
			}
			callback({code:1,msg:bottle});
		});
	});
}

/**
 * 删除特定id的漂流瓶
 * @param  {[type]}   _id      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.delete=function(_id,callback){
	bottleModel.findIdAndRemove(_id,function(err){
		if(err){
			return callback({code:0,msg:'删除漂流瓶失败'});
		}
		callback({code:1,msg:'删除成功!'});
	});
}


