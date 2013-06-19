//Collections

var Works = Backbone.Collection.extend({

  model: Work,

  initialize: function(){

  },

  url: 'http://localhost:3000/works',

  // hideModel: function(model) {
  //   this.model.trigger('hide');
  // },

});