var mongoose = require('mongoose');
var Play = mongoose.model('Play');

var idMap ={};

module.exports.list = function(req, res){

  Play.find({}, function (err, plays) {
    var works = [];
    plays.forEach(function(play) {
      works.push({title : play.TITLE, _id: play._id})
      // idMap[play.TITLE] = play._id;
    })

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(works);
   });
};

module.exports.findById = function(req, res) {
  var query = Play.findById(req.params.id, function(err, resp) {
    // console.log("err", err);
    // console.log("resp", resp);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(resp);
  });

  // db.collection('plays', function(err, collection) {
  //   collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
  //     res.send(item);
  //   });
  // });
  // res.send("a specific work by Shakespeare")
};

module.exports.addWork = function(req, res) {
  // var work = req.body;
  // console.log('Adding work: ' + JSON.stringify(wine));
  // db.collection('works', function(err, collection) {
  //     collection.insert(work, {safe:true}, function(err, result) {
  //         if (err) {
  //             res.send({'error':'An error has occurred'});
  //         } else {
  //             console.log('Success: ' + JSON.stringify(result[0]));
  //             res.send(result[0]);
  //         }
  //     });
  // });
  res.send("I guess Shakespeare is still at it despite the odds!");
};
