var WorkView = Backbone.View.extend({
  events: {
    'click': "renderAll"
  },

  templateAll: Handlebars.compile(
    '<h3>{{ title }}</h3>' + 
    '<article>{{#each ACT}}{{>act}}{{/each}}</article>'
  ),

  templateTitle: Handlebars.compile('{{ title }}'),
  templateNextAct: Handlebars.compile('<a href=/works/{{ _id }}/{{ ACT }} Next Act</a>'),

  renderAll: function(){
    var model = this.model.fetch({
      success: function(model, response, options) {    
        $('#content').html(this.templateAll(this.model.toJSON()));
      }.bind(this)
    });
    // this.$el.append(this.templateNextAct({act: this.collection.act + 1}));
  },

  renderTitle: function() {
    this.$el.append(this.templateTitle(this.model.toJSON()));
    return this;
  }
});


// Partial: Mini template used with {{>act}}
Handlebars.registerPartial('act', '<section>{{TITLE}}</section>'+
  '{{#each SCENE}}{{TITLE}}{{/each}}');

// Normal helper: doesn't need a closing tag
// {{link 'Cow', mooURL}}
Handlebars.registerHelper('link', function(text, url) {
  text = Handlebars.Utils.escapeExpression(text);
  url  = Handlebars.Utils.escapeExpression(url);

  var result = '<a href="' + url + '">' + text + '</a>';

  return new Handlebars.SafeString(result);
});

// Block helper: Function that does magic, passed arguments and options
// {{#actPrinter arg1 arg2}}{{stuffOnInside}} {{blahBlah}}{{/actPrinter}}
// options.fn() to render the stuff inside of it
// options.inverse() to render the else clause.... don't think about this
Handlebars.registerHelper('actPrinter', function(arg1, arg2, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    // options.fn() will process {{stuffOnInside}}
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  // whatever you return gets printed!
  return out + "</ul>";
});
