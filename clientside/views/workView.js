var WorkView = Backbone.View.extend({
  events: {
    'click': "renderAll"      
  },

  templateAll: _.template('<h3><%= this.model.escape("title") %></h3>' + '<article><%= this.model.escape("ACT") %>'),

  templateTitle: _.template('<%= this.model.escape("title") %>'),
  // titles: "{{title}}",
  // templateTitle: Handlebars.compile(this.titles),
  templateNextAct: _.template('<a href=/works/<%= this.model.escape("_id") %>/<%= this.model.escape("ACT") %>>Next Act</a>'),

  renderAll: function(){
    debugger;
    var clone = this.model.clone();
    // var thing = this(this.template({model: this.model.attributes}));
    $('#content').html(this.templateAll({model: this.model.attributes}));
    // this.$el.append(this.templateNextAct({act: this.collection.act + 1}));
  },

  renderTitle: function() {
    this.$el.append(this.templateTitle({model: this.model.attributes}));
    return this;
  }
});