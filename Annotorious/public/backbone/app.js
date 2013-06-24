//TODO: Router

// var Router = Backbone.Router.extend({

//   routes: { 
//     // "": "index",
//     // "works(/)": "list",
//     "works/:id(/)" : "show",
//     "works/:id/:act(/)" : "act",
//     "search/:query(/:page)(/)" : "search",
//     "*path" : "notFound"
//   },

//   // index: function(){
//   //   this.works.fetch();
//   // },

//   // list: function(){
//   //   this.works.fetch({title})
//   // },

//   show: function(id) {
//     // this.works.showConent(id);
//     this.works.fetch()
//     console.log('ok');
//   },

//   act: function(act){
//     this.work.fetch()
//   },

//   search: function(query, page) {
//     page = page || 0;
//     query = decodeURIComponent(query);
//     console.log(query, page);
//   },

//   notFound: function() {
//     console.log("nothing was found")
//   }
// });


//Config App

var AppView = Backbone.View.extend({

  start: function(){
    // new Router();
    // Backbone.history.start({pushState: true});
    this.works = new Works();
    var self = this;
    this.works.fetch({
      success: function(){
        self.worksView = new WorksView({collection: self.works});
        $('#play-nav').append(self.worksView.render().el);
      },
      error: function(rsp) {
        console.log('Error:',rsp)
      }
    });
  }  
});



//Start App

var appView = new AppView();
$(function(){ appView.start(); })




