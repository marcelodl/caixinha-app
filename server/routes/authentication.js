var jwt = require('jwt-simple');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var secret = require('../config/secret');

var User = mongoose.model('User');

/*
 * Routes that can be accessed by any one
 */
router.route('/login').post(function(req,res){
	User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
        	res.status(401);
            res.json({
                type: false,
                data: "Ocorreu um erro: " + err
            });
        } else {
            if (user) {

            	if(user.token) {
            		var decoded = jwt.decode(user.token,secret());
            		if(decoded.exp <= Date.now()) {
            			user.token = genToken();
                        User.update(user);
            		} 
            	} 
               res.json({
                    type: true,
                    data: user,
                }); 
            } else {
                res.json({
                    type: false,
                    data: "Email/Senha incorretos"
                });    
            }
        }
    	});
});

router.route('/register').post(function(req,res){
	User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
    	if (err) {
            res.json({
                type: false,
                data: "Ocorreu um erro. " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "Usuário já existe!"
                });
            } else {
                var userModel = new User();
                userModel.name = req.body.name;
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.token = genToken(userModel.email);
                userModel.save(function(err, user) {
                    if(err) return res.json({type:false, data: "Ocorreu um erro."});
                    console.log('salvou');
                    res.json(user);
                })
            }
  		};
  	});
});

// private method
function genToken(email) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
    email: email
  }, secret());
 
 return  token;
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = router;