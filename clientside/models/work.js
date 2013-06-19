//Model

var Work = Backbone.Model.extend({
  initialize: function() {
    this.on('showContent', this.showContent, this);
  },

  rootUrl: 'http://localhost:3000/works/',

  // idAttribute: '_id',

});