//Config App
var AppView = Backbone.View.extend({
  events: {
    'click a': function(e){
      e.preventDefault();
      Backbone.history.navigte(e.target.pathname, {trigger: true});
    }
  },
  start: function(){
    Backbone.history.start({pushState: true});
    this.works = new Works();
    var self = this;
    this.works.fetch({
      success: function(){
        self.worksView = new WorksView({collection: self.works});
        $('#content').append(self.worksView.render().el);
        console.log(self.worksView.render().el);
      },
      error: function(rsp) {
        console.log('Error:',rsp)
      }
    });
  }  
});

//Model

var Work = Backbone.Model.extend({
  // parse: function(resp) {
  //   return resp._id
  // },

  idAttribute: '_id'

});


//Collections

var Works = Backbone.Collection.extend({

  model: Work,

  initialize: function(){
    console.log('collection');
    this.on('remove', this.hideModel);
  },

  url: 'http://localhost:3000/works',

  // comparator: 'id.TITLE',

  hideModel: function(model) {
    this.model.trigger('hide');
  }
});


//Views

var WorkView = Backbone.View.extend({

  template: _.template('<article><%= this.model.escape("_id.ACT1") %></article>'),

  templateTitle: _.template('working'),
  // _.template('<a href=#/works/<%= this.model.escape("_id") %>><%= this.model.escape("_id.title") %></a>'),

  templateNextAct: _.template('<a href=#/works/<%= this.model.escape("_id") %>/<%= this.model.escape("_id.ACT") %>>Next Act</a>'),

  renderAll: function(){
    this.$el.append(this.template({model: this.model.attributes}));
    this.$el.append(this.templateNextAct({act: this.collection.act + 1}));
  },

  renderTitle: function() {
    return this.$el.append(this.templateTitle({model: this.model.attributes}));
    console.log(this.model.attributes);
  }
});


var WorksView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
  },

  
  render: function() {
    this.addAll();
    return this;
  },

  addAll: function() {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(work){
    var workView = new WorkView({model: work});
    this.$el.append(workView.renderTitle().el);
  }
});

//Router

var Router = new Backbone.Router.extend({

  routes: { "": "index",
    // "works(/)": "list"
    "works/:id(/)" : "show",
    "works/:id/:act(/)" : "act",
    "search/:query(/:page)(/)" : "search",
    "*path" : "notFound"
  },

  index: function(){
    this.works.fetch();
  },

  // list: function(){
  //   this.works.fetch({title})
  // }

  show: function(id) {
    this.works.focusOnWork(id);
  },

  act: function(act){
    this.work.fetch({data: {act : act}})
  },

  search: function(query, page) {
    page = page || 0;
    query = decodeURIComponent(query);
    console.log(query, page);
  },

  notFound: function() {
    console.log("nothing was found")
  }
});

//Start App

var appView = new AppView();
$(function(){ appView.start(); })




