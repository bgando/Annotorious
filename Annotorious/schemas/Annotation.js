var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Annotation Ranges
var Ranges = new Schema({
    start: { type: String, required: true },
    end: { type: String, required: true},
    startOffset: { type: Number, required: false },
    endOffset: { type: Number, required: false }
});

var Shape = new Schema({
    type: { type: String, required: true },
    geometry: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true } 
    }
});

// Annotation Model
var Annotation = new Schema({
    id: { type: String, required: false },
    // annotator_schema_version: { type: String, required: false, default: version },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() },
    user: { type: String, required: false },
    username: { type: String, required: false },
    text: { type: String, required: false },        
    quote: { type: String, required: false },    
    uri: { type: String, required: false },
    src: { type: String, required: false },
    shapes: [Shape],
    uuid: { type: String, required: false },
    groups: [String],         
    subgroups: [String],         
    ranges: [Ranges],
    tags: [String],
    permissions: {
       read: [String],
       admin: [String],
       update: [String],
       delete: [String]
    }
});

module.exports = Ranges, Shape, Annotation;