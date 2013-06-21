// var SideNavView = Backbone.View.extend({


//   templateTitle: Handlebars.compile('<button class="titleNav btn btn-link">{{ title }}</button></n>'),

//   templateActs: Handlebars.compile(
//     '<h3>{{ title }}</h3>' + 
//     '<ul class="nav nav-pills nav-stacked">{{#each ACT}}{{>act}}{{/each}}</ul>'
//   ),

//   renderActs: function(){
//     console.log('title nav show acts');
//     this.trigger('renderActs', this.model);
//   },

//   renderTitle: function() {
//     this.$el.append(this.templateTitle(this.model.toJSON()));
//     return this;
//   },

//     events: {
//     'click .titleNav': "renderActs"
//   }
// });