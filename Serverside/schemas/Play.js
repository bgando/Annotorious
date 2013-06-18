var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Play = new Schema({
  TITLE: String,
  // ACT: [Object], // Define this more later if necessary
  // PERSONAE: {
  //  PERSONA: [String],
  //  PGROUP: [Object]
  // },
  PLAYSUBT: String,
  SCNDESCR: String
});

module.exports = Play;
