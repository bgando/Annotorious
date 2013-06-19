var WorkView = Backbone.View.extend({
  events: {'click': "renderAll"},
  template: _.template('<h3><%= this.model.escape("title") %></h3>'),
     // '<% _.each("ACT", function(act) {
     //  console.log(act);
     // }); %>'),

  templateTitle: _.template('<%= this.model.escape("title") %>'),
  templateNextAct: _.template('<a href=/works/<%= this.model.escape("_id") %>/<%= this.model.escape("_id.ACT") %>>Next Act</a>'),

  renderAll: function(){
    var thing = this.$el.append(this.template({model: this.model.attributes}));
    $('#content').html(thing);
    // this.$el.append(this.templateNextAct({act: this.collection.act + 1}));
  },

  renderTitle: function() {
    this.$el.append(this.templateTitle({model: this.model.attributes}));
    return this;
  }
});