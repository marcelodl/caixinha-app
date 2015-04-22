var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	token: String,
	authentication: String
});

var User = mongoose.model('User',UserSchema);

module.exports.getAll = function(req, res) {
	User.find(function(err, users){
			if(err){
				return res.json({
					"status": 401,
          			"message": "Erro ao buscar usuários",
          			"error": err
				});
			}
			return res.json(users);
		});
};
 
module.exports.getOne = function(req, res) {
    User.findById(req.params.id, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
     });
   
};

module.exports.update = function(req, res) {};
 
module.exports.remove = function(req, res) {};