var WorkView = Backbone.View.extend({
  initialize: function() {
    this.model.on('renderWork', function(){
      //TODO
    })

  },

  events: {
    'click .titleNav': "renderWork",
  },

  templateWork: Handlebars.compile(
    '{{{ html }}}'
  ),

  templateTitle: Handlebars.compile('<button class="titleNav btn btn-link">asdf</button></n>'),

  renderTitle: function() {
    this.$el.append(this.templateTitle(this.model.toJSON()));
    return this;
  },

  renderWork: function(){
    var self = this;
    var model = this.model.fetch({
      success: function(model, response, options) {   
        $('#content').html(self.templateWork(model.attributes)).bind(self);
        console.log(self.templateWork(model.attributes))
        console.log($('#content'))
        this.loadAnnotations();
      },

      error: function(err) {
        console.log("Error rendering page:",err);
      }
    });
  }

});
