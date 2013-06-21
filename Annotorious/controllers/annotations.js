var mongoose = require('mongoose');
var Annotation = mongoose.model('Annotation');

module.exports = {

  api: function (req, res) {
    res.send('Annotations API is running');
  },

	search: function(req, res) {
    var query = Annotation.find({'uri': req.query.uri }); 

    switch (req.query.mode) {
    case 'user':
        query.where('user').equals(req.query.user);
        break;
    case 'group':
    query.where('subgroups').in(req.query.subgroups).$where('this.permissions.read.length < 1');
        break;
    case 'class':
    query.where('groups').in(req.query.groups).$where('this.permissions.read.length < 1');
    break;
  case 'admin':
    break;
    }

    if (req.query.sidebar) {
      query.exec(function (err, annotations) {
      if (!err) {
        return res.send(annotations);
      } 
      else {
        return console.log(err);
      }
    });
    }
    else {
    query.exec(function (err, annotations) {
        if (!err) {
        return res.send({'rows': annotations });
      } 
      else {
        return console.log(err);
      }
    });
    }
	},
  
	findById: function (req, res) {
    return Annotation.findById(req.params.id, function (err, annotation) {
      if (!err) {
      return res.send(annotation);
      } else {
       return console.log(err);
      }
    });
	},

  list: function (req, res) {
    return Annotation.find(function (err, annotations) {
      if (!err) {
       return res.send(annotations);
      } else {
       return console.log(err);
      }
    });
  },

	addAnnotation: function (req, res) {
  var annotation;
  console.log("POST: ");
  console.log(req.body);
  annotation = new Annotation({
    user: req.body.user,
    username: req.body.username,
    consumer: "annotationstudio.mit.edu",
    annotator_schema_version: req.body.annotator_schema_version,
    created: Date.now(),
    updated: Date.now(),
    text: req.body.text,
    uri: req.body.uri,
    src: req.body.src,
    quote: req.body.quote,
    tags: req.body.tags,
    groups: req.body.groups,
    subgroups: req.body.subgroups,
    uuid: req.body.uuid,
    ranges: req.body.ranges,
    shapes: req.body.shapes,
    permissions: req.body.permissions
  });

  annotation.save(function (err) {
    if (!err) {
     return console.log("Created annotation with uuid: "+ req.body.uuid);
    } else {
     return console.log(err);
    }
  });
  annotation.id = annotation._id;
  return res.send(annotation);
	},

  update: function (req, res) {
    return Annotation.findById(req.params.id, function (err, annotation) {
      annotation._id = req.body._id;
      annotation.id = req.body._id;
      annotation.user = req.body.user;
      annotation.username = req.body.username;
      annotation.consumer = req.body.consumer;
      annotation.annotator_schema_version = req.body.annotator_schema_version;
      annotation.created = req.body.created;
      annotation.updated = Date.now();
      annotation.text = req.body.text;
      annotation.uri = req.body.uri;
      annotation.quote = req.body.quote;
      annotation.tags = req.body.tags;
      annotation.groups = req.body.groups;
      annotation.subgroups = req.body.subgroups;
      annotation.uuid = req.body.uuid;
      annotation.ranges = req.body.ranges;
      annotation.permissions = req.body.permissions;

      return annotation.save(function (err) {
       if (!err) {
         console.log("updated");
       } else {
         console.log(err);
       }
       return res.send(annotation);
      });
    });
  }, 

  delete: function(req, res) {
     return Annotation.findById(req.params.id, function (err, annotation) {
      return annotation.remove(function (err) {
        if (!err) {
          console.log("removed");
          return res.send('');
        } else {
          console.log(err);
        }
      });
    });
  }
};

//auth

function tokenOK (req, res, next) {
    try {
    var decoded = jwt.decode(req.header('x-annotator-auth-token'), secret);
    if (inWindow(decoded)) {
       console.log("Token in time window");
    } 
    else {
       console.log("Token not in in time window.");
    } 
    next();
    } catch (err) {
       console.log("Error decoding token:");
    console.log(err);
    return res.send("There was a problem with your authentication token");
    }
};

function inWindow (decoded, next) {
    var issuedAt = decoded.issuedAt; 
    var ttl = decoded.ttl; 
    var issuedSeconds = new Date(issuedAt) / 1000; 
    var nowSeconds = new Date().getTime() / 1000;    
    var diff = ((nowSeconds - issuedSeconds)); 
    var result = (ttl - diff); console.log("Time left on token: about " + Math.floor(result/(60*60)) + " hours.");
    return ((result > 0) ? true : false);
}
