//Model

var Work = Backbone.Model.extend({
  initialize: function() {
    this.on('showContent', this.showContent, this);
  },

  rootUrl: 'http://localhost:3000/works/',

  idAttribute: '_id',

  showContent: function(model) {
    debugger
    var test = this.fetch();
    console.log(test, "test");
  }

});