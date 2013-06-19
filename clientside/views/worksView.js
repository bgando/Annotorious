var WorksView = Backbone.View.extend({
  initialize: function(){
    // this.collection.on('add', this.addOne, this);
    // this.collection.on('reset', this.addAll, this);
  },

  render: function() {
    this.addAll();
    return this;
  },

  addAll: function() {
    this.collection.forEach(this.addOne, this);
    return this;
  },

  addOne: function(work){
    var workView = new WorkView({model: work});
    var titleViewInstance = workView.renderTitle().el;
    this.$el.append(titleViewInstance);
    return this;
  }
});