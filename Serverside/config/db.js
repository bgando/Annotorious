var mongoose = require('mongoose');

module.exports = function(app) {
  // Connect to the database
  mongoose.connect('mongodb://localhost/'+app.set('db'));

  // Register models
  mongoose.model('Play', require('../schemas/Play'));
  mongoose.model('Annotation', require('../schemas/Annotation'))
};
