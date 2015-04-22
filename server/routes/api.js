//index.js
// ROUTES FOR OUR API
// =============================================================================
var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var user = require('../models/User');
var contribution = require('../models/Contribution');


var router = express.Router();              // get an instance of the express Router

//Middleware para verificação do token de acesso a API
router.use(function (req, res, next) {
    
    var token = req.headers['x-access-token'];

    try {
    if (token) { 
      var decoded = jwt.decode(token, require('../config/secret.js')());
 
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
    } else {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid Token or Key"
         });
          return;
    }
  }  catch(err) {
      res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid Token or Key",
          "error": err
         });
        return;
  }
  next();
});

//Métodos da API

router.get('/users',user.getAll);
router.get('/users/:id',user.getOne);
router.get('/contributions',contribution.getAll);
router.get('/contributions/:id',contribution.getOne);
router.post('/contribution',contribution.save);

/*

router.route('/contributors')

    .post(function(req, res) {
        
        var contributor = new Contributor();
        console.log(req.body.name);
        contributor.name = req.body.name;

		contributor.save(function(err){
		if(err){ 
			return next(err); 
		}

    	return res.json({message: "Salvo com sucesso"});
        
   		});
	})

    .get(function(req, res) {
        console.log('debug1');
		Contributor.find(function(err, contributors){
			console.log('debug2');
			if(err){
				return res.send(500, err);
			}
			return res.send(200,contributors);
		});
    });

router.route('/contributors/:id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Contributor.findById(req.params.id, function(err, contributor) {
            if (err) {
                res.send(err);
            }
            res.json(contributor);
        });
    });

*/
module.exports = router;