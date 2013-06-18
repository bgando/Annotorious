var mongoose = require('mongoose');

var Play = mongoose.Schema({
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
