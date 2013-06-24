var WorkView = Backbone.View.extend({
  initialize: function() {
    this.model.on('renderWork', function(){
      //TODO
    })

  },

  events: {
    'click .scene' : "renderScene",
    'click .titleNav': "renderWork",
    'hover .annotated' : "showAnnotation",
    'createAnnotation body': "create"
  },

  create: function() {
    console.log('create');
  },

  templateWork: Handlebars.compile(
    '{{{ html }}}'
  ),

  templateTitle: Handlebars.compile('<button class="titleNav btn btn-link">asdf</button></n>'),

  renderTitle: function() {
    this.$el.append(this.templateTitle(this.model.toJSON()));
    return this;
  },

  showAnnotation: function() {
    console.log(this.data());
  },

  renderWork: function(){
    var self = this;
    var model = this.model.fetch({
      success: function(model, response, options) {   
        $('#content').html(self.templateWork(model.attributes)).bind(self);
        console.log(self.templateWork(model.attributes))
        console.log($('#content'))
        this.loadAnnotations({uri: });
      },

      error: function(err) {
        console.log("Error rendering page:",err);
      }
    });
  }

});
