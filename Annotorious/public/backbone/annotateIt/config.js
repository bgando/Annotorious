var content = $('body').annotator();

content.annotator('addPlugin', 'Auth', {
  tokenUrl: '/api'
});

content.annotator('addPlugin', 'Store', {
  // The endpoint of the store on your server.
  prefix: 'http://localhost:3000',

  // Attach the uri of the current page to all annotations to allow search.
  annotationData: {
    'uri': 'http://localhost:3000/annotations/'
  },

  // This will perform a "search" action rather than "read" when the plugin
  // loads. Will request the last 20 annotations for the current url.
  // eg. /store/endpoint/search?limit=20&uri=http://this/document/only
  loadFromSearch: {
    'limit': 20,
    'uri':  'http://localhost:3000/annotations/'
  }
});
