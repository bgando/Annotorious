$(function(){
  $(document.body).annotator('addPlugin', 'Annotorious');

  Annotator.Plugin.Annotorious = (function() {
    function Annotorious() {
      console.log('working');
      
      }

      Annotorious.prototype.pluginInit = function() {
    console.log("Initialized with annotator: ", this.annotator);
  };

    return Annotorious;
  })();

  $(document.body).on('annotationCreated', function(annotation) {
    console.log('created', annotation);
  });
  // Annotator.Plugin.Annotorious();

});



