var express = require('express')
var http = require('http');

// Create an app
var app = express();

// Setup app
var appConfig = require('./config/app')(app);

// Include DB
var db = require('./config/db')(app);

// Setup routes
var routes = require('./config/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});

// Research later: Node uses parameteric modules, they're also first class.
