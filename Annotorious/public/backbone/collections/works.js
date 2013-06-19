//Collections

var Works = Backbone.Collection.extend({

  model: Work,

  url: 'http://localhost:3000/works',

});