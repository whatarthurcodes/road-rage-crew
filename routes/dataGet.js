exports.getUser = function(db) {
    return function(req, res) {
        console.log('db:getUser')
        var collection = db.get('user');
    	collection.find({},{},function(e,docs){
    	 	res.send(docs);
    	});
    };
};

exports.getUserWith = function(db) {
    return function(req, res) {
        console.log('db:getUserWith')
    	var topic = req.params.stuff;
    	var collection = db.get('user');

    	collection.find({studying: topic},function(e,docs){
    		res.send(docs);
    	});
    };
};