var WorkView = Backbone.View.extend({
  events: {
    'click .scene' : "renderScene",
    'click .titleNav': "renderActs", 
  },

  templateActs: Handlebars.compile(
    '<h3>{{ title }}</h3>' + 
    '<ul class="nav nav-pills nav-stacked">{{#each ACT}}{{>act}}{{/each}}</ul>'
  ),

  templateScene: Handlebars.compile(
    '<h3>{{ title }}</h3>'
  ),

  templateTitle: Handlebars.compile('<button class="titleNav btn btn-link">{{ title }}</button></n>'),

  renderTitle: function() {
    this.$el.append(this.templateTitle(this.model.toJSON()));
    return this;
  },

  renderActs: function(){
    var model = this.model.fetch({
      success: function(model, response, options) {    
        $('#content').html(this.templateActs(this.model.toJSON()));
      }.bind(this)
    });
  },

  renderScene: function (){
    console.log('rendering scene');
    // $('#content').append(this.templateScene(this.model.toJSON()));
  }
});


// Partial: Mini template used with {{>act}}
Handlebars.registerPartial('act', '<li>{{TITLE}}</li>'+
  '{{#accordianList SCENE}}{{TITLE}}{{/accordianList}}');

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
Handlebars.registerHelper('accordianList', function(items, options) {

  var out = "<ul>"
  // var out = '<div class="accordion" id="accordion2">';

  for(var i=0, l=items.length; i<l; i++) {
    var out = out + "<a href=# class='scene'><li>" + options.fn(items[i]) + "</li></a>"
    // options.fn() will process {{stuffOnInside}}
    // out = out + ('<div class="accordion-group">
    //   <div class="accordion-heading">
    //     <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse' + i + '">'
    //     + options.fn(items[i]) +
    //     '</a>
    //   </div>
    //   <div id="collapse' + i + '" class="accordion-body collapse in">
    //     <div class="accordion-inner">
    //     </div>
    //   </div>
    // </div>');
  }

  // whatever you return gets printed!
  return out + "</ul>";
});
