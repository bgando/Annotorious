var express = require('express');
var path = require('path');

module.exports = function(app) {
  // Configuration for all environments
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(__dirname + '/../public'));
  app.set('views', __dirname +'/../views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('SecretAgentShakespeare'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // Development configuration
  if (app.get('env') === 'development') {
    app.set('db', 'open_shakespeare');
    app.use(express.errorHandler());
  }
  else if (app.get('env') === 'production') {
    app.set('db', 'open_shakespeare-prod');
  }
};
