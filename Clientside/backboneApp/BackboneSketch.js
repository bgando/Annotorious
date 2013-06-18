
//Config App

var AppView = Backbone.View.extend({
  // events: {
  //   'click a': function(e){
  //     e.preventDefault();
  //     Backbone.history.navigate(e.target.pathname, {trigger: true});
  //   }
  // },
  start: function(){
    Backbone.history.start({pushState: true});
    this.works = new Works();
    var self = this;
    this.works.fetch({
      success: function(){
        self.worksView = new WorksView({collection: self.works});
        $('#play-nav').append(self.worksView.render().el);
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
  initialize: function() {
    this.on('showContent', this.showContent, this);
  },

  rootUrl: 'http://localhost:3000/works/',

  idAttribute: '_id',

  showContent: function(model) {
    var test = this.fetch();
    console.log('showContent', test);
  }

});


//Collections

var Works = Backbone.Collection.extend({

  model: Work,

  initialize: function(){

  },

  url: 'http://localhost:3000/works',



  // comparator: 'id.TITLE',

  hideModel: function(model) {
    this.model.trigger('hide');
  },

});


//Views

var WorkView = Backbone.View.extend({
  initialize: function(){
    var self = this.model
    $('a').bind('click', function(button) {
      console.log(button.value);
    });
  },


  template: _.template('<article><%= this.model.escape("_id.ACT1") %></article>'),

  templateTitle: _.template('<li><a href=# value="<%= this.model.escape("_id") %>"><%= this.model.escape("title") %></a></li>'),

  templateNextAct: _.template('<a href=/works/<%= this.model.escape("_id") %>/<%= this.model.escape("_id.ACT") %>>Next Act</a>'),

  showContent: function() {
    this.model.trigger('showContent');
    console.log("i'm working here");
  },

  renderAll: function(){
    this.$el.append(this.template({model: this.model.attributes}));
    this.$el.append(this.templateNextAct({act: this.collection.act + 1}));
  },

  renderTitle: function() {
    this.$el.append(this.templateTitle({model: this.model.attributes}));
    return this;
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
    return this;
  },

  addOne: function(work){
    var workView = new WorkView({model: work});
    var titleViewInstance = workView.renderTitle().el;
    this.$el.append(titleViewInstance);
    return this;
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

  // index: function(){
  //   this.works.fetch();
  // },

  // list: function(){
  //   this.works.fetch({title})
  // }

  show: function(id) {
    // this.works.showConent(id);
    this.works.fetch()
    console.log('ok');
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




