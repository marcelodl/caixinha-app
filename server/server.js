// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./models/User');
require('./models/Contribution');

/*
require('./models/Contributor');
require('./models/Contribution');
require('./models/Purchase');
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
 
  next();
};

app.use(allowCrossDomain);

var apiRoutes = require('./routes/api');
var authenticationRoutes = require('./routes/authentication');

app.use('/',authenticationRoutes);
app.use('/api/',apiRoutes);

// configure app to use bodyParser()
// this will let us get the data from a POST


mongoose.connect('mongodb://localhost/caixinhadb');

var port = process.env.PORT || 3000;        // set our port



// START THE SERVER
// =============================================================================
app.listen(port);

module.exports = app;
console.log('Magic happens on port ' + port);