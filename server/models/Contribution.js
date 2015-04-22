var mongoose = require('mongoose');

var ContributionSchema = new mongoose.Schema({
	contributor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	date: {type: Date, default: Date.now },
	value: {type: Number, min: 0, default: 0.00}
});

var Contribution = mongoose.model('Contribution',ContributionSchema); 

module.exports.getAll = function(req, res) {
	Contribution.find({}).populate('contributor').exec(function(err, contributions){
			if(err){
				return res.json({
					"status": 401,
          			"message": "Erro ao buscar as contribuições",
          			"error": err
				});
			}
			return res.json(contributions);
		});
};
 
module.exports.getOne = function(req, res) {
    Contribution.findById(req.params.id, function(err, contribution) {
            if (err) {
                res.send(err);
            }
            res.json(contribution);
     });
   
};

module.exports.save = function(req, res) {
	var contribution = req.body;
	Contribution.create(contribution,function(err, contribution) {
                    if(err) return res.json({type:false, data: "Ocorreu um erro ao criar a contribuição"});
                    res.json(contribution);
      })
};


module.exports.update = function(req, res) {};
 
module.exports.remove = function(req, res) {};